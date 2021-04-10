import React, { useEffect, useState } from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import Listing from "./Listing";
import actions from "../../actions";
import ChallengeError from "./Listing/ChallengeError";
import "./styles.scss";

const Challenges = ({
  challenges,
  page,
  perPage,
  sortBy,
  total,
  endDateStart,
  startDateEnd,
  getChallenges,
  updateFilter,
  bucket,
  tags,
}) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    getChallenges().finally(() => setInitialized(true));
  }, []);

  return (
    <div styleName="page">
      <h1 styleName="title">CHALLENGES</h1>
      {challenges.length === 0 ? (
        initialized && <ChallengeError />
      ) : (
        <Listing
          challenges={challenges}
          page={page}
          perPage={perPage}
          sortBy={sortBy}
          total={total}
          endDateStart={endDateStart}
          startDateEnd={startDateEnd}
          updateFilter={updateFilter}
          bucket={bucket}
          tags={tags}
          getChallenges={getChallenges}
        />
      )}
    </div>
  );
};

Challenges.propTypes = {
  challenges: PT.arrayOf(PT.shape()),
  page: PT.number,
  perPage: PT.number,
  sortBy: PT.string,
  total: PT.number,
  endDateStart: PT.string,
  startDateEnd: PT.string,
  getChallenges: PT.func,
  updateFilter: PT.func,
  bucket: PT.string,
  tags: PT.arrayOf(PT.string),
};

const mapStateToProps = (state) => ({
  state: state,
  page: state.filter.challenge.page,
  perPage: state.filter.challenge.perPage,
  sortBy: state.filter.challenge.sortBy,
  total: state.challenges.total,
  endDateStart: state.filter.challenge.endDateStart,
  startDateEnd: state.filter.challenge.startDateEnd,
  challenges: state.challenges.challengesFiltered,
  bucket: state.filter.challenge.bucket,
  tags: state.filter.challenge.tags,
});

const mapDispatchToProps = {
  getChallenges: actions.challenges.getChallenges,
  updateFilter: actions.filter.updateFilter,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  getChallenges: (change) =>
    dispatchProps.getChallenges(
      { ...stateProps.state.filter.challenge, ...change },
      change
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Challenges);
