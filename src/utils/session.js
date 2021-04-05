function selectFilter(state) {
  return state.filter;
}

let currentFilterValue;
function persistFilter(filter) {
  let previousFilterValue = currentFilterValue;
  currentFilterValue = filter;

  if (previousFilterValue !== currentFilterValue) {
    try {
      sessionStorage.setItem("filter", JSON.stringify(filter));
    } catch (e) {
      console.error(e);
    }
  }
}

function restoreFilter() {
  let filter;
  try {
    filter = JSON.parse(sessionStorage.getItem("filter"));
  } catch (e) {
    filter = {};
  }
  return filter;
}

export { selectFilter, persistFilter, restoreFilter };
