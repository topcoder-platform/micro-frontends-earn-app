import React from "react";
import ReactLoading from "react-loading";
import PT from "prop-types";
import "./styles.scss";

const Loading = (props) => {
  const { color, type, height, width } = props;
  return (
    <div styleName="loading-wrapper">
      <div styleName="loading-inner">
        <div>
          <ReactLoading
            type={type}
            color={color}
            height={height}
            width={width}
          />
        </div>
        <h6>LOADING</h6>
        <span>We are processing your gigs data</span>
      </div>
    </div>
  );
};

Loading.defaultProps = {
  color: "#0ab88a",
  type: "spin",
  width: 35,
  height: 35,
};

Loading.propTypes = {
  color: PT.string,
  type: PT.string,
  width: PT.number,
  height: PT.number,
};

export default Loading;
