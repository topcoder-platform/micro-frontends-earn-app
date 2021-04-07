import React, { useRef, useEffect, useState } from "react";
import PT from "prop-types";
import TextInput from "../../TextInput";
import CalendarIcon from "assets/icons/icon-calendar.svg";

import "./styles.scss";

const DateInput = ({
  id,
  isStartDateActive,
  startDateString,
  onStartDateChange,
  onStartDateFocus,
  isEndDateActive,
  endDateString,
  onEndDateChange,
  onEndDateFocus,
  error,
  onClickCalendarIcon,
  onStartEndDateChange,
}) => {
  const ref = useRef(null);
  const [focused, setFocused] = useState(false);

  let rangeText;
  if (startDateString && endDateString) {
    rangeText = `${startDateString} - ${endDateString}`;
  } else {
    rangeText = `${startDateString}${endDateString}`;
  }

  useEffect(() => {
    const inputElement = ref.current.querySelector("input");
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    inputElement.addEventListener("focus", onFocus);
    inputElement.addEventListener("blur", onBlur);

    return () => {
      inputElement.removeEventListener("focus", onFocus);
      inputElement.removeEventListener("blur", onBlur);
    };
  }, []);

  useEffect(() => {
    const inputElement = ref.current.querySelector("input");

    let caretPosition;
    if (inputElement.selectionDirection === "forward") {
      caretPosition = inputElement.selectionEnd;
    } else {
      caretPosition = inputElement.selectionStart;
    }

    if (caretPosition < 14) {
      onStartDateFocus();
    } else {
      onEndDateFocus();
    }
  }, [focused]);

  const onChangeRangeText = (value) => {
    let [newStartDateString = "", newEndDateString = ""] = value
      .trim()
      .split("-");
    newStartDateString = newStartDateString.trim();
    newEndDateString = newEndDateString.trim();

    if (
      newStartDateString !== startDateString &&
      newEndDateString !== endDateString
    ) {
      const event = {
        startDateString: newStartDateString,
        endDateString: newEndDateString,
      };
      onStartEndDateChange(event);
      onStartDateFocus();
    } else if (newStartDateString !== startDateString) {
      onStartDateFocus();
      onStartDateChange(newStartDateString);
    } else if (newEndDateString !== endDateString) {
      onEndDateFocus();
      onEndDateChange(newEndDateString);
      if (newEndDateString === "") {
        onStartDateFocus();
      }
    }
  };

  const onChangeRangeTextDebounced = useRef(_.debounce((f) => f(), 150));

  const onClickIcon = () => {
    const inputElement = ref.current.querySelector("input");

    let caretPosition;
    if (inputElement.selectionDirection === "forward") {
      caretPosition = inputElement.selectionEnd;
    } else {
      caretPosition = inputElement.selectionStart;
    }

    if (caretPosition < 14) {
      onClickCalendarIcon("start");
    } else {
      onClickCalendarIcon("end");
    }
  };

  const label = startDateString ? "From" : endDateString ? "To" : "From";

  return (
    <div styleName={`container ${error ? "isError" : ""}`}>
      <div styleName="date-range-input input-group" ref={ref}>
        <TextInput
          label={label}
          size="xs"
          value={rangeText}
          onChange={(value) => {
            onChangeRangeTextDebounced.current(() => onChangeRangeText(value));
          }}
        />
        <div
          id={id}
          styleName="icon"
          role="button"
          onClick={onClickIcon}
        >
          <CalendarIcon />
        </div>
      </div>
      <div styleName="errorHint">{error}</div>
    </div>
  );
};

DateInput.propTypes = {
  id: PT.string,
  isStartDateActive: PT.bool,
  startDateString: PT.string,
  onStartDateChange: PT.func,
  onStartDateFocus: PT.func,
  isEndDateActive: PT.bool,
  endDateString: PT.string,
  onEndDateChange: PT.func,
  onEndDateFocus: PT.func,
  error: PT.string,
  onClickCalendarIcon: PT.func,
  onStartEndDateChange: PT.func,
};

export default DateInput;
