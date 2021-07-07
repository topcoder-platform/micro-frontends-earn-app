import React from "react";
import PT from "prop-types";
import IconInfo from "assets/icons/ribbon-icon.svg";
import "./styles.scss";

const Ribbon = ({ text, tooltip }) => {
  const Tooltip = tooltip;

  return (
    <span styleName="ribbon" className="ribbon">
      <span styleName="ribbon-text">{text}</span>
      <Tooltip>
        <span styleName="ribbon-icon">
          <IconInfo />
        </span>
      </Tooltip>
    </span>
  );
};

Ribbon.propTypes = {
  text: PT.string,
  tooltip: PT.func,
};

export default Ribbon;
