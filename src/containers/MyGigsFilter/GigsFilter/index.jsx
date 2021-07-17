import React from "react";
import PT from "prop-types";
import _ from "lodash";
import RadioButton from "../../../components/RadioButton";
import * as utils from "../../../utils";

import "./styles.scss";

const GigsFilter = ({ gigStatus, gigsStatuses, updateGigFilter }) => {
  const bucketOptions = utils.createRadioOptions(gigsStatuses, gigStatus);

  return (
    <div styleName="filter">
      <div styleName="buckets vertical-list">
        <RadioButton
          options={bucketOptions}
          onChange={(newBucketOptions) => {
            const filterChange = {
              status: utils.getSelectedRadioOption(newBucketOptions).label,
            };
            updateGigFilter(filterChange);
          }}
        />
        <span></span>
      </div>
    </div>
  );
};

GigsFilter.propTypes = {
  gigStatus: PT.string,
  gigsStatuses: PT.arrayOf(PT.string),
  updateGigFilter: PT.func,
};

export default GigsFilter;
