import React from "react";
import PT from "prop-types";
import Tooltip from "components/Tooltip";
import { gigStatusTooltip } from "assets/data/my-gigs.json";

import "./styles.scss";

const StatusTooltip = ({ children }) => {
  const Content = () => (
    <div styleName="status-tooltip">
      <ul>
        {Object.keys(gigStatusTooltip).map((status) => (
          <li styleName="item" key={status}>
            <div>
              <div styleName="caption">{status}</div>
              <div styleName="text">{gigStatusTooltip[status]}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Tooltip overlay={<Content />} placement="bottom">
      {children}
    </Tooltip>
  );
};

StatusTooltip.propTypes = {
  children: PT.node,
};

export default StatusTooltip;
