/**
 * Controller for JobApplication endpoints
 */
const service = require("../services/JobApplicationService");
const helper = require("../common/helper");

/**
 * Get current user's job applications
 * @param req the request
 * @param res the response
 */
async function getMyJobApplications(req, res) {
  const result = await service.getMyJobApplications(req.authUser, req.query);
  helper.setResHeaders(req, res, result);
  res.send(result.result);
}

module.exports = {
  getMyJobApplications,
};
