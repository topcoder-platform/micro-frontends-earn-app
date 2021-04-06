import React from "react";
import PT from "prop-types";
import TextInput from "../../TextInput";

import "./styles.scss";

const DateInput = ({ value, onClick }) => (
  <div onClick={onClick} styleName="date-range-input">
    <TextInput label="From" size="xs" value={value} readonly />
  </div>
);

DateInput.propTypes = {};

export default DateInput;
