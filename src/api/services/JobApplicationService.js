/**
 * This service provides operations of JobApplications.
 */

const _ = require("lodash");
const Joi = require("joi");
const helper = require("../common/helper");
const errors = require("../common/errors");

/**
 * Get Job Applications of current user
 * @param {Object} currentUser the user who perform this operation.
 * @param {Object} criteria the search criteria
 * @returns {Array<Object>} the JobApplications
 */
async function getMyJobApplications(currentUser, criteria) {
  const page = criteria.page;
  const perPage = criteria.perPage;
  const sortBy = criteria.sortBy;
  const sortOrder = criteria.sortOrder;
  const emptyResult = {
    total: 0,
    page,
    perPage,
    result: [],
  };
  // we expect logged-in users
  if (currentUser.isMachine) {
    return emptyResult;
  }
  // get user id by calling taas-api with current user's token
  const { id: userId } = await helper.getCurrentUserDetails(
    currentUser.jwtToken
  );
  if (!userId) {
    throw new errors.NotFoundError(
      `Id for user: ${currentUser.userId} not found`
    );
  }
  // get jobCandidates of current user by calling taas-api
  const jobCandidates = await helper.getJobCandidates({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
  });
  // if no candidates found then return empty result
  if (jobCandidates.result.length === 0) {
    return emptyResult;
  }
  const jobIds = _.map(jobCandidates.result, "jobId");
  // get jobs of current user by calling taas-api
  const { result: jobs } = await helper.getJobs({ jobIds, page: 1, perPage });
  // apply desired structure
  const jobApplications = _.map(jobCandidates.result, (jobCandidate) => {
    const job = _.find(jobs, ["id", jobCandidate.jobId]);
    return {
      title: job.title,
      payment: {
        min: job.minSalary,
        max: job.maxSalary,
        frequency: job.rateType,
        currency: job.currency,
      },
      hoursPerWeek: job.hoursPerWeek,
      location: job.jobLocation,
      workingHours: job.jobTimezone,
      status: jobCandidate.status,
      interview: !_.isEmpty(jobCandidate.interviews)
        ? _.maxBy(jobCandidate.interviews, "round")
        : null,
      remark: jobCandidate.remark,
      duration: job.duration,
    };
  });
  return {
    total: jobCandidates.total,
    page: jobCandidates.page,
    perPage: jobCandidates.perPage,
    result: jobApplications,
  };
}

getMyJobApplications.schema = Joi.object()
  .keys({
    currentUser: Joi.object().required(),
    criteria: Joi.object()
      .keys({
        page: Joi.page(),
        perPage: Joi.perPage(),
        sortBy: Joi.string().valid("id", "status").default("id"),
        sortOrder: Joi.string().valid("desc", "asc").default("desc"),
      })
      .required(),
  })
  .required();

async function getJob(currentUser, criteria) {
  const emptyResult = {
    synced: false,
  };
  // we expect logged-in users
  if (currentUser.isMachine) {
    return emptyResult;
  }
  // get user id by calling taas-api with current user's token
  const { id: userId } = await helper.getCurrentUserDetails(
    currentUser.jwtToken
  );
  if (!userId) {
    throw new errors.NotFoundError(
      `Id for user: ${currentUser.userId} not found`
    );
  }
  // get job based on the jobExternalId
  const { result: jobs } = await helper.getJobs(criteria);
  if (jobs && jobs.length) {
    const candidates = jobs[0].candidates || [];
    const newJob = candidates.find((item) => item.userId == userId);
    if (newJob) {
      return {
        synced: true,
      };
    }
  }
  return {
    synced: false,
  };
}

getJob.schema = Joi.object()
  .keys({
    currentUser: Joi.object().required(),
    criteria: Joi.object()
      .keys({
        externalId: Joi.string(),
      })
      .required(),
  })
  .required();

module.exports = {
  getMyJobApplications,
  getJob,
};
