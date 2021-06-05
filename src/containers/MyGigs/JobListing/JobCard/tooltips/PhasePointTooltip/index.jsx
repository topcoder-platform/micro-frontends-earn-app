import React from "react";
import PT from "prop-types";
import Tooltip from "../../../../../../components/Tooltip";
import { phaseTooltips } from "../../../../../../assets/data/my-gigs.json";

import "./styles.scss";

const PhasePointTooltip = ({ phase, children, placement, width }) => {
  const Content = () => (
    <div styleName="phase-point-tooltip" style={{ width: `${width}px` }}>
      <h5 styleName="title">{phase}</h5>
      <p styleName="text">{phaseTooltips[phase]}</p>
    </div>
  );

  return (
    <Tooltip overlay={<Content />} placement={placement}>
      {children}
    </Tooltip>
  );
};

PhasePointTooltip.defaultProps = {
  placement: "top",
};

PhasePointTooltip.propTypes = {
  phase: PT.string,
  children: PT.node,
  placement: PT.oneOf(["top", "bottom", "left", "right"]),
  width: PT.number,
};

export default PhasePointTooltip;
