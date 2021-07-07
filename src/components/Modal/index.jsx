import React from "react";
import PT from "prop-types";
import { Modal as ReactModal } from "react-responsive-modal";

import styles from "./styles.scss";

const Modal = ({ children, open, center, onClose }) => {
  return (
    <ReactModal
      open={open}
      center={center}
      showCloseIcon={false}
      classNames={{
        modal: `${styles["modal"]} ${styles["content"]}`,
      }}
      focusTrapped={false}
      onClose={onClose}
    >
      {children}
    </ReactModal>
  );
};

Modal.defaultProps = {
  center: true,
  onClose() {},
};

Modal.propTypes = {
  children: PT.node,
  open: PT.bool,
  center: PT.bool,
  onClose: PT.func,
};

export default Modal;
