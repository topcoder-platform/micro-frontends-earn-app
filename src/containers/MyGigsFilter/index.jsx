import React, { useRef } from "react";
import PT from "prop-types";
import { useLocation } from "@reach/router";
import { connect } from "react-redux";
import GigsFilter from "./GigsFilter";
import actions from "../../actions";
import { updateQuery } from "../../utils/url";

const MyGigsFilter = ({ gigStatus, gigsStatuses, updateGigFilter }) => {
  const location = useLocation();
  const propsRef = useRef(null);
  propsRef.current = { location };

  if (location.pathname === "/earn/my-gigs") {
    return (
      <GigsFilter
        gigStatus={gigStatus}
        gigsStatuses={gigsStatuses}
        updateGigFilter={(gigFilterChanged) => {
          updateGigFilter(gigFilterChanged);
          updateQuery(gigFilterChanged);
        }}
      />
    );
  }

  return null;
};

MyGigsFilter.propTypes = {
  gigStatus: PT.string,
  gigsStatuses: PT.arrayOf(PT.string),
  updateGigFilter: PT.func,
};

const mapStateToProps = (state) => ({
  state: state,
  gigStatus: state.filter.gig.status,
  gigsStatuses: state.lookup.gigsStatuses,
});

const mapDispatchToProps = {
  updateGigFilter: actions.filter.updateGigFilter,
  updateGigQuery: actions.filter.updateGigQuery,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  updateQuery: (change) =>
    dispatchProps.updateGigQuery(
      {
        ...stateProps.state.filter.gig,
        ...change,
      },
      change
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MyGigsFilter);
