import React, { useEffect, useRef, useState } from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import JobListing from "./JobListing";
import actions from "../../actions";
import { EMPTY_GIGS_TEXT } from "../../constants";

import UpdateGigProfile from "./modals/UpdateGigProfile";
import UpdateSuccess from "./modals/UpdateSuccess";

import "./styles.scss";

const MyGigs = ({
  myGigs,
  getMyGigs,
  loadMore,
  total,
  numLoaded,
  profile,
  getProfile,
  updateProfile,
  updateProfileSuccess,
  getAllCountries,
}) => {
  const propsRef = useRef();
  propsRef.current = { getMyGigs, getProfile, getAllCountries };

  useEffect(() => {
    propsRef.current.getMyGigs();
    propsRef.current.getProfile();
    propsRef.current.getAllCountries();
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
            disabled={!(profile && profile.hasProfile)}
            onClick={() => {
              setOpenUpdateProfile(true);
            }}
          >
            UPDATE GIG WORK PROFILE
          </Button>
        </h1>
        {myGigs && myGigs.length == 0 && (
          <h3 styleName="empty-label">{EMPTY_GIGS_TEXT}</h3>
        )}
        {myGigs && myGigs.length > 0 && (
          <JobListing
            jobs={myGigs}
            loadMore={loadMore}
            total={total}
            numLoaded={numLoaded}
          />
        )}
      </div>
      <Modal open={openUpdateProfile}>
        <UpdateGigProfile
          profile={profile}
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
  getProfile: PT.func,
  updateProfile: PT.func,
  updateProfileSuccess: PT.bool,
  getAllCountries: PT.func,
};

const mapStateToProps = (state) => ({
  myGigs: state.myGigs.myGigs,
  total: state.myGigs.total,
  numLoaded: state.myGigs.numLoaded,
  profile: state.myGigs.profile,
  updateProfileSuccess: state.myGigs.updatingProfileSucess,
});

const mapDispatchToProps = {
  getMyGigs: actions.myGigs.getMyGigs,
  loadMore: actions.myGigs.loadMoreMyGigs,
  getProfile: actions.myGigs.getProfile,
  updateProfile: actions.myGigs.updateProfile,
  getAllCountries: actions.lookup.getAllCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGigs);
