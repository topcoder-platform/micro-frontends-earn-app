import React, { useEffect, useRef, useState } from "react";
import PT from "prop-types";
import JobCard from "./JobCard";
import Button from "../../../components/Button";
import { useScrollLock } from "../../../utils/hooks";

import "./styles.scss";

const JobListing = ({ jobs, phases, loadMore, total, numLoaded }) => {
  const scrollLock = useScrollLock();

  const varsRef = useRef();
  varsRef.current = { scrollLock };

  useEffect(() => {
    varsRef.current.scrollLock(false);
  }, [jobs]);

  return (
    <div styleName="card-container">
      {jobs.map((job, index) => (
        <div styleName="card-item" key={`${job.title}-${index}`}>
          <JobCard job={job} phases={phases} />
        </div>
      ))}

      {numLoaded < total && (
        <div styleName="load-more">
          <Button
            onClick={() => {
              scrollLock(true);
              loadMore();
            }}
          >
            LOAD MORE
          </Button>
        </div>
      )}
    </div>
  );
};

JobListing.propTypes = {
  jobs: PT.arrayOf(PT.shape()),
  phases: PT.arrayOf(PT.string),
  loadMore: PT.func,
  total: PT.number,
  numLoaded: PT.number,
};

export default JobListing;
