import React, { useState, useRef, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import * as utils from "../../utils";
import IconChevronUp from "assets/icons/menu-chevron-up.svg";
import { useNavigate } from "@reach/router";

import "./styles.scss";

let cnt = 0;

const Menu = ({ menu, icons, selected, onSelect }) => {
  const selectionRef = useRef(
    new utils.menu.MenuSelection(menu, selected, onSelect)
  );
  const [__, setStateChange] = useState(0);

  useEffect(() => {
    selectionRef.current.selectedMenuItem = selected;
    setStateChange(cnt++);
  }, [selected]);

  const navigateTo = useNavigate();
  const onSelectMenuItem = (name, path) => {
    selectionRef.current.select(name);
    setStateChange(cnt++);
    if (path) {
      navigateTo(path);
    }
  };

  const getIcon = (menuItem, active) => {
    const name = icons[menuItem][active ? 1 : 0];
    return utils.icon.getMenuIcon(name);
  };

  const isExpandable = (name) => !selectionRef.current.isLeaf(name);
  const isSelected = (name) => selectionRef.current.isSelected(name);
  const isExpanded = (name) => selectionRef.current.isExpanded(name);
  const isActive = (name) => selectionRef.current.isActive(name);

  const renderSubSubmenu = (submenu, key) => {
    if (!submenu[key]) {
      return null;
    }
    const subSubmenu = submenu[key];
    return (
      <ul styleName="sub-submenu">
        {Object.keys(subSubmenu).map((key) => (
          <li
            styleName={`menu-item ${isSelected(key) ? "selected" : ""} ${
              isActive(key) ? "active" : ""
            }`}
            key={key}
          >
            <span
              styleName="link"
              role="button"
              tabIndex="0"
              onClick={() => {
                onSelectMenuItem(key, subSubmenu[key]);
              }}
            >
              {key}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  const renderSubmenu = (key) => {
    if (!menu[key]) {
      return null;
    }
    const subMenu = menu[key];
    return (
      <ul styleName="sub-menu">
        {Object.keys(subMenu).map((key) => (
          <li
            styleName={`menu-item menu-item-secondary ${
              isExpandable(key)
                ? isExpanded(key)
                  ? "expanded"
                  : "collapsed"
                : isSelected(key)
                ? "selected"
                : ""
            } ${isActive(key) ? "active" : ""}`}
            key={key}
          >
            <span
              styleName="link"
              role="button"
              tabIndex="0"
              onClick={(event) => {
                onSelectMenuItem(key, isExpandable(key) ? null : subMenu[key]);
              }}
            >
              {key}
            </span>
            {isExpandable(key) && renderSubSubmenu(subMenu, key)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav>
      <ul styleName="menu">
        {Object.keys(menu).map((key) => (
          <li
            styleName={`menu-item menu-item-main ${
              isExpandable(key)
                ? isExpanded(key)
                  ? "expanded"
                  : ""
                : isSelected(key)
                ? "selected"
                : ""
            } ${isActive(key) ? "active" : ""}`}
            key={key}
          >
            <span
              styleName="link"
              role="button"
              tabIndex="0"
              onClick={(event) => {
                onSelectMenuItem(key, isExpandable(key) ? null : menu[key]);
              }}
            >
              <span styleName="icon">{getIcon(key, isActive(key))}</span>
              <span styleName="text">{key}</span>
              <span styleName={`arrow ${isExpanded(key) ? "up" : "down"}`}>
                <IconChevronUp />
              </span>
            </span>
            {isExpandable(key) && renderSubmenu(key)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

Menu.propTypes = {
  menu: PT.shape(),
  icons: PT.shape(),
  selected: PT.string,
  onSelect: PT.func,
};

export default Menu;
