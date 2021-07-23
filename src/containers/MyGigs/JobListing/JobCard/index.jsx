import React, { useEffect, useRef, useState } from "react";
import PT from "prop-types";
import ProgressBar from "./ProgressBar";
import Ribbon from "../../../../components/Ribbon";
import Button from "../../../../components/Button";
import IconChevronDown from "assets/icons/button-chevron-down.svg";
import ProgressTooltip from "./tooltips/ProgressTooltip";
import NoteTooltip from "./tooltips/NoteTooltip";
import {
  MY_GIG_PHASE_LABEL,
  MY_GIG_PHASE_ACTION,
  MY_GIGS_JOB_STATUS,
  PHASES_FOR_JOB_STATUS,
} from "../../../../constants";
import { formatMoneyValue } from "../../../../utils";
import IconNote from "../../../../assets/icons/note.svg";

import "./styles.scss";

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef({});

  useEffect(() => {
    setFooterHeight(footerRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    setFooterHeight(footerRef.current.offsetHeight);
  }, [expanded]);

  return (
    <div
      styleName={`card job-card ${
        job.label === MY_GIG_PHASE_LABEL.SELECTED ? "label-selected" : ""
      } ${job.label === MY_GIG_PHASE_LABEL.OFFERED ? "label-offered" : ""} ${
        job.label === MY_GIG_PHASE_LABEL.PLACED ? "label-placed" : ""
      } ${
        job.label === MY_GIG_PHASE_LABEL.NOT_SELECTED
          ? "label-not-selected"
          : ""
      }`}
    >
      <div styleName="card-header job-card-header">
        <div styleName="ribbon">
          <Ribbon
            text={job.label}
            tooltip={({ children }) => (
              <ProgressTooltip job={job}>{children}</ProgressTooltip>
            )}
          />
        </div>
      </div>
      <div styleName="card-body">
        <div styleName="job-card-content">
          <div styleName="content">
            <h4 styleName="title">
              <a
                href={`${process.env.URL.BASE}/gigs/${job.jobExternalId}`} // eslint-disable-line no-undef
              >
                {job.title}
              </a>
            </h4>
            <ul styleName="job-items">
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Payment Range</div>
                  <div styleName="text">
                    {job.paymentRangeFrom &&
                      job.paymentRangeTo &&
                      job.currency && (
                        <>
                          {job.currency}
                          {formatMoneyValue(job.paymentRangeFrom, "")}
                          {" - "}
                          {formatMoneyValue(job.paymentRangeTo, "")}
                          {" (USD)"}
                          {" / "}
                          {job.paymentRangeRateType}
                        </>
                      )}
                  </div>
                </div>
              </li>
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Location</div>
                  <div styleName="text">{job.location}</div>
                </div>
              </li>
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Duration</div>
                  <div styleName="text">
                    {job.duration && `${job.duration} Weeks`}
                  </div>
                </div>
              </li>
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Hours</div>
                  <div styleName="text">
                    {job.hours && `${job.hours} hours / week`}
                  </div>
                </div>
              </li>
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Working Hours</div>
                  <div styleName="text">
                    {job.workingHours && `${job.workingHours} hours`}
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div
            styleName={`right-side stand-by ${!job.phaseAction ? "none" : ""}`}
          >
            {job.phaseAction && <Button size="lg">{job.phaseAction}</Button>}
          </div>
        </div>
      </div>
      <div styleName="card-footer job-card-footer" ref={footerRef}>
        <div styleName="note-container">
          {job.remark && (
            <NoteTooltip>
              <i styleName="icon">
                <IconNote />
              </i>
            </NoteTooltip>
          )}
          <span styleName="note">{job.remark}</span>
          {![
            MY_GIGS_JOB_STATUS.JOB_CLOSED,
            MY_GIGS_JOB_STATUS.REJECTED_OTHER,
            MY_GIGS_JOB_STATUS.COMPLETED,
            MY_GIGS_JOB_STATUS.WITHDRAWN,
            MY_GIGS_JOB_STATUS.WITHDRAWN_PRESCREEN,
          ].includes(job.status) && (
            <span styleName={`${expanded ? "show-less" : "show-more"}`}>
              <Button
                isText
                showRightArrow
                onClick={() => {
                  setExpanded(!expanded);
                }}
              >
                {expanded ? "SHOW LESS" : "SHOW MORE"}
                <span styleName="arrow-down">
                  <IconChevronDown />
                </span>
              </Button>
            </span>
          )}
        </div>
        {![
          MY_GIGS_JOB_STATUS.JOB_CLOSED,
          MY_GIGS_JOB_STATUS.REJECTED_OTHER,
          MY_GIGS_JOB_STATUS.COMPLETED,
          MY_GIGS_JOB_STATUS.WITHDRAWN,
          MY_GIGS_JOB_STATUS.WITHDRAWN_PRESCREEN,
        ].includes(job.status) && (
          <div
            styleName="progress-bar"
            style={{ display: expanded ? "" : "none" }}
          >
            <ProgressBar
              phases={PHASES_FOR_JOB_STATUS[job.status]}
              currentPhase={job.phase}
              currentPhaseStatus={job.phaseStatus}
              note={job.phaseNote}
            />
          </div>
        )}
      </div>
      <div styleName="card-image" style={{ bottom: `${footerHeight}px` }} />
    </div>
  );
};

JobCard.propTypes = {
  job: PT.shape(),
};

export default JobCard;
