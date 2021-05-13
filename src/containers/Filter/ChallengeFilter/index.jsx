import React, { useEffect, useRef, useState } from "react";
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
  totalPrizesFrom,
  totalPrizesTo,
  recommended,
  events,
  groups,
  challengeBuckets,
  challengeTypes,
  challengeTracks,
  challengeTags,
  challengeSubCommunities,
  saveFilter,
  clearFilter,
  updateFilter,
  openForRegistrationCount,
}) => {
  // const BUCKET_OPEN_FOR_REGISTRATION = constants.FILTER_BUCKETS[1];
  const tagOptions = utils.createDropdownTermOptions(challengeTags, tags);
  const bucketOptions = utils.createRadioOptions(challengeBuckets, bucket);

  const caseSensitive = false;
  utils.setSelectedDropdownTermOptions(tagOptions, tags, caseSensitive);

  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const openForRegistrationElement = ref.current.children[0].children[1];
    const badgeElement = utils.icon.createBadgeElement(
      openForRegistrationElement,
      `${openForRegistrationCount}`
    );

    return () => {
      badgeElement.parentElement.removeChild(badgeElement);
    };
  }, [openForRegistrationCount]);

  const [totalPrizesFromError, setTotalPrizesFromError] = useState(null);
  const [totalPrizesToError, setTotalPrizesToError] = useState(null);

  const onInputTotalPrizesFrom = useRef(_.debounce((f) => f(), 500));
  const onInputTotalPrizesTo = useRef(_.debounce((f) => f(), 500));

  return (
    <div styleName="filter">
      <div styleName="buckets vertical-list" ref={ref}>
        <RadioButton
          options={bucketOptions}
          onChange={(newBucketOptions) => {
            const filterChange = {
              bucket: utils.getSelectedRadioOption(newBucketOptions).label,
              page: 1,
            };
            updateFilter(filterChange);
          }}
        />
        <span></span>
      </div>

      <div styleName="challenge-types">
        <h3>Challenge Type</h3>
        <div styleName="vertical-list">
          {challengeTypes.map((type) => (
            <span key={type}>
              <Checkbox
                checked={types.includes(type)}
                onChange={(checked) => {
                  const newTypes = checked
                    ? types.concat(type)
                    : types.filter((i) => i !== type);
                  const filterChange = { types: newTypes };
                  updateFilter(filterChange);
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
                checked={tracks.includes(track)}
                onChange={(checked) => {
                  const newTracks = checked
                    ? tracks.concat(track)
                    : tracks.filter((i) => i !== track);
                  const filterChange = { tracks: newTracks };
                  updateFilter(filterChange);
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
            const filterChange = {
              tags: selectedTagOptions.map((tagOption) => tagOption.label),
            };
            updateFilter(filterChange);
          }}
          size="xs"
        />
      </div>

      <div styleName="total-prizes">
        <h3>Prize Amount</h3>
        <div styleName="input-group">
          <TextInput
            size="xs"
            label="From"
            value={utils.formatTotalPrizes(totalPrizesFrom)}
            onChange={(value) =>
              onInputTotalPrizesFrom.current(() => {
                if (value === "") {
                  setTotalPrizesFromError("Required");
                  return;
                }
                value = utils.parseTotalPrizes(value);
                if (value == null) {
                  setTotalPrizesFromError("Invalid format");
                  return;
                } else {
                  setTotalPrizesFromError(null);
                }
                if (totalPrizesToError) {
                  return;
                }
                const filterChange = {
                  totalPrizesFrom: value,
                };
                updateFilter(filterChange);
              })
            }
            errorMsg={totalPrizesFromError}
          />
          <span styleName="suffix">USD</span>
        </div>
        <span styleName="separator" />
        <div styleName="input-group">
          <TextInput
            size="xs"
            label="To"
            value={utils.formatTotalPrizes(totalPrizesTo)}
            onChange={(value) =>
              onInputTotalPrizesTo.current(() => {
                if (value === "") {
                  setTotalPrizesToError("Required");
                  return;
                }
                value = utils.parseTotalPrizes(value);
                if (value == null) {
                  setTotalPrizesToError("Invalid format");
                  return;
                } else {
                  setTotalPrizesToError(null);
                }
                if (totalPrizesFromError) {
                  return;
                }
                const filterChange = {
                  totalPrizesTo: value,
                };
                updateFilter(filterChange);
              })
            }
            errorMsg={totalPrizesToError}
          />
          <span styleName="suffix">USD</span>
        </div>
      </div>

      {challengeSubCommunities.length > 0 && (
        <div styleName="sub-communities">
          <h3>Sub Community</h3>
          <div styleName="vertical-list">
            {challengeSubCommunities.map((subCommunity) => (
              <span key={subCommunity.communityName}>
                <Checkbox
                  checked={
                    // select all if query filters neither events nor groups
                    events.length + groups.length === 0 ||
                    events.includes(
                      utils.challenge.getCommunityEvent(subCommunity)
                    ) ||
                    groups.includes(
                      utils.challenge.getCommunityGroup(subCommunity)
                    )
                  }
                  onChange={(checked) => {
                    const isTCOEvent = utils.challenge.isTCOEventCommunity(
                      subCommunity
                    );
                    const filterChange = { events, groups };

                    if (events.length + groups.length === 0) {
                      // select all if query filters neither events nor groups
                      filterChange.events = challengeSubCommunities
                        .filter(utils.challenge.isTCOEventCommunity)
                        .map(utils.challenge.getCommunityEvent);
                      filterChange.groups = challengeSubCommunities
                        .filter(utils.challenge.isGroupCommunity)
                        .map(utils.challenge.getCommunityGroup);
                    }

                    if (isTCOEvent) {
                      const scEvent = utils.challenge.getCommunityEvent(
                        subCommunity
                      );
                      filterChange.events = checked
                        ? _.union(filterChange.events, [scEvent])
                        : _.without(filterChange.events, scEvent);
                    } else {
                      const scGroup = utils.challenge.getCommunityGroup(
                        subCommunity
                      );
                      filterChange.groups = checked
                        ? _.union(filterChange.groups, [scGroup])
                        : _.without(filterChange.groups, scGroup);
                    }

                    // clear community filters if all sub-communities are selected
                    if (
                      filterChange.groups.length + filterChange.events.length >=
                      challengeSubCommunities.length
                    ) {
                      filterChange.events = [];
                      filterChange.groups = [];
                    }
                    updateFilter(filterChange);
                  }}
                />
                <span>{subCommunity.communityName}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {/* DISABLED UNTIL IMPLEMENT RECOMMENDED CHALLENGES */}
      {/* bucket === BUCKET_OPEN_FOR_REGISTRATION && (
        <div styleName="recommended-challenges">
          <span styleName="toggle">
            <Toggle
              checked={recommended}
              onChange={(checked) => {
                updateFilter({
                  recommended: checked,
                  sortBy: checked
                    ? constants.CHALLENGE_SORT_BY_RECOMMENDED
                    : constants.CHALLENGE_SORT_BY_MOST_RECENT,
                });
              }}
            />
          </span>
          <span>Recommended Challenges</span>
        </div>
      )*/}
      <div styleName="footer">
        <Button onClick={clearFilter}>CLEAR FILTER</Button>
        {/*<Button onClick={saveFilter}>SAVE FILTER</Button>*/}
      </div>
    </div>
  );
};

ChallengeFilter.propTypes = {
  bucket: PT.string,
  types: PT.arrayOf(PT.string),
  tracks: PT.arrayOf(PT.string),
  tags: PT.arrayOf(PT.string),
  totalPrizesFrom: PT.number,
  totalPrizesTo: PT.number,
  events: PT.arrayOf(PT.string),
  groups: PT.arrayOf(PT.string),
  challengeBuckets: PT.arrayOf(PT.string),
  challengeTypes: PT.arrayOf(PT.string),
  challengeTracks: PT.arrayOf(PT.string),
  challengeTags: PT.arrayOf(PT.string),
  challengeSubCommunities: PT.arrayOf(PT.shape()),
  saveFilter: PT.func,
  clearFilter: PT.func,
  updateFilter: PT.func,
  openForRegistrationCount: PT.number,
};

export default ChallengeFilter;
