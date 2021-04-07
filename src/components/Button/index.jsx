import React from "react";
import PT from "prop-types";

import "./styles.scss";

const Button = ({ children, onClick }) => (
  <button styleName="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PT.node,
  onClick: PT.func,
};

export default Button;
