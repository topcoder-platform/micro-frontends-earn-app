import React from "react";
import PT from "prop-types";
import * as utils from "../../../../../utils";

import "./styles.scss";

const PhaseEndDate = ({ challenge }) => {
  const status = challenge.status === "Active" ? "Ends" : "Ended";
  const phaseMessage =
    challenge.status === "Completed"
      ? ""
      : utils.challenge.getChallengePhaseMessage(challenge);
  const timeLeft = utils.challenge.getChallengeActivePhaseTimeLeftMessage(
    challenge
  );
  const timeLeftColor = timeLeft.time < 12 * 60 * 60 * 1000 ? "#EF476F" : "";
  const timeLeftMessage = timeLeft.late ? (
    <span>Late by<span style={{ color: '#EF476F' }} styleName="uppercase">{` ${timeLeft.text}`}</span></span>
  ) : (
    <span style={{ color: timeLeftColor }}>
      <span
        styleName={typeof timeLeft.time === "number" && "uppercase"}
      >{`${timeLeft.text} `}</span>
      {timeLeft.late === false && <small>to go</small>}
    </span>
  );

  return (
    <span>
      <span styleName="phase-message">
        {`${phaseMessage}`} {`${status}`}:
      </span>
      {' '}
      <span styleName="time-left">{timeLeftMessage}</span>
    </span>
  );
};

PhaseEndDate.propTypes = {
  challenge: PT.shape(),
};

export default PhaseEndDate;
