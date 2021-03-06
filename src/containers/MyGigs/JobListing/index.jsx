import React, { useEffect, useRef, useState } from "react";
import PT from "prop-types";
import JobCard from "./JobCard";
import Button from "../../../components/Button";
import { useScrollLock } from "../../../utils/hooks";

import "./styles.scss";

const JobListing = ({ jobs, loadMore, total, numLoaded }) => {
  const scrollLock = useScrollLock();
  const [page, setPage] = useState(1);

  const varsRef = useRef();
  varsRef.current = { scrollLock };

  const handleLoadMoreClick = () => {
    const nextPage = page + 1;
    scrollLock(true);
    setPage(nextPage);
    loadMore(nextPage);
  };

  useEffect(() => {
    varsRef.current.scrollLock(false);
  }, [jobs]);

  return (
    <div styleName="card-container">
      {jobs.map((job, index) => (
        <div styleName="card-item" key={`${job.title}-${index}`}>
          <JobCard job={job} />
        </div>
      ))}

      {numLoaded < total && (
        <div styleName="load-more">
          <Button onClick={handleLoadMoreClick}>LOAD MORE</Button>
        </div>
      )}
    </div>
  );
};

JobListing.propTypes = {
  jobs: PT.arrayOf(PT.shape()),
  loadMore: PT.func,
  total: PT.number,
  numLoaded: PT.number,
};

export default JobListing;
