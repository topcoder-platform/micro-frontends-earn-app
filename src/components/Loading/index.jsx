import React, { useState } from "react";
import PT from "prop-types";

import "./styles.scss";

const Loading = () => {
  const header =
    "Welcome to our BETA work listings site - Tell us what you think!";

  return (
    <div styleName="loading-wrapper">
      <div styleName="loading-inner">
        <div>Loading spinner</div>
        <h4>LOADING</h4>
        <span>We are processing your gigs data</span>
      </div>
    </div>
  );
};

Loading.propTypes = {};

export default Loading;
