import { createActions } from "redux-actions";
import service from "../services/lookup";

async function getMemberGroups() {}

export default createActions({
  GET_MEMBER_GROUPS: getMemberGroups,
});
