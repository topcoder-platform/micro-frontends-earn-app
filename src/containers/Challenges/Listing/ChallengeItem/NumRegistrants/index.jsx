import React from "react";
import PT from "prop-types";
import IconRegistrant from "assets/icons/registrant.png";

import "./styles.scss";

const NumRegistrants = ({ numOfRegistrants }) => (
  <div styleName="registrants">
    <img src={IconRegistrant} alt="registrants" /> {numOfRegistrants}
  </div>
);

NumRegistrants.propTypes = {
  numOfRegistrants: PT.number,
};

export default NumRegistrants;
