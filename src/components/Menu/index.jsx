import React, { useState, useRef } from "react";
import PT from "prop-types";
import _ from "lodash";
import * as utils from "../../utils";
import IconChevronUp from "assets/icons/menu-chevron-up.svg";

import "./styles.scss";

const Menu = ({ menu, icons, selected, onSelect }) => {
  const selectionRef = useRef(
    new utils.menu.MenuSelection(menu, selected, onSelect)
  );
  const [stateChange, setStateChange] = useState(0);

  const onSelectMenuItem = (name) => {
    selectionRef.current.select(name);
    setStateChange(stateChange + 1);
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
            <a onClick={() => onSelectMenuItem(key)}>{key}</a>
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
            <a onClick={() => onSelectMenuItem(key)}>{key}</a>
            {renderSubSubmenu(subMenu, key)}
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
            <a onClick={() => onSelectMenuItem(key)}>
              <span styleName="icon">{getIcon(key, isActive(key))}</span>
              <span styleName="text">{key}</span>
              <span styleName={`arrow ${isExpanded(key) ? "up" : "down"}`}>
                <IconChevronUp />
              </span>
            </a>
            {renderSubmenu(key)}
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
