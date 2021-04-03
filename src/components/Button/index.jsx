import React from "react";
import PT from "prop-types";

import "./styles.scss";

const Button = ({ children, onClick }) => (
  <button styleName="button" onClick={onClick} type="button">
    {children}
  </button>
);

Button.propTypes = {
  children: PT.node,
  onClick: PT.func,
};

const ButtonIcon = ({ children, onClick }) => (
  <button styleName="button-icon" onClick={onClick} type="button">
    {children}
  </button>
)

ButtonIcon.propTypes = {
  children: PT.node,
  onClick: PT.func,
};

export {
  Button,
  ButtonIcon,
}

export default Button;
