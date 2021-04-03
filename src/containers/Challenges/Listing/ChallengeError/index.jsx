import React from "react";
import IconNotFound from "assets/icons/not-found.png";
import IconNotFoundRecommended from "assets/icons/not-found-recommended.png";
import * as constants from '../../../../constants';
import "./styles.scss";

const ChallengeError = ({ bucket, recommended }) => {
  const BUCKET_OPEN_FOR_REGISTRATION = constants.FILTER_BUCKETS[1];
  const isRecommened = bucket === BUCKET_OPEN_FOR_REGISTRATION && recommended;
  const icon = isRecommened ? IconNotFound : IconNotFoundRecommended;
  return (
    <div styleName="challenge-error">
      <h1>
        <img src={icon} alt="not found" />
      </h1>
      <p>
        {!isRecommened &&
          'No challenges were found. You can try changing your search parameters.'
        }
        {isRecommened &&
          'Looks like there are no Recommended Challenges that best match your skills at this point. But you can try to join other challenges that work for you.'
        }
      </p>
    </div>
  );
}

export default ChallengeError;
