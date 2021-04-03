import React, { useRef, useEffect } from "react";
import PT from "prop-types";
import TextInput from "../../TextInput";
import CalendarIcon from 'assets/icons/icon-calendar.svg';

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
  onClickCalendarIcon
}) => {
  const ref = useRef(null);

  let rangeText;
  if (startDateString && endDateString) {
    rangeText = `${startDateString} - ${endDateString}`;
  } else {
    rangeText = `${startDateString}${endDateString}`;
  }

  const onChangeRangeText = (value) => {
    const [start, end] = value.trim().split(' - ')
    const event = { startDateString: start, endDateString: end }
    onStartDateChange(event)
    onEndDateChange(event)
  }

  const onFocusInput = (e) => {
    if (startDateString) {
      onEndDateFocus()
    } else {
      onStartDateFocus()
    }
  }

  useEffect(() => {
    const inputElement = ref.current.querySelector('input');
    inputElement.addEventListener('focus', onFocusInput);

    return () => {
      inputElement.removeEventListener('focus', onFocusInput);
    }
  })

  const onClickIcon = () => {
    if (startDateString) {
      onClickCalendarIcon('end')
    } else {
      onClickCalendarIcon('start')
    }
  }

  return (
    <div styleName={`container ${error ? 'isError' : ''}`}>
      <div styleName="date-range-input input-group" ref={ref}>
        <TextInput label="From" size="xs" value={rangeText} onChange={onChangeRangeText} />
        <div id="input-date-range-calendar-icon" styleName="icon" role="button" onClick={onClickIcon}><CalendarIcon /></div>
      </div>
      <div styleName="errorHint">{error}</div>
    </div>
  );
}


DateInput.propTypes = {
  onClick: PT.func,
};

export default DateInput;
