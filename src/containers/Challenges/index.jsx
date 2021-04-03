import React, { useEffect, useState } from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import Listing from "./Listing";
import actions from "../../actions";
import ChallengeError from "./Listing/ChallengeError";
import IconListView from '../../assets/icons/list-view.svg';
import IconCardView from '../../assets/icons/card-view.svg';
import { ButtonIcon } from '../../components/Button';
import * as constants from "../../constants";

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
  getChallenges,
  updateFilter,
  bucket,
  recommended,
}) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    getChallenges().finally(() => setInitialized(true));
  }, []);

  let sortByLabels = Object.keys(constants.CHALLENGE_SORT_BY)
  sortByLabels = recommended ? sortByLabels : sortByLabels.filter(label => label !== constants.CHALLENGE_SORT_BY_RECOMMENDED_LABEL);

  return (
    <div styleName="page">
      <h1 styleName="title">
        <span>CHALLENGES</span>
        <span styleName="view-mode">
          <ButtonIcon><IconListView /></ButtonIcon>
          <ButtonIcon><IconCardView /></ButtonIcon>
        </span>
      </h1>
      {challenges.length === 0 ? (
        initialized && <ChallengeError bucket={bucket} recommended={recommended} />
      ) : (
        <Listing
          challenges={challenges}
          search={search}
          page={page}
          perPage={perPage}
          sortBy={sortBy}
          total={total}
          endDateStart={endDateStart}
          startDateEnd={startDateEnd}
          updateFilter={updateFilter}
          bucket={bucket}
          getChallenges={getChallenges}
          challengeSortBys={sortByLabels}
        />
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
  getChallenges: PT.func,
  updateFilter: PT.func,
  bucket: PT.string,
  recommended: PT.bool,
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
  challenges: state.challenges.challenges,
  bucket: state.filter.challenge.bucket,
  recommended: state.filter.challenge.recommended,
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
  mergeProps,
)(Challenges);
