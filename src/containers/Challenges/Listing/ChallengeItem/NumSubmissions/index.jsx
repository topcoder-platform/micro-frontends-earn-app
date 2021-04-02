import React from "react";
import PT from "prop-types";
import IconSubmission from "assets/icons/submission.png";

import "./styles.scss";

const NumSubmissions = ({ numOfSubmissions }) => (
  <div styleName="submissions">
    <img src={IconSubmission} alt="submissions" /> {numOfSubmissions}
  </div>
);

NumSubmissions.propTypes = {
  numOfSubmissions: PT.number,
};

export default NumSubmissions;
