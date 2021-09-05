import { createActions } from "redux-actions";

function showMenu(visible) {
  return visible
}

export default createActions({
  SHOW_MENU: showMenu
})
