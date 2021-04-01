import { combineReducers } from "redux";
import challenges from "./challenges";
import filter from "./filter";
import lookup from "./lookup";

export default combineReducers({
  challenges,
  filter,
  lookup,
});
