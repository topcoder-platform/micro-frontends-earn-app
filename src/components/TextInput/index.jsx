/**
 * Text input component.
 */
import React, { useState, useRef, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import "./styles.scss";

function TextInput({
  placeholder,
  label,
  errorMsg,
  value,
  onChange,
  required,
  size,
  type,
  onEnterKey,
  readonly,
  formatters,
  parsers
}) {
  const [val, setVal] = useState(value);
  const delayedOnChange = useRef(
    _.debounce((q, cb) => cb(q), process.env.GUIKIT.DEBOUNCE_ON_CHANGE_TIME) // eslint-disable-line no-undef
  ).current;
  const sizeStyle = size === "lg" ? "lgSize" : "xsSize";

  const reducer = (data, val) => data.reduce((prev, fn) => fn(prev), val);
  const parseValue = val => reducer(parsers, val);
  const formatValue = val => reducer(formatters, val);

  const ref = useRef(null);
  useEffect(() => {
    updateInputValue(value);
  }, [value]);

  const updateInputValue = (value) => {
    if (formatters) {
      value = parseValue(value);
      setVal(formatValue(value));
    } else {
      setVal(value);
    }
    return value;
  }

  const valueChange = (value) => {
    const updatedValue = updateInputValue(value);
    delayedOnChange(updatedValue, onChange);
  }

  return (
    <div
      className="textInputContainer"
      styleName={`container ${sizeStyle}${readonly ? " readonly" : ""}`}
    >
      <input
        ref={ref}
        readOnly={readonly}
        value={val}
        type={type}
        placeholder={`${placeholder}${placeholder && required ? " *" : ""}`}
        styleName={`${value || val ? "haveValue" : ""} ${
          errorMsg ? "haveError" : ""
        }`}
        onChange={(e) => {valueChange(e.target.value);}}
        onBlur={(e) => {valueChange(e.target.value);}}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onEnterKey();
          }
        }}
      />
      {label ? (
        <label htmlFor="textBoxInput">
          {label}
          {required ? <span>&nbsp;*</span> : null}
        </label>
      ) : null}
      {errorMsg ? <span styleName="errorMessage">{errorMsg}</span> : null}
    </div>
  );
}

TextInput.defaultProps = {
  placeholder: "",
  label: "",
  errorMsg: "",
  value: "",
  onChange: () => {},
  required: false,
  size: "lg",
  type: "text",
  onEnterKey: () => {},
  readonly: false,
  formatters: [() => {}],
  parsers: [() => {}]
};

TextInput.propTypes = {
  placeholder: PT.string,
  label: PT.string,
  errorMsg: PT.string,
  value: PT.string,
  onChange: PT.func,
  required: PT.bool,
  size: PT.oneOf(["xs", "lg"]),
  type: PT.string,
  onEnterKey: PT.func,
  readonly: PT.bool,
};

TextInput.withSuffix = ({suffix, ...props}) => (
  <div styleName="input-group">
    <TextInput {...props}/>
    <span styleName="input-suffix">{suffix}</span>
  </div>
);

export default TextInput;
