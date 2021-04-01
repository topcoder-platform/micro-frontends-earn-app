import React from "react";
import PT from "prop-types";

import "./styles.scss";

const Prize = ({ purse }) => (
  <div>
    <span styleName="text">Purse</span>
    <span styleName="value">{purse}</span>
  </div>
);

Prize.propTypes = {
  purse: PT.string,
};

export default Prize;
