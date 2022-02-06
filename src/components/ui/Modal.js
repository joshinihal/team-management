import React from "react";
import reactDom from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  // close on click on the backdrop
  const onBackgroundClick = () => {
    props.onBackgroundClick();
  };
  return (
    <div className={classes["backdrop"]} onClick={onBackgroundClick}></div>
  );
};

const Modal = ({ ModalOverlay, onModalClose }) => {
  const onBackgroundClick = () => {
    onModalClose();
  };

  return (
    <div>
      {reactDom.createPortal(
        // accept a modaloverlay component which will be shown in the modal
        <div className={classes.overlay}>{ModalOverlay}</div>,
        document.getElementById("modal")
      )}
      {reactDom.createPortal(
        <Backdrop onBackgroundClick={onBackgroundClick} />,
        document.getElementById("modal")
      )}
    </div>
  );
};

export default Modal;
