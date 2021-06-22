import React, { useEffect, useRef, useState } from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import JobListing from "./JobListing";
import actions from "../../actions";

import UpdateGigProfile from "./modals/UpdateGigProfile";
import UpdateSuccess from "./modals/UpdateSuccess";

import "./styles.scss";

const MyGigs = ({
  myGigs,
  phases,
  getPhases,
  getMyGigs,
  loadMore,
  total,
  numLoaded,
  profile,
  statuses,
  getProfile,
  getStatuses,
  updateProfile,
  updateProfileSuccess,
}) => {
  const propsRef = useRef();
  propsRef.current = { getMyGigs, getPhases, getProfile, getStatuses };

  useEffect(() => {
    propsRef.current.getMyGigs();
    propsRef.current.getPhases();
    propsRef.current.getProfile();
    propsRef.current.getStatuses();
  }, []);

  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  useEffect(() => {
    if (updateProfileSuccess) {
      setOpenUpdateSuccess(true);
      // in case of success, let's fetch the updated profile
      propsRef.current.getProfile();
    }
  }, [updateProfileSuccess]);

  return (
    <>
      <div styleName="page">
        <h1 styleName="title">
          <span styleName="text">MY GIGS</span>
          <Button
            isPrimary
            size="lg"
            // disabled="true"
            onClick={() => {
              setOpenUpdateProfile(true);
            }}
          >
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
      <Modal open={openUpdateProfile}>
        <UpdateGigProfile
          profile={profile}
          statuses={statuses}
          onSubmit={(profileEdit) => {
            updateProfile(profileEdit);
            setOpenUpdateProfile(false);
          }}
          onClose={() => {
            setOpenUpdateProfile(false);
          }}
        />
      </Modal>
      <Modal open={openUpdateSuccess}>
        <UpdateSuccess
          onClose={() => {
            setOpenUpdateSuccess(false);
          }}
        />
      </Modal>
    </>
  );
};

MyGigs.propTypes = {
  myGigs: PT.arrayOf(PT.shape()),
  getMyGigs: PT.func,
  loadMore: PT.func,
  total: PT.number,
  numLoaded: PT.number,
  profile: PT.shape(),
  statuses: PT.arrayOf(PT.string),
  getProfile: PT.func,
  getStatuses: PT.func,
  updateProfile: PT.func,
  updateProfileSuccess: PT.bool,
};

const mapStateToProps = (state) => ({
  myGigs: state.myGigs.myGigs,
  total: state.myGigs.total,
  numLoaded: state.myGigs.numLoaded,
  phases: state.lookup.gigPhases,
  profile: state.myGigs.profile,
  statuses: state.lookup.gigStatuses,
  updateProfileSuccess: state.myGigs.updatingProfileSucess,
});

const mapDispatchToProps = {
  getMyGigs: actions.myGigs.getMyGigs,
  loadMore: actions.myGigs.loadMoreMyGigs,
  getPhases: actions.lookup.getGigPhases,
  getProfile: actions.myGigs.getProfile,
  getStatuses: actions.lookup.getGigStatuses,
  updateProfile: actions.myGigs.updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGigs);
