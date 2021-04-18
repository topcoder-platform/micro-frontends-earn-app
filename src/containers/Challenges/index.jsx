import React, { useEffect, useState } from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import Listing from "./Listing";
import actions from "../../actions";
import ChallengeError from "./Listing/errors/ChallengeError";
import ChallengeRecommendedError from "./Listing/errors/ChallengeRecommendedError";
import * as constants from "../../constants";
import IconListView from "../../assets/icons/list-view.svg";
import IconCardView from "../../assets/icons/card-view.svg";

import "./styles.scss";

const Challenges = ({
  challenges,
  search,
  page,
  perPage,
  sortBy,
  total,
  endDateStart,
  startDateEnd,
  updateFilter,
  bucket,
  recommended,
  recommendedChallenges,
  initialized,
  updateQuery,
}) => {
  const BUCKET_OPEN_FOR_REGISTRATION = constants.FILTER_BUCKETS[1];
  const isRecommended = recommended && bucket === BUCKET_OPEN_FOR_REGISTRATION;
  const sortByValue = isRecommended
    ? sortBy
    : sortBy === constants.CHALLENGE_SORT_BY_RECOMMENDED
    ? constants.CHALLENGE_SORT_BY_MOST_RECENT
    : sortBy;
  const sortByLabels = isRecommended
    ? Object.keys(constants.CHALLENGE_SORT_BY)
    : Object.keys(constants.CHALLENGE_SORT_BY).filter(
        (label) => label !== constants.CHALLENGE_SORT_BY_RECOMMENDED_LABEL
      );
  const noRecommendedChallenges =
    bucket === BUCKET_OPEN_FOR_REGISTRATION &&
    recommended &&
    recommendedChallenges.length === 0;

  return (
    <div styleName="page">
      <h1 styleName="title">
        <span>CHALLENGES</span>
        <span styleName="view-mode">
          <button styleName="button-icon active">
            <IconListView />
          </button>
          <button styleName="button-icon">
            <IconCardView />
          </button>
        </span>
      </h1>
      {challenges.length === 0 && initialized && <ChallengeError />}
      {challenges.length > 0 && (
        <>
          {noRecommendedChallenges && <ChallengeRecommendedError />}
          <Listing
            challenges={challenges}
            search={search}
            page={page}
            perPage={perPage}
            sortBy={sortByValue}
            total={total}
            endDateStart={endDateStart}
            startDateEnd={startDateEnd}
            updateFilter={(filterChange) => {
              updateFilter(filterChange);
              updateQuery(filterChange);
            }}
            bucket={bucket}
            sortByLabels={sortByLabels}
          />
        </>
      )}
    </div>
  );
};

Challenges.propTypes = {
  challenges: PT.arrayOf(PT.shape()),
  search: PT.string,
  page: PT.number,
  perPage: PT.number,
  sortBy: PT.string,
  total: PT.number,
  endDateStart: PT.string,
  startDateEnd: PT.string,
  updateFilter: PT.func,
  bucket: PT.string,
  recommended: PT.bool,
  recommendedChallenges: PT.arrayOf(PT.shape()),
  initialized: PT.bool,
  updateQuery: PT.func,
};

const mapStateToProps = (state) => ({
  state: state,
  search: state.filter.challenge.search,
  page: state.filter.challenge.page,
  perPage: state.filter.challenge.perPage,
  sortBy: state.filter.challenge.sortBy,
  total: state.challenges.total,
  endDateStart: state.filter.challenge.endDateStart,
  startDateEnd: state.filter.challenge.startDateEnd,
  challenges: state.challenges.challengesFiltered,
  bucket: state.filter.challenge.bucket,
  recommended: state.filter.challenge.recommended,
  recommendedChallenges: state.challenges.recommendedChallenges,
  initialized: state.challenges.initialized,
});

const mapDispatchToProps = {
  updateFilter: actions.filter.updateFilter,
  updateQuery: actions.filter.updateChallengeQuery,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateQuery: (change) =>
    dispatchProps.updateQuery(
      {
        ...stateProps.state.filter.challenge,
        ...change,
      },
      change
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Challenges);
