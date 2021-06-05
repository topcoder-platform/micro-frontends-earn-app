import React from "react";
import PT from "prop-types";

import "./styles.scss";

const PhasePoint = ({ text, passed, active }) => {
  return (
    <div
      styleName={`phase-point ${passed ? "passed" : ""} ${
        active ? "active" : ""
      }`}
    >
      <div styleName="checkmark" />
      <span styleName="text">{text}</span>
    </div>
  );
};

PhasePoint.propTypes = {
  text: PT.string,
  passed: PT.bool,
  active: PT.bool,
};

export default PhasePoint;
