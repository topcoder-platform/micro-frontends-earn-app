import React from "react";
import PT from "prop-types";

import "./styles.scss";

const Tag = ({ tag, onClick }) => (
  <a styleName="tag" onClick={() => onClick(tag)}>
    {tag}
  </a>
);

Tag.propTypes = {
  tag: PT.string,
  onClick: PT.func,
};

export default Tag;
