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

async function getProfile() {
  return Promise.resolve(data.gigProfile);
}

async function updateProfile(profile) {
  return Promise.resolve(profile);
}

export default {
  getMyGigs,
  loadMoreMyGigs,
  getProfile,
  updateProfile,
};
