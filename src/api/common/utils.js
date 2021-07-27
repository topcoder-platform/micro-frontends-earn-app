/**
 * Util methods
 */
/**
 * calculate weeks diff
 * @param {*} startDate the start Date,
 * @param {*} endDate the end Date
 * @returns
 */
function weekDiff(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const s = new Date(startDate);
  const e = new Date(endDate);
  const d = (e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24) + 1;
  return Math.ceil(d / 7);
}

module.exports = {
  weekDiff,
};
