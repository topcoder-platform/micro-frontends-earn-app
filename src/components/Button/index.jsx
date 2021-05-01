import React from "react";
import PT from "prop-types";

import "./styles.scss";

const Button = ({ children, onClick, primary }) => (
  <button
    styleName={`${primary ? "button button-primary" : "button"}`}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  primary: false,
};

Button.propTypes = {
  children: PT.node,
  onClick: PT.func,
  primary: PT.bool,
};

export default Button;
