import React from "react";
import PT from "prop-types";
import CompanyLogo from "../../../../../assets/images/company-logo.svg";

import * as utils from "../../../../../utils";
import * as constants from "../../../../../constants";

import "./styles.scss";

const JobDetail = ({
  jobTitle,
  jobDescription,
  paymentInfo,
  hours,
  workingHours,
}) => {
  return (
    <div styleName="job-detail">
      <div styleName="job-detail-wrapper">
        <div styleName="detail">
          <img src={CompanyLogo} alt="Company Logo" />
          <div styleName="detail-content">
            <div styleName="title">{jobTitle}</div>
            <p styleName="description">{jobDescription}</p>
            <ul styleName="job-items">
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Payment</div>
                  <div styleName="text">{paymentInfo}</div>
                </div>
              </li>
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Hours</div>
                  <div styleName="text">{hours}</div>
                </div>
              </li>
              <li>
                <div styleName="job-item">
                  <div styleName="caption">Working hours</div>
                  <div styleName="text">{workingHours}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

JobDetail.defaultProps = {
  jobTitle: "NetFlip",
  jobDescription:
    "Job Details goes here lorem ipsum dolor sit amet conseqteur adipiscing edit tempor dolor magna aliqua.Job Details goes here lorem ipsum dolor sit amet conseqteur adipiscing edit tempor dolor magna aliqua.Job Details goes here lorem ipsum dolor sit amet conseqteur adipiscing edit tempor dolor magna aliqua.Job Details goes here lorem ipsum dolor sit amet conseqteur adipiscing edit tempor dolor magna aliqua.",
};

JobDetail.propTypes = {
  logo: PT.string,
  jobTitle: PT.string,
  jobDescription: PT.string,
  paymentInfo: PT.string,
  hours: PT.number,
  workingHours: PT.string,
};

export default JobDetail;
