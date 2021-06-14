import data from "../assets/data/my-gigs.json";

let i = 0;

async function getMyGigs() {
  return Promise.resolve({
    myGigs: data.myGigs.slice(0, (i += 10)),
    total: data.myGigs.length,
  });
}

async function loadMoreMyGigs() {
  return Promise.resolve(data.myGigs.slice(i, (i += 10)));
}

export default {
  getMyGigs,
  loadMoreMyGigs,
};
