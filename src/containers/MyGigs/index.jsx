import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "@reach/router";
import PT from "prop-types";
import { connect } from "react-redux";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import Empty from "../../components/Empty";
import JobListing from "./JobListing";
import actions from "../../actions";
import * as utils from "../../utils";

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
  checkingGigs,
  startCheckingGigs,
  gigStatus,
}) => {
  const location = useLocation();
  const params = utils.url.parseUrlQuery(location.search);
  const propsRef = useRef();
  propsRef.current = {
    getMyGigs,
    getProfile,
    getAllCountries,
    startCheckingGigs,
    params,
  };

  useEffect(() => {
    propsRef.current.getProfile();
    propsRef.current.getAllCountries();
    if (propsRef.current.params.externalId) {
      propsRef.current.startCheckingGigs(propsRef.current.params.externalId);
    } else {
      // propsRef.current.getMyGigs();
    }
  }, []);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (!checkingGigs) {
      propsRef.current.getMyGigs();
    }
  }, [checkingGigs]);

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
        {!checkingGigs && myGigs && myGigs.length == 0 && <Empty />}
        {!checkingGigs && myGigs && myGigs.length > 0 && (
          <JobListing
            gigStatus={gigStatus}
            jobs={myGigs}
            loadMore={loadMore}
            total={total}
            numLoaded={numLoaded}
          />
        )}
        {checkingGigs && <Loading />}
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
  checkingGigs: PT.bool,
  startCheckingGigs: PT.func,
};

const mapStateToProps = (state) => ({
  gigStatus: state.filter.gig.status,
  checkingGigs: state.myGigs.checkingGigs,
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
  startCheckingGigs: actions.myGigs.startCheckingGigs,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGigs);
