/**
 * This service provides operations of Profile.
 */

const _ = require("lodash");
const Joi = require("joi");
const config = require("config");
const helper = require("../common/helper");
const errors = require("../common/errors");

/**
 * Get user profile details
 * @param {object} currentUser the user who perform this operation.
 * @returns {object} the user profile details
 */
async function getMyProfile(currentUser) {
  // we expect logged-in users
  if (currentUser.isMachine) {
    return {};
  }
  const member = await helper.getMember(
    currentUser.handle,
    `fields=photoURL,firstName,lastName,handle,email,addresses,competitionCountryCode`
  );
  const recruitProfile = await helper.getRCRMProfile(currentUser);
  return {
    profilePhoto: _.get(member, "photoURL", null),
    firstName: _.get(member, "firstName", null),
    lastName: _.get(member, "lastName", null),
    handle: _.get(member, "handle", null),
    email: _.get(member, "email", null),
    city: _.get(member, "addresses[0].city", null),
    country: _.get(member, "competitionCountryCode", null),
    hasProfile: _.get(recruitProfile, "hasProfile", false),
    phone: _.get(recruitProfile, "phone", null),
    resume: _.get(recruitProfile, "resume", null),
    availability: _.get(recruitProfile, "availability", true),
  };
}

getMyProfile.schema = Joi.object()
  .keys({
    currentUser: Joi.object().required(),
  })
  .required();

/**
 * Update user profile details
 * @param {object} currentUser the user who perform this operation.
 * @param {object} data the data to be updated
 */
async function updateMyProfile(currentUser, files, data) {
  // we expect logged-in users
  if (currentUser.isMachine) {
    return;
  }
  // check if file was truncated
  if (files.resume.truncated) {
    throw new errors.BadRequestError(
      `Maximum allowed file size is ${config.MAX_ALLOWED_FILE_SIZE_MB} MB`
    );
  }
  // validate file extension
  const regex = new RegExp(
    `^.*\.(${_.join(config.ALLOWED_FILE_TYPES, "|")})$`,
    "i"
  );
  if (!regex.test(files.resume.name)) {
    throw new errors.BadRequestError(
      `Allowed file types are: ${_.join(config.ALLOWED_FILE_TYPES, ",")}`
    );
  }
  // get member's current address data
  const member = await helper.getMember(
    currentUser.handle,
    "fields=addresses,competitionCountryCode,homeCountryCode"
  );
  const update = {};
  let shouldUpdateTrait = false;
  // update member data if city is different from existing one
  if (_.get(member, "addresses[0].city") !== data.city) {
    update.addresses = _.cloneDeep(member.addresses);
    if (!_.isEmpty(update.addresses)) {
      update.addresses[0].city = data.city;
      delete update.addresses[0].createdAt;
      delete update.addresses[0].updatedAt;
      delete update.addresses[0].createdBy;
      delete update.addresses[0].updatedBy;
      update.addresses[0].streetAddr1 = update.addresses[0].streetAddr1
        ? update.addresses[0].streetAddr1
        : " ";
      update.addresses[0].streetAddr2 = update.addresses[0].streetAddr2
        ? update.addresses[0].streetAddr2
        : " ";
      update.addresses[0].type = update.addresses[0].type
        ? update.addresses[0].type
        : "HOME";
      update.addresses[0].stateCode = update.addresses[0].stateCode
        ? update.addresses[0].stateCode
        : " ";
      update.addresses[0].zip = update.addresses[0].zip
        ? update.addresses[0].zip
        : " ";
    } else {
      update.addresses = [
        {
          city: data.city,
          type: "HOME",
          stateCode: " ",
          zip: " ",
        },
      ];
    }
  }
  // update member data if competitionCountryCode is different from existing one
  if (_.get(member, "competitionCountryCode") !== data.country) {
    update.competitionCountryCode = data.country;
    shouldUpdateTrait = true;
  }
  if (_.get(member, "homeCountryCode") !== data.country) {
    update.homeCountryCode = data.country;
    shouldUpdateTrait = true;
  }
  // avoid unnecessary api calls
  if (!_.isEmpty(update)) {
    await helper.updateMember(currentUser, update);
  }
  if (shouldUpdateTrait) {
    const memberTraits = await helper.getMemberTraits(
      currentUser.handle,
      `traitIds=basic_info`
    );
    if (memberTraits && memberTraits.length) {
      memberTraits[0]["traits"].data[0].country = data.countryName;
      delete memberTraits[0].createdAt;
      delete memberTraits[0].createdBy;
      delete memberTraits[0].updatedAt;
      delete memberTraits[0].updatedBy;
      delete memberTraits[0].userId;
      await helper.updateMemberTraits(currentUser, memberTraits);
    }
  }
  await helper.updateRCRMProfile(currentUser, files.resume, {
    phone: data.phone,
    availability: data.availability,
  });
}

updateMyProfile.schema = Joi.object()
  .keys({
    currentUser: Joi.object().required(),
    files: Joi.object()
      .keys({
        resume: Joi.object().required(),
      })
      .required(),
    data: Joi.object()
      .keys({
        city: Joi.string().required(),
        country: Joi.string().required(),
        countryName: Joi.string().required(),
        phone: Joi.string().required(),
        availability: Joi.boolean().required(),
      })
      .required(),
  })
  .required();

module.exports = {
  getMyProfile,
  updateMyProfile,
};
