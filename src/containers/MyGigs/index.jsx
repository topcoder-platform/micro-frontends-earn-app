import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useLocation } from "@reach/router";
import PT from "prop-types";
import { connect } from "react-redux";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import Empty from "../../components/Empty";
import JobListing from "./JobListing";
import actions from "../../actions";
import * as constants from "../../constants";

import UpdateGigProfile from "./modals/UpdateGigProfile";
import UpdateSuccess from "./modals/UpdateSuccess";

import "./styles.scss";

const MyGigs = ({
  myActiveGigs,
  myOpenGigs,
  myCompletedGigs,
  myArchivedGigs,
  profile,
  getProfile,
  updateProfile,
  updateProfileSuccess,
  getAllCountries,
  checkingGigs,
  startCheckingGigs,
  gigStatus,
  loadingMyGigs,
  getMyActiveGigs,
  getMyOpenGigs,
  getMyCompletedGigs,
  getMyArchivedGigs,
}) => {
  const propsRef = useRef();
  propsRef.current = {
    getMyOpenGigs,
    getProfile,
    getAllCountries,
    startCheckingGigs,
  };

  useEffect(() => {
    propsRef.current.getProfile();
    propsRef.current.getAllCountries();
  }, []);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!checkingGigs) {
      propsRef.current.getMyOpenGigs();
    }
  }, [checkingGigs]);

  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [currentGigs, setCurrentGigs] = useState({});

  useEffect(() => {
    if (gigStatus == constants.GIGS_FILTER_STATUSES.ACTIVE_JOBS) {
      setCurrentGigs(myActiveGigs);
    }
    if (gigStatus == constants.GIGS_FILTER_STATUSES.OPEN_JOBS) {
      setCurrentGigs(myOpenGigs);
    }
    if (gigStatus == constants.GIGS_FILTER_STATUSES.COMPLETED_JOBS) {
      setCurrentGigs(myCompletedGigs);
    }
    if (gigStatus == constants.GIGS_FILTER_STATUSES.ARCHIVED_JOBS) {
      setCurrentGigs(myArchivedGigs);
    }
  }, [gigStatus, myActiveGigs, myOpenGigs, myCompletedGigs, myArchivedGigs]);

  useEffect(() => {
    if (updateProfileSuccess) {
      setOpenUpdateSuccess(true);
      // in case of success, let's fetch the updated profile
      propsRef.current.getProfile();
    }
  }, [updateProfileSuccess]);

  const currentLoadMore = useCallback(
    (status, page) => {
      if (gigStatus == constants.GIGS_FILTER_STATUSES.ACTIVE_JOBS) {
        getMyActiveGigs(status, page);
      }
      if (gigStatus == constants.GIGS_FILTER_STATUSES.OPEN_JOBS) {
        getMyOpenGigs(status, page);
      }
      if (gigStatus == constants.GIGS_FILTER_STATUSES.COMPLETED_JOBS) {
        getMyCompletedGigs(status, page);
      }
      if (gigStatus == constants.GIGS_FILTER_STATUSES.ARCHIVED_JOBS) {
        getMyArchivedGigs(status, page);
      }
    },
    [
      gigStatus,
      getMyActiveGigs,
      getMyOpenGigs,
      getMyCompletedGigs,
      getMyArchivedGigs,
    ]
  );

  return (
    <>
      <div styleName="page">
        <h1 styleName="title">
          <span styleName="text">MY GIGS</span>
          <div styleName="operation">
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
            <Button
              size="lg"
              onClick={() => {
                window.location.href = `${process.env.URL.BASE}/gigs`;
              }}
            >
              VIEW GIGS
            </Button>
          </div>
        </h1>
        {!checkingGigs &&
          !loadingMyGigs &&
          currentGigs.myGigs &&
          currentGigs.myGigs.length == 0 && <Empty gigStatus={gigStatus} />}
        {!checkingGigs &&
          currentGigs.myGigs &&
          currentGigs.myGigs.length > 0 && (
            <JobListing
              gigStatus={gigStatus}
              jobs={currentGigs.myGigs}
              loadMore={currentLoadMore}
              total={currentGigs.total}
              numLoaded={currentGigs.numLoaded}
              page={currentGigs.page}
            />
          )}
        {(checkingGigs || (loadingMyGigs && !currentGigs.myGigs)) && (
          <Loading />
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
  gigStatus: PT.string,
  profile: PT.shape(),
  getProfile: PT.func,
  updateProfile: PT.func,
  updateProfileSuccess: PT.bool,
  getAllCountries: PT.func,
  checkingGigs: PT.bool,
  startCheckingGigs: PT.func,
  myActiveGigs: PT.shape(),
  myOpenGigs: PT.shape(),
  myCompletedGigs: PT.shape(),
  myArchivedGigs: PT.shape(),
  loadingMyGigs: PT.bool,
  getMyActiveGigs: PT.func,
  getMyOpenGigs: PT.func,
  getMyCompletedGigs: PT.func,
  getMyArchivedGigs: PT.func,
};

const mapStateToProps = (state) => ({
  gigStatus: state.filter.gig.status,
  checkingGigs: state.myGigs.checkingGigs,
  loadingMyGigs: state.myGigs.loadingMyGigs,
  myActiveGigs: state.myGigs[constants.GIGS_FILTER_STATUSES.ACTIVE_JOBS],
  myOpenGigs: state.myGigs[constants.GIGS_FILTER_STATUSES.OPEN_JOBS],
  myCompletedGigs: state.myGigs[constants.GIGS_FILTER_STATUSES.COMPLETED_JOBS],
  myArchivedGigs: state.myGigs[constants.GIGS_FILTER_STATUSES.ARCHIVED_JOBS],
  profile: state.myGigs.profile,
  updateProfileSuccess: state.myGigs.updatingProfileSucess,
});

const mapDispatchToProps = {
  getMyActiveGigs: actions.myGigs.getMyActiveGigs,
  getMyOpenGigs: actions.myGigs.getMyOpenGigs,
  getMyCompletedGigs: actions.myGigs.getMyCompletedGigs,
  getMyArchivedGigs: actions.myGigs.getMyArchivedGigs,
  getProfile: actions.myGigs.getProfile,
  updateProfile: actions.myGigs.updateProfile,
  getAllCountries: actions.lookup.getAllCountries,
  startCheckingGigs: actions.myGigs.startCheckingGigs,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGigs);
