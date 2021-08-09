import React, { useRef } from "react";
import PT from "prop-types";
import _ from "lodash";
import moment from "moment";
import Panel from "../../../components/Panel";
import Pagination from "../../../components/Pagination";
import ChallengeItem from "./ChallengeItem";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../../components/Dropdown";
import DateRangePicker from "../../../components/DateRangePicker";
import * as utils from "../../../utils";
import * as constants from "../../../constants";
import IconSearch from "assets/images/search.svg";

import "./styles.scss";

const Listing = ({
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
  sortByLabels,
  isLoggedIn,
  tags,
}) => {
  const sortByOptions = utils.createDropdownOptions(
    sortByLabels,
    utils.getSortByLabel(constants.CHALLENGE_SORT_BY, sortBy)
  );

  const onSearch = useRef(_.debounce((f) => f(), 1000));

  return (
    <Panel>
      <Panel.Header>
        <div>
          <div styleName="input-group">
            <span styleName="search-icon">
              <img src={IconSearch} alt="search" />
            </span>
            <TextInput
              value={search}
              placeholder="Search for challenges"
              size="xs"
              onChange={(value) => {
                onSearch.current(() => {
                  const filterChange = { search: value };
                  updateFilter(filterChange);
                });
              }}
            />
          </div>
          <div styleName="separator" />
          <div
            styleName={`sort-by ${
              bucket === constants.FILTER_BUCKETS[2] ? "hidden" : ""
            }`}
          >
            <Dropdown
              label="Sort by"
              options={sortByOptions}
              size="xs"
              onChange={(newSortByOptions) => {
                const selectedOption = utils.getSelectedDropdownOption(
                  newSortByOptions
                );
                const filterChange = {
                  sortBy: constants.CHALLENGE_SORT_BY[selectedOption.label],
                };
                updateFilter(filterChange);
              }}
            />
          </div>
          <div
            styleName={`from-to ${
              bucket !== constants.FILTER_BUCKETS[2] ? "hidden" : ""
            }`}
          >
            <DateRangePicker
              onChange={(range) => {
                const d = range.endDate
                  ? moment(range.endDate).toISOString()
                  : null;
                const s = range.startDate
                  ? moment(range.startDate).toISOString()
                  : null;
                const filterChange = { endDateStart: s, startDateEnd: d };
                updateFilter(filterChange);
              }}
              range={{
                startDate: endDateStart ? moment(endDateStart).toDate() : null,
                endDate: startDateEnd ? moment(startDateEnd).toDate() : null,
              }}
            />
          </div>
        </div>
      </Panel.Header>
      <Panel.Body>
        {challenges
          .filter((challenge) => !challenge.isStalled)
          .map((challenge, index) => (
            <div
              key={challenge.id}
              styleName={index % 2 === 0 ? "even" : "odd"}
            >
              <ChallengeItem
                challenge={challenge}
                onClickTag={(tag) => {
                  const filterChange = { tags: [tag] };
                  updateFilter(filterChange);
                }}
                onClickTrack={(track) => {
                  const filterChange = { tracks: [track] };
                  updateFilter(filterChange);
                }}
                isLoggedIn={isLoggedIn}
              />
            </div>
          ))}
        <div styleName="pagination">
          <Pagination
            length={total}
            pageSize={perPage}
            pageIndex={utils.pagination.pageToPageIndex(page)}
            onChange={(event) => {
              const filterChange = {
                page: utils.pagination.pageIndexToPage(event.pageIndex),
                perPage: event.pageSize,
              };
              updateFilter(filterChange);
            }}
          />
        </div>
      </Panel.Body>
    </Panel>
  );
};

Listing.propTypes = {
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
  sortByLabels: PT.arrayOf(PT.string),
  isLoggedIn: PT.bool,
};

export default Listing;
