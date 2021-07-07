import React from "react";
import { EMPTY_GIGS_TEXT } from "../../constants";
import Button from "../Button";
import "./styles.scss";

const Empty = () => {
  return (
    <div styleName="empty-wrapper">
      <div styleName="empty-inner">
        <h6>{EMPTY_GIGS_TEXT}</h6>
        <span>Interested in getting a gig?</span>
        <Button
          isPrimary
          size="lg"
          onClick={() => {
            window.location.href = `${process.env.URL.BASE}/gigs`;
          }}
        >
          VIEW GIGS
        </Button>
      </div>
    </div>
  );
};

export default Empty;
