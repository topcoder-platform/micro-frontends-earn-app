/**
 * App constants
 */

const Scopes = {
  // JobApplication
  READ_JOBAPPLICATION: "read:earn-jobApplications",
  READ_JOB: "read:earn-job",
  READ_PROFILE: "read:earn-profile",
  WRITE_PROFILE: "write:earn-profile",
  ALL_PROFILE: "all:earn-profile",
};

const MY_GIGS_JOB_STATUS = {
  APPLIED: "applied",
  SKILLS_TEST: "skills-test",
  PHONE_SCREEN: "phone-screen",
  SCREEN_PASS: "open",
  INTERVIEW: "interview",
  SELECTED: "selected",
  OFFERED: "offered",
  PLACED: "placed",
  REJECTED_OTHER: "rejected - other",
  REJECTED_PRE_SCREEN: "rejected-pre-screen",
  CLIENT_REJECTED_INTERVIEW: "client rejected - interview",
  CLIENT_REJECTED_SCREENING: "client rejected - screening",
  JOB_CLOSED: "job-closed",
  WITHDRAWN: "withdrawn",
  WITHDRAWN_PRESCREEN: "withdrawn-prescreen",
};

const JOB_APPLICATION_STATUS_MAPPER = {
  open_jobs: {
    statuses: [
      MY_GIGS_JOB_STATUS.APPLIED,
      MY_GIGS_JOB_STATUS.SKILLS_TEST,
      MY_GIGS_JOB_STATUS.PHONE_SCREEN,
      MY_GIGS_JOB_STATUS.SCREEN_PASS,
      MY_GIGS_JOB_STATUS.INTERVIEW,
      MY_GIGS_JOB_STATUS.SELECTED,
      MY_GIGS_JOB_STATUS.OFFERED,
      MY_GIGS_JOB_STATUS.PLACED,
    ],
  },
  completed_jobs: {
    statuses: [MY_GIGS_JOB_STATUS.PLACED],
  },
  archived_jobs: {
    statuses: [
      MY_GIGS_JOB_STATUS.JOB_CLOSED,
      MY_GIGS_JOB_STATUS.REJECTED_OTHER,
      MY_GIGS_JOB_STATUS.REJECTED_PRE_SCREEN,
      MY_GIGS_JOB_STATUS.CLIENT_REJECTED_INTERVIEW,
      MY_GIGS_JOB_STATUS.CLIENT_REJECTED_SCREENING,
      MY_GIGS_JOB_STATUS.WITHDRAWN,
      MY_GIGS_JOB_STATUS.WITHDRAWN_PRESCREEN,
    ],
  },
};

const MIN_HOUR_PER_WEEK_TO_WITHDRAW = 20;

module.exports = {
  Scopes,
  MY_GIGS_JOB_STATUS,
  JOB_APPLICATION_STATUS_MAPPER,
  MIN_HOUR_PER_WEEK_TO_WITHDRAW,
};
