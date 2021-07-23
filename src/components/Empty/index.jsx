import React from "react";
import PT from "prop-types";
import {
  MY_GIGS_STATUS_EMPTY_TEXT,
  GIGS_FILTER_STATUSES,
} from "../../constants";
import Button from "../Button";
import "./styles.scss";

const Empty = ({ gigStatus }) => {
  return (
    <div styleName="empty-wrapper">
      <div styleName="empty-inner">
        <h6>{MY_GIGS_STATUS_EMPTY_TEXT[gigStatus]}</h6>
        {gigStatus == GIGS_FILTER_STATUSES.OPEN_JOBS && (
          <span>Interested in getting a gig?</span>
        )}
        {gigStatus == GIGS_FILTER_STATUSES.OPEN_JOBS && (
          <Button
            isPrimary
            size="lg"
            onClick={() => {
              window.location.href = `${process.env.URL.BASE}/gigs`;
            }}
          >
            VIEW GIGS
          </Button>
        )}
      </div>
    </div>
  );
};

Empty.defaultProps = {
  gigStatus: GIGS_FILTER_STATUSES.OPEN_JOBS,
};

Empty.propTypes = {
  gigStatus: PT.string,
};

export default Empty;
