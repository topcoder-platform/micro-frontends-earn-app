import { keys } from "lodash";
import data from "../assets/data/my-gigs.json";
import { GIG_STATUS } from "../constants";
import api from "./api";

let i = 0;
const PROFILE_URL = "/earn-app/api/my-gigs/profile";

async function getMyGigs() {
  return Promise.resolve({
    myGigs: data.myGigs.slice(0, (i += 10)),
    total: data.myGigs.length,
  });
}

async function loadMoreMyGigs() {
  return Promise.resolve(data.myGigs.slice(i, (i += 10)));
}

/**
 * Get the profile info
 * @returns {Object}
 */
async function getProfile() {
  const profile = await api.get(
    PROFILE_URL,
    process.env.URL.PLATFORM_WEBSITE_URL
  );

  return {
    handle: profile.handle,
    photoURL: profile.profilePhoto,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    city: profile.city,
    country: profile.country,
    phone: profile.phone,
    file: {
      name: profile.resume,
    },
    status: profile.availability
      ? GIG_STATUS.AVAILABLE
      : GIG_STATUS.UNAVAILABLE,
  };
}

/**
 * Updates the profile
 * @param {Object} profile - profile info to be updated
 * @returns
 */
async function updateProfile(profile) {
  const payload = {
    city: profile.city,
    country: profile.countryCode,
    phone: profile.phone,
    availability: profile.status === GIG_STATUS.AVAILABLE ? true : false,
    resume: profile.file,
  };

  // add info to formData to send to server
  const formData = new FormData();
  keys(payload).forEach((key) => formData.append(key, payload[key]));

  const response = await api.post(
    PROFILE_URL,
    formData,
    process.env.URL.PLATFORM_WEBSITE_URL
  );

  // in case of error, throw the server error
  if (response.status !== 200 && response.status !== 204) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response;
}

export default {
  getMyGigs,
  loadMoreMyGigs,
  getProfile,
  updateProfile,
};
