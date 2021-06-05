import { combineReducers } from "redux";
import challenges from "./challenges";
import filter from "./filter";
import lookup from "./lookup";
import myGigs from "./myGigs";

export default combineReducers({
  challenges,
  filter,
  lookup,
  myGigs,
});
