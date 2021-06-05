import React, { useEffect, useRef } from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import Button from "../../components/Button";
import JobListing from "./JobListing";
import actions from "../../actions";

import "./styles.scss";

const MyGigs = ({
  myGigs,
  phases,
  getPhases,
  getMyGigs,
  loadMore,
  total,
  numLoaded,
}) => {
  const propsRef = useRef();
  propsRef.current = { getMyGigs, getPhases };

  useEffect(() => {
    propsRef.current.getMyGigs();
    propsRef.current.getPhases();
  }, []);

  return (
    <div styleName="page">
      <h1 styleName="title">
        <span styleName="text">MY GIGS</span>
        <Button isPrimary size="lg">
          UPDATE GIG WORK PROFILE
        </Button>
      </h1>
      <JobListing
        jobs={myGigs}
        phases={phases}
        loadMore={loadMore}
        total={total}
        numLoaded={numLoaded}
      />
    </div>
  );
};

MyGigs.propTypes = {
  myGigs: PT.arrayOf(PT.shape()),
  phases: PT.arrayOf(PT.string),
  getPhases: PT.func,
  getMyGigs: PT.func,
  loadMore: PT.func,
  total: PT.number,
  numLoaded: PT.number,
};

const mapStateToProps = (state) => ({
  myGigs: state.myGigs.myGigs,
  total: state.myGigs.total,
  numLoaded: state.myGigs.numLoaded,
  phases: state.lookup.gigPhases,
});

const mapDispatchToProps = {
  getMyGigs: actions.myGigs.getMyGigs,
  loadMore: actions.myGigs.loadMoreMyGigs,
  getPhases: actions.lookup.getGigPhases,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGigs);
