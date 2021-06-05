import React, { useEffect, useRef, useState } from "react";
import PT from "prop-types";
import ProgressBar from "./ProgressBar";
import Ribbon from "../../../../components/Ribbon";
import Button from "../../../../components/Button";
import IconChevronDown from "assets/icons/button-chevron-down.svg";
import ProgressTooltip from "./tooltips/ProgressTooltip";
import NoteTooltip from "./tooltips/NoteTooltip";
import * as constants from "../../../../constants";
import * as utils from "../../../../utils";

import "./styles.scss";

const JobCard = ({ job, phases }) => {
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
        job.label === constants.MY_GIG_PHASE_LABEL.SELECTED
          ? "label-selected"
          : ""
      } ${
        job.label === constants.MY_GIG_PHASE_LABEL.OFFERED
          ? "label-offered"
          : ""
      } ${
        job.label === constants.MY_GIG_PHASE_LABEL.PLACED ? "label-placed" : ""
      } ${
        job.label === constants.MY_GIG_PHASE_LABEL.NOT_SELECTED
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
            <h4 styleName="title">{job.title}</h4>
            <ul styleName="job-items">
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Payment Range</div>
                  <div styleName="text">
                    {utils.formatMoneyValue(
                      job.paymentRangeFrom,
                      constants.CURRENCY_SYMBOL[job.paymentRangeCurrency]
                    )}
                    {" - "}
                    {utils.formatMoneyValue(
                      job.paymentRangeTo,
                      constants.CURRENCY_SYMBOL[job.paymentRangeCurrency]
                    )}
                    {" / "}
                    {job.paymentRangeRateType}
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
                  <div styleName="text">{job.duration} Weeks</div>
                </div>
              </li>
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Hours</div>
                  <div styleName="text">{job.hours} hours / week</div>
                </div>
              </li>
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Working Hours</div>
                  <div styleName="text">{job.workingHours}</div>
                </div>
              </li>
            </ul>
          </div>
          <div
            styleName={`right-side ${
              job.phaseAction === constants.MY_GIG_PHASE_ACTION.STAND_BY
                ? "stand-by"
                : ""
            } ${
              job.phaseAction ===
              constants.MY_GIG_PHASE_ACTION.FOLLOW_UP_BY_EMAIL
                ? "follow-up-by-email"
                : ""
            } ${!job.phaseAction ? "none" : ""}`}
          >
            {job.phaseAction !== constants.MY_GIG_PHASE_ACTION.ROUND ? (
              <Button size="lg">{job.phaseAction}</Button>
            ) : (
              <div styleName="round">
                <small styleName="round-number">
                  Round {job.phaseInterviewRound} starts in
                </small>
                <div styleName="round-starts-in">
                  {job.phaseInterviewRoundStartsIn}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div styleName="card-footer job-card-footer" ref={footerRef}>
        <div styleName="note-container">
          <NoteTooltip>
            <i styleName="icon" />
          </NoteTooltip>
          <span styleName="note">{job.note}</span>
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
        </div>
        <div
          styleName="progress-bar"
          style={{ display: expanded ? "" : "none" }}
        >
          <ProgressBar
            phases={phases}
            currentPhase={job.phase}
            currentPhaseStatus={job.phaseStatus}
            note={job.phaseNote}
          />
        </div>
      </div>
      <div styleName="card-image" style={{ bottom: `${footerHeight}px` }} />
    </div>
  );
};

JobCard.propTypes = {
  job: PT.shape(),
  phases: PT.arrayOf(PT.string),
};

export default JobCard;
