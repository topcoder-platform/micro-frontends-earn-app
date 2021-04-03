import React, { useState, useEffect, useRef } from "react";
import PT from "prop-types";
import _ from "lodash";
import RadioButton from "../../../components/RadioButton";
import Checkbox from "../../../components/Checkbox";
import DropdownTerms from "../../../components/DropdownTerms";
import Toggle from "../../../components/Toggle";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import * as utils from "../../../utils";
import * as constants from "../../../constants";

import "./styles.scss";

const ChallengeFilter = ({
  bucket,
  types,
  tracks,
  tags,
  prizeFrom,
  prizeTo,
  recommended,
  subCommunities,
  challengeBuckets,
  challengeTypes,
  challengeTracks,
  challengeTags,
  challengeSubCommunities,
  saveFilter,
  clearFilter,
  switchBucket,
  openForRegistrationCount,
}) => {
  const BUCKET_OPEN_FOR_REGISTRATION = constants.FILTER_BUCKETS[1];
  const tagOptions = utils.createDropdownTermOptions(challengeTags);
  const bucketOptions = utils.createRadioOptions(challengeBuckets, bucket);

  const [filter, setFilter] = useState(
    _.cloneDeep({
      bucket,
      types,
      tracks,
      tags,
      prizeFrom,
      prizeTo,
      subCommunities,
      recommended,
    })
  );

  utils.setSelectedDropdownTermOptions(tagOptions, filter.tags);

  useEffect(() => {
    const newFilter = _.cloneDeep({
      bucket,
      types,
      tracks,
      tags,
      prizeFrom,
      prizeTo,
      subCommunities,
      recommended,
    })
    setFilter(newFilter);
  }, [bucket, types, tracks, tags, prizeFrom, prizeTo, subCommunities, recommended])

  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const openForRegistrationElement = ref.current.children[0].children[1];
    const badgeElement = utils.icon.createBadgeElement(openForRegistrationElement, `${openForRegistrationCount}`);

    return () => {
      badgeElement.parentElement.removeChild(badgeElement);
    };
  }, [ref.current, openForRegistrationCount])


  return (
    <div styleName="filter">
      <div styleName="buckets vertical-list" ref={ref}>
        <RadioButton
          options={bucketOptions}
          onChange={(newBucketOptions) => {
            const selectedBucket = utils.getSelectedRadioOption(newBucketOptions).label;
            setFilter({ ...filter, bucket: selectedBucket });
            switchBucket(selectedBucket);
          }}
        />
      </div>

      <div styleName="challenge-types">
        <h3>Challenge Type</h3>
        <div styleName="vertical-list">
          {challengeTypes.map((type) => (
            <span key={type}>
              <Checkbox
                checked={filter.types.includes(type)}
                onChange={(checked) => {
                  const newTypes = checked
                    ? filter.types.concat(type)
                    : filter.types.filter((i) => i !== type);
                  setFilter({ ...filter, types: newTypes });
                }}
              />
              <span>{type}</span>
            </span>
          ))}
        </div>
      </div>

      <div styleName="tracks">
        <h3>Tracks</h3>
        <div styleName="vertical-list">
          {challengeTracks.map((track) => (
            <span key={track}>
              <Checkbox
                checked={filter.tracks.includes(track)}
                onChange={(checked) => {
                  const newTracks = checked
                    ? filter.tracks.concat(track)
                    : filter.tracks.filter((i) => i !== track);
                  setFilter({ ...filter, tracks: newTracks });
                }}
              />
              <span>{track}</span>
            </span>
          ))}
        </div>
      </div>

      <div styleName="skills">
        <DropdownTerms
          terms={tagOptions}
          label="Skills/Technology"
          placeholder="Type to add skills"
          onChange={(newTagOptions) => {
            const selectedTagOptions = utils.getSelectedDropdownTermsOptions(
              newTagOptions
            );
            setFilter({
              ...filter,
              tags: selectedTagOptions.map((tagOption) => tagOption.label),
            });
          }}
        />
      </div>

      <div styleName="prize">
        <h3>Prize Amount</h3>
        <TextInput size="xs" label="From" value={`${prizeFrom}`} />
        <span styleName="separator" />
        <TextInput size="xs" label="To" value={`${prizeTo}`} />
      </div>

      {challengeSubCommunities.length > 0 && (
        <div styleName="sub-communities">
          <h3>Sub Community</h3>
          <div styleName="vertical-list">
            {challengeSubCommunities.map((subCommunity) => (
              <span key={subCommunity}>
                <Checkbox
                  onChange={(checked) => {
                    const newSubCommunities = checked
                      ? filter.subCommunities.concat(subCommunity)
                      : filter.subCommunities.filter((i) => i !== subCommunity);
                    setFilter({ ...filter, subCommunities: newSubCommunities });
                  }}
                />
                <span>{subCommunity}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {bucket === BUCKET_OPEN_FOR_REGISTRATION && (
        <div styleName="recommended-challenges">
          <span styleName="toggle">
            <Toggle checked={filter.recommended} onChange={(checked) => {
              setFilter({...filter, recommended: checked, sortBy: checked ? constants.CHALLENGE_SORT_BY_RECOMMENDED : constants.CHALLENGE_SORT_BY_DEFAULT })
            }} />
          </span>
          <span>Recommended Challenges</span>
        </div>
      )}

      <div styleName="footer">
        <Button onClick={clearFilter}>CLEAR FILTER</Button>
        <Button onClick={() => saveFilter(filter)}>SAVE FILTER</Button>
      </div>
    </div>
  );
};

ChallengeFilter.propTypes = {
  bucket: PT.string,
  types: PT.arrayOf(PT.string),
  tracks: PT.arrayOf(PT.string),
  tags: PT.arrayOf(PT.string),
  prizeFrom: PT.number,
  prizeTo: PT.number,
  subCommunities: PT.arrayOf(PT.string),
  challengeBuckets: PT.arrayOf(PT.string),
  challengeTypes: PT.arrayOf(PT.string),
  challengeTracks: PT.arrayOf(PT.string),
  challengeTags: PT.arrayOf(PT.string),
  challengeSubCommunities: PT.arrayOf(PT.string),
  saveFilter: PT.func,
  clearFilter: PT.func,
  switchBucket: PT.func,
  openForRegistrationCount: PT.number,
};

export default ChallengeFilter;
