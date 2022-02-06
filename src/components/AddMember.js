import { useRef } from "react";
import classes from "./AddMember.module.css";

const AddMember = (props) => {
  const nameInputRef = useRef();
  const companyInputRef = useRef();
  const statusInputRef = useRef();
  const notesInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredCompany = companyInputRef.current.value;
    const enteredStatus = statusInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    props.onMemberAdd({
      enteredName,
      enteredCompany,
      enteredStatus,
      enteredNotes,
    });
  };

  const handleCancel = () => {
    props.onCancel();
  };

  return (
    <div className={classes.container}>
      <h3>Add Members</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes["input-container"]}>
          <label htmlFor="name">Name</label>
          <input
            className="input-box"
            type="text"
            id="name"
            ref={nameInputRef}
            required
          ></input>

          <label htmlFor="company">Company</label>
          <input
            className="input-box"
            type="text"
            id="company"
            ref={companyInputRef}
            required
          ></input>

          <label htmlFor="status">Status</label>
          <input
            className="input-box"
            type="text"
            id="status"
            ref={statusInputRef}
          ></input>

          <label htmlFor="notes">Notes</label>
          <input
            className="input-box"
            type="text"
            id="notes"
            ref={notesInputRef}
          ></input>
        </div>

        <div className={classes["btn-container"]}>
          <button
            className={`btn white-btn`}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className={`btn blue-btn`} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
