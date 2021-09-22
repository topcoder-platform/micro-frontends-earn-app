import React from "react";
import "./styles.scss";

const FeedbackButton = ({ className }) => (
  <a
    className={className}
    styleName="feedback-button"
    href="https://discussions.topcoder.com/discussion/8870/new-beta-site-discuss?new=1"
    target="_blank"
  >
    GIVE APPLICATION FEEDBACK
  </a>
);

export default FeedbackButton;
