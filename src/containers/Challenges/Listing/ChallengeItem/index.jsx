import React from "react";
import PT from "prop-types";
import _ from "lodash";
import TrackIcon from "./TrackIcon";
import NumRegistrants from "./NumRegistrants";
import NumSubmissions from "./NumSubmissions";
import Prize from "./Prize";
import Tags from "./Tags";
import PhaseEndDate from "./PhaseEndDate";
import * as utils from "../../../../utils";

import "./styles.scss";

const ChallengeItem = ({ challenge, onClickTag, onClickTrack }) => {
  let purse = challenge.prizeSets
    ? utils.challenge.getChallengePurse(challenge.prizeSets)
    : "";
  purse = typeof purse === "number" && utils.formatMoneyValue(purse);

  return (
    <div styleName="challenge-item">
      <div styleName="track">
        <TrackIcon
          track={challenge.track}
          type={challenge.type}
          tcoEligible={_.get(challenge, "events[0].key")}
          onClick={onClickTrack}
        />
      </div>
      <div styleName="info">
        <div styleName="name-container">
          <h6 styleName="name">
            <a
              href={`${process.env.URL.COMMUNITY_APP}/challenges/${challenge.id}`} // eslint-disable-line no-undef
            >
              {challenge.name}
            </a>
          </h6>
          <PhaseEndDate challenge={challenge} />
        </div>
        <div styleName="tags">
          <Tags tags={challenge.tags} onClickTag={onClickTag} />
        </div>
        <div styleName="nums">
          <a
            href={`${process.env.URL.COMMUNITY_APP}/challenges/${challenge.id}?tab=registrants`} // eslint-disable-line no-undef
          >
            <NumRegistrants numOfRegistrants={challenge.numOfRegistrants} />
          </a>
          <a
            href={`${process.env.URL.COMMUNITY_APP}/challenges/${challenge.id}?tab=submissions`} // eslint-disable-line no-undef
          >
            <NumSubmissions numOfSubmissions={challenge.numOfSubmissions} />
          </a>
        </div>
      </div>
      <div styleName="prize">
        <Prize purse={purse} />
      </div>
    </div>
  );
};

ChallengeItem.propTypes = {
  challenge: PT.shape(),
  onClickTag: PT.func,
  onClickTrack: PT.func,
};

export default ChallengeItem;
