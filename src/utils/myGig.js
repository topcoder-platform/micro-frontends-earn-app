import * as constants from "../constants";

export function isPassedPhase(allPhases, currentPhase, checkPhase) {
  const currentPhaseIndex = allPhases.indexOf(currentPhase);
  const checkPhaseIndex = allPhases.indexOf(checkPhase);

  return checkPhaseIndex < currentPhaseIndex;
}

export function isFirstPhase(checkPhase) {
  return checkPhase === constants.MY_GIG_PHASE.APPLIED;
}

export function isLastPhase(checkPhase) {
  return checkPhase === constants.MY_GIG_PHASE.PLACED;
}
