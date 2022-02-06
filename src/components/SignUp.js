import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SignUp.module.css";

const SignUp = () => {
  let navigate = useNavigate();

  const [error, setError] = useState(null);

  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = (event) => {
    setError(null);
    event.preventDefault();
    const userObj = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    const existingUsers = JSON.parse(window.localStorage.getItem("users"));
    if (existingUsers) {
      const userExists = existingUsers.find(
        (user) => user.email === userObj.email
      );
      if (!userExists) {
        const newUsers = [...existingUsers];
        newUsers.push(userObj);
        window.localStorage.setItem("users", JSON.stringify(newUsers));
        const signedInUser = {
          email: userObj.email,
          password: userObj.password,
        };
        window.localStorage.setItem(
          "signedInUser",
          JSON.stringify(signedInUser)
        );
        navigate("/home");
      } else {
        setError({ msg: "Email already exists!" });
      }
    } else {
      window.localStorage.setItem("users", JSON.stringify([userObj]));
      const signedInUser = { email: userObj.email, password: userObj.password };
      window.localStorage.setItem("signedInUser", JSON.stringify(signedInUser));
      navigate("./home");
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      {error ? <span className={classes.err}>{error.msg}</span> : ""}
      <form onSubmit={handleSubmit}>
        <div className={classes.formcontainer}>
          <label htmlFor="firstname"> First Name</label>
          <input
            id="firstname"
            className="input-box"
            type="text"
            ref={firstNameInputRef}
            required
          ></input>

          <label htmlFor="lastname"> Last Name</label>
          <input
            id="lastname"
            className="input-box"
            type="text"
            ref={lastNameInputRef}
          ></input>

          <label htmlFor="email"> Email</label>
          <input
            id="email"
            className="input-box"
            type="email"
            ref={emailInputRef}
            required
          ></input>

          <label htmlFor="password"> Password</label>
          <input
            id="password"
            className="input-box"
            type="password"
            ref={passwordInputRef}
            required
          ></input>
          <div className={classes.btncontainer}>
            <button className={`btn blue-btn`} type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
