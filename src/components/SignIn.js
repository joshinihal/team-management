import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./SignUp.module.css";

const SignIn = () => {
  let navigate = useNavigate();

  const [error, setError] = useState(null);

  useEffect(() => {
    window.localStorage.removeItem("signedInUser");
  }, []);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = (event) => {
    setError(null);
    event.preventDefault();
    const userObj = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    const existingUsers = JSON.parse(window.localStorage.getItem("users"));
    if (existingUsers) {
      const userExists = existingUsers.find(
        (user) => user.email === userObj.email
      );
      if (userExists) {
        if (userExists.password === userObj.password) {
          window.localStorage.setItem("signedInUser", JSON.stringify(userObj));
          navigate("/home");
        } else {
          setError({ msg: "Incorrect Password!" });
        }
      } else {
        setError({ msg: "User not found!" });
      }
    } else {
      setError({ msg: "User not found!" });
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      {error ? <span className={classes.err}>{error.msg}</span> : ""}
      <form onSubmit={handleSubmit}>
        <div className={classes.formcontainer}>
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
              Sign In
            </button>
          </div>
          <a label="Sign Up" href="./signup">
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
