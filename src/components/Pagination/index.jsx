import React, { useEffect, useRef, useState } from "react";
import PT from "prop-types";
import Dropdown from "../Dropdown";
import {
  PAGINATION_PER_PAGES,
  PAGINATION_MAX_PAGE_DISPLAY,
} from "../../constants";
import * as utils from "../../utils";
import IconArrow from "../../assets/icons/arrow.svg";

import "./styles.scss";

const N = PAGINATION_MAX_PAGE_DISPLAY;

/**
 * Pagination with the first page index being as 0 and the last page index being as `total - 1`
 */
const Pagination = ({ length, pageIndex, pageSize, onChange }) => {
  const total = Math.ceil(length / pageSize);
  const perPageOptions = utils.createDropdownOptions(PAGINATION_PER_PAGES);
  utils.setSelectedDropdownOption(perPageOptions, `${pageSize}`);

  const createDisplayPages = (p, n) => {
    const pages = [];
    for (
      let start = utils.clamp(p - N, 0, n),
        end = utils.clamp(p + N, 0, n),
        i = start;
      i < end;
      i += 1
    ) {
      pages.push(i);
    }
    return pages.slice(-N);
  };

  const [displayPages, setDisplayPages] = useState(
    createDisplayPages(pageIndex, total)
  );

  const onChangePageSize = (options) => {
    const selectedOption = utils.getSelectedDropdownOption(options);
    const newPageSize = +selectedOption.label;
    onChange({ pageIndex: 0, pageSize: newPageSize });
  };

  const onChangePageIndex = (newPageIndex) => {
    onChange({ pageIndex: newPageIndex, pageSize: pageSize });
  };

  const next = () => {
    if (pageIndex < total) {
      onChange({ pageIndex: pageIndex + 1, pageSize: pageSize });
    }
  };
  const previous = () => {
    if (pageIndex > 0) {
      onChange({ pageIndex: pageIndex - 1, pageSize: pageSize });
    }
  };

  const latestPropsRef = useRef(null);
  latestPropsRef.current = { displayPages, pageIndex };

  useEffect(() => {
    const newTotal = Math.ceil(length / pageSize);
    const _pageIndex = latestPropsRef.current.pageIndex;
    setDisplayPages(createDisplayPages(_pageIndex, newTotal));
  }, [length, pageSize]);

  useEffect(() => {
    const _displayPages = latestPropsRef.current.displayPages;
    const start = _displayPages[0];
    const end = _displayPages[_displayPages.length - 1];

    const updateDisplayPages = [];
    if (pageIndex < start) {
      for (let i = pageIndex; i < pageIndex + N; i += 1) {
        updateDisplayPages.push(i);
      }
      setDisplayPages(updateDisplayPages);
    } else if (pageIndex > end) {
      for (let i = pageIndex; i > pageIndex - N; i -= 1) {
        updateDisplayPages.unshift(i);
      }
      setDisplayPages(updateDisplayPages);
    }
  }, [pageIndex]);

  const formatPage = (p) => `${p + 1}`;

  return (
    <div styleName="pagination">
      <div styleName="per-page">
        <Dropdown
          options={perPageOptions}
          onChange={onChangePageSize}
          size="xs"
        />
      </div>
      <ul styleName="pages">
        <li styleName={`page previous ${pageIndex === 0 ? "hidden" : ""}`}>
          <button onClick={previous}>
            <span styleName="arrow">
              <IconArrow />
            </span>{" "}
            PREVIOUS
          </button>
        </li>
        {displayPages.map((p) => (
          <li styleName={`page ${p === pageIndex ? "active" : ""}`} key={p}>
            <button
              onClick={() => {
                onChangePageIndex(p);
              }}
            >
              {formatPage(p)}
            </button>
          </li>
        ))}
        <li
          styleName={`page next ${
            pageIndex === total - 1 || length === 0 ? "hidden" : ""
          }`}
        >
          <button onClick={next}>
            NEXT{" "}
            <span styleName="arrow">
              <IconArrow />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  length: PT.number,
  pageIndex: PT.number,
  pageSize: PT.number,
  onChange: PT.func,
};

export default Pagination;
