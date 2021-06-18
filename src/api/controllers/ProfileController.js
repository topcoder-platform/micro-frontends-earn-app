/**
 * Controller for Profile endpoints
 */
const service = require("../services/ProfileService");
const helper = require("../common/helper");

/**
 * Get current user's profile
 * @param req the request
 * @param res the response
 */
async function getMyProfile(req, res) {
  res.send(await service.getMyProfile(req.authUser));
}

/**
 * Update current user's profile
 * @param req the request
 * @param res the response
 */
async function updateMyProfile(req, res) {
  await service.updateMyProfile(req.authUser, req.files, req.body);
  res.status(204).end();
}

module.exports = {
  getMyProfile,
  updateMyProfile,
};
