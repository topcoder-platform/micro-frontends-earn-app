/* global process */
import React, { useEffect, useMemo, useState, useRef } from "react";
import PT from "prop-types";
import Button from "components/Button";
import FilePicker from "components/FilePicker";
import TextInput from "components/TextInput";
import Dropdown from "components/Dropdown";
import UserPhoto from "components/UserPhoto";
import IconClose from "assets/icons/close.svg";
import IconInfo from "assets/icons/info.svg";
import StatusTooltip from "./tooltips/StatusTooltip";
import _ from "lodash";

import * as constants from "constants";
import * as utils from "utils";

import "./styles.scss";

const UpdateGigProfile = ({ profile, statuses, onSubmit, onClose }) => {
  const countryOptions = useMemo(() => {
    const countryMap = utils.myGig.countries.getNames("en");
    const options = Object.keys(countryMap).map((key) => countryMap[key]);
    const selected = profile.country;
    return utils.createDropdownOptions(options, selected);
  }, [profile]);

  const statusOptions = useMemo(() => {
    const selected = profile.status;
    const options =
      profile.gigStatus === constants.MY_GIG_STATUS_PLACED
        ? statuses
        : statuses.filter((s) => s !== constants.GIG_STATUS.PLACED);
    return utils.createDropdownOptions(options, selected);
  }, [profile, statuses]);

  const [profileEdit, setProfileEdit] = useState(
    profile ? _.clone(profile) : null
  );
  const [validation, setValidation] = useState(null);
  const [pristine, setPristine] = useState(true);

  useEffect(() => {
    setProfileEdit(_.clone(profile));
  }, [profile]);

  useEffect(() => {
    let validation = null;
    let error;

    if (profileEdit == null) {
      return;
    }

    if (!profileEdit.status) {
      validation = validation || {};
      validation.status = "Please, select your status";
    }

    if (profileEdit.fileError) {
      validation = validation || {};
      validation.file = profileEdit.fileError;
    }

    if (!profileEdit.file) {
      validation = validation || {};
      validation.file = "Please, pick your CV file for uploading";
    }

    if ((error = utils.myGig.validateCity(profileEdit.city))) {
      validation = validation || {};
      validation.city = error;
    }

    if (!profileEdit.country) {
      validation = validation || {};
      validation.country = "Please, select your country";
    }

    if (
      (error = utils.myGig.validatePhone(
        profileEdit.phone,
        profileEdit.country
      ))
    ) {
      validation = validation || {};
      validation.phone = error;
    }

    setValidation(validation);
  }, [profileEdit]);

  const submitEnabled =
    validation === null &&
    !profileEdit.fileError &&
    (profile.city !== profileEdit.city ||
      profile.country !== profileEdit.country ||
      profile.phone !== profileEdit.phone ||
      profile.status !== profileEdit.status ||
      profile.file !== profileEdit.file);

  const varsRef = useRef();
  varsRef.current = { profileEdit, validation };

  const onSubmitProfile = () => {
    const update = varsRef.current.profileEdit;
    delete update.fileError;
    onSubmit(update);
  };

  return (
    <div styleName="update-resume">
      <button styleName="close" onClick={onClose}>
        <IconClose />
      </button>
      <h4 styleName="title">UPDATE RESUME</h4>
      <p styleName="text warnings">
        Uploading a resume will change your resume for all jobs that you apply
        to.
      </p>
      <div styleName="profile">
        <div styleName="member">
          <div styleName="photo">
            <UserPhoto handle={profile.handle} photoURL={profile.photoURL} />
          </div>
          <div styleName="handle">
            <a
              href={`${process.env.URL.COMMUNITY_APP}/members/${profile.handle}`}
            >
              {profile.handle}
            </a>
          </div>
          <div styleName="name">
            {profile.firstName} {profile.lastName}
          </div>
          <div styleName="email">{profile.email}</div>
          <div styleName="status">
            <div styleName="dropdown">
              <Dropdown
                options={statusOptions}
                size="xs"
                onChange={(newOptions) => {
                  const selectedOption = utils.getSelectedDropdownOption(
                    newOptions
                  );
                  setProfileEdit({
                    ...varsRef.current.profileEdit,
                    status: selectedOption.label,
                  });
                  setPristine(false);
                }}
                errorMsg={(!pristine && validation && validation.status) || ""}
              />
            </div>
            <StatusTooltip>
              <i styleName="icon">
                <IconInfo />
              </i>
            </StatusTooltip>
          </div>
        </div>
        <div styleName="details">
          <div styleName="resume">
            <FilePicker
              label="Drag & drop your resume or CV here - Please Omit Contact Information"
              required
              file={profileEdit.file}
              uploadTime={profileEdit.uploadTime}
              accept=".pdf, .docx"
              errorMsg={(!pristine && validation && validation.file) || ""}
              onFilePick={(file, error) => {
                if (error) {
                  setProfileEdit({
                    ...varsRef.current.profileEdit,
                    file,
                    fileError: error,
                    uploadTime: null,
                  });
                } else {
                  setProfileEdit({
                    ...varsRef.current.profileEdit,
                    file,
                    fileError: null,
                    uploadTime: null,
                  });
                }
                setPristine(false);
              }}
            />
          </div>
          <div styleName="city">
            <TextInput
              value={profileEdit.city}
              label="City"
              required
              onChange={(value) => {
                setProfileEdit({ ...varsRef.current.profileEdit, city: value });
                setPristine(false);
              }}
              errorMsg={(!pristine && validation && validation.city) || ""}
            />
          </div>
          <div styleName="country">
            <Dropdown
              options={countryOptions}
              label="Country"
              required
              onChange={(newOptions) => {
                const selectedOption = utils.getSelectedDropdownOption(
                  newOptions
                );
                setProfileEdit({
                  ...varsRef.current.profileEdit,
                  country: selectedOption.label,
                });
                setPristine(false);
              }}
              errorMsg={(!pristine && validation && validation.country) || ""}
            />
          </div>
          <div styleName="phone">
            <TextInput
              value={profileEdit.phone}
              label="Phone - Please have the Country Code Included"
              required
              onChange={(value) => {
                setProfileEdit({
                  ...varsRef.current.profileEdit,
                  phone: value,
                });
                setPristine(false);
              }}
              errorMsg={(!pristine && validation && validation.phone) || ""}
            />
          </div>
        </div>
      </div>
      <div styleName="footer">
        <a
          href={`${process.env.URL.COMMUNITY_APP}/settings/profile#skills`}
          styleName="link"
        >
          Update your skills from Topcoder Profile page
        </a>
        <Button
          isPrimary
          size="lg"
          disabled={!submitEnabled}
          onClick={onSubmitProfile}
        >
          UPDATE PROFILE
        </Button>
      </div>
    </div>
  );
};

UpdateGigProfile.propTypes = {
  profile: PT.shape(),
  statuses: PT.arrayOf(PT.string),
  onSubmit: PT.func,
  onClose: PT.func,
};

export default UpdateGigProfile;
