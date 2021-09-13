import React, { useEffect, useState } from "react";
import Menu from '../../components/Menu';
import * as utils from '../../utils';
import * as constants from '../../constants';
import { useLocation } from "@reach/router";

const MenuContainer = () => {
  const [selectedMenuItemName, setSelectedMenuItemName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [menu, saveMenu] = useState(constants.NAV_MENU);
  const location = useLocation();

  // isLoggedIn
  useEffect(() => {
    const checkIsLoggedIn = async () => {
      setIsLoggedIn(await utils.auth.isLoggedIn());
    }
    checkIsLoggedIn();
  }, []);

  // selected
  useEffect(() => {
    const name = utils.menu.getNameByPath(
      constants.NAV_MENU,
      location.pathname
    );
    if (name) {
      setSelectedMenuItemName(name);
    } else {
      setSelectedMenuItemName(null);
    }
  }, [location]);

  return (
    <Menu
      menu={menu}
      selected={selectedMenuItemName}
      onSelect={(name) => {
        setSelectedMenuItemName(name);
        if (name == "Gigs") {
          window.location.href = `${process.env.URL.BASE}/gigs`;
        }
      }}
      isLoggedIn={isLoggedIn}
      onUpdateMenu={(menu) => {
        const change = { ...menu };
        saveMenu(change);
      }}
    />
  )
}

export default MenuContainer;
