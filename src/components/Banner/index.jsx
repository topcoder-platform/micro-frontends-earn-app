import React, { useState } from "react";
import PT from "prop-types";
import BannerChevronUp from "../../assets/icons/banner-chevron-up.svg";

import "./styles.scss";

const Banner = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const header =
    "Welcome to our BETA work listings site - Tell us what you think!";

  return (
    <div styleName="banner">
      <p styleName="header">
        {header}

        <span
          styleName={`chevron ${isExpanded ? "up" : "down"}`}
          role="button"
          tabIndex="0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <BannerChevronUp />
        </span>
      </p>

      {isExpanded && (
        <div styleName="content">
          <h3>
            Welcome to the Beta version of the new Challenge Listings. During
            this Beta phase, we will be fine-tuning the platform based on
            feedback we receive from you, our community members.
          </h3>
          <br />
          <h3>NOTE THAT THIS IS NOT THE FINAL VERSION OF THE SITE.</h3>
          <br />
          <h3>
            You may encounter occasional broken links or error messages. If so,
            please let us know! This is what the Beta phase is intended for, and
            your feedback will enable us to greatly improve the new site.{" "}
          </h3>
          <br />
          <h3>
            You can click on the Feedback button on page or file a github ticket
            at{" "}
            <a href="http://https://github.com/topcoder-platform/micro-frontends-earn-app/issues/new">
              https://github.com/topcoder-platform/micro-frontends-earn-app/issues/new
            </a>
            .
          </h3>
          <br />
          <h3>Thank you!</h3>
        </div>
      )}
    </div>
  );
};

Banner.propTypes = {};

export default Banner;
