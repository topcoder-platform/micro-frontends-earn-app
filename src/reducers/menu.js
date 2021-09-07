import { handleActions } from "redux-actions";

const defaultState = {
  show: false
}

function onShowMenu(state, { payload }) {
  return {
    ...state,
    show: payload
  }
}

export default handleActions({
  SHOW_MENU: onShowMenu
}, defaultState)
