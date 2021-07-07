import React from "react";
import PT from "prop-types";
import Dropzone from "react-dropzone";
import _ from "lodash";
import Button from "../Button";

import "./styles.scss";

const FilePicker = ({
  file,
  required,
  label,
  uploadTime,
  onFilePick,
  errorMsg,
  accept,
  maxSize,
}) => {
  const fileName = file ? file.name : "";

  let stage;
  if (file && uploadTime) {
    stage = "uploaded";
  } else if (file) {
    stage = "selected";
  } else {
    stage = "select";
  }

  const stageSelect = (
    <span styleName="select-a-file">{`${label} ${required ? "*" : ""}`}</span>
  );

  const stageSelected = (
    <div styleName="selected">
      <h6 styleName="title">{fileName}</h6>
    </div>
  );

  const stageUploaded = (
    <div styleName="uploaded">
      <h6 styleName="title">{fileName}</h6>
      <p styleName="text">Uploaded on {uploadTime}</p>
    </div>
  );

  const onClick = (event) => {
    if (stage !== "select") {
      event.stopPropagation();
    }

    switch (stage) {
      case "select":
        break;
      case "selected":
      case "uploaded": {
        onFilePick(null);
        break;
      }
    }
  };

  return (
    <div styleName="file-picker">
      <Dropzone
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length > 0) {
            onFilePick(acceptedFiles[0]);
          }
        }}
        maxSize={maxSize}
        accept={accept}
        onDropRejected={(event) => {
          onFilePick(
            _.get(event, "[0].file"),
            _.get(event, "[0].errors[0].message")
          );
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section
            styleName={`container ${errorMsg ? "hasError" : ""}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            {stage === "select" && stageSelect}
            {stage === "selected" && stageSelected}
            {stage === "uploaded" && stageUploaded}

            <Button size="lg" onClick={onClick}>
              {stage === "select" ? "SELECT A FILE" : "REMOVE"}
            </Button>
          </section>
        )}
      </Dropzone>
      {errorMsg ? (
        <span styleName="errorMessage" className="errorMsg">
          {errorMsg}
        </span>
      ) : null}
    </div>
  );
};

FilePicker.defaultProps = {
  maxSize: 8 * 1024 * 1024,
};

FilePicker.propTypes = {
  file: PT.any,
  required: PT.bool,
  label: PT.string,
  uploadTime: PT.string,
  onFilePick: PT.func,
  errorMsg: PT.string,
  accept: PT.string,
  maxSize: PT.number,
};

export default FilePicker;
