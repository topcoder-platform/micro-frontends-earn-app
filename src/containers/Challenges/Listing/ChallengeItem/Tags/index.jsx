import React, { useState } from "react";
import PT from "prop-types";
import Tag from "../../../../../components/Tag";
import * as util from "../../../../../utils/tag";

import "./styles.scss";

const Tags = ({ tags, onClickTag, tooltip }) => {
  const n = util.calculateNumberOfVisibleTags(tags);
  const more = n < tags.length ? tags.length - n : 0;
  const [collapsed, setCollapsed] = useState(more > 0);
  const visibleTags = collapsed ? tags.slice(0, n) : tags;
  const invisibleTags = collapsed ? tags.slice(n) : [];

  const Tooltip = tooltip;

  return (
    <div styleName="tags">
      {visibleTags.map((tag) => (
        <Tag tag={tag} key={tag} onClick={onClickTag} />
      ))}
      {more > 0 && collapsed && (
        <Tooltip more={invisibleTags}>
          <Tag tag={`${more}+`} onClick={() => setCollapsed(false)} />
        </Tooltip>
      )}
    </div>
  );
};

Tags.defaultProps = {
  tags: [],
  tooltip: ({ children }) => <>{children}</>,
};

Tags.propTypes = {
  tags: PT.arrayOf(PT.string),
  onClickTag: PT.func,
};

export default Tags;
