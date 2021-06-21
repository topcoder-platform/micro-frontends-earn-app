export const PAGINATION_PER_PAGES = [10, 20, 50];
export const PAGINATION_MAX_PAGE_DISPLAY = 3;

/* --- MENU --- */
// My Work
//    My Gigs
// Find Work
//    Challenges
export const NAV_MENU = {
  children: [
    {
      name: "My Work",
      icon: "my-work.svg",
      iconActive: "my-work-green.svg",
      auth: true,
      children: [
        {
          name: "My Gigs",
          path: "/earn/my-gigs",
        },
      ],
    },
    {
      name: "Find Work",
      icon: "find-work.svg",
      iconActive: "find-work-green.svg",
      children: [
        {
          name: "Challenges",
          path: "/earn/find/challenges",
        },
      ],
    },
  ],
};

export const FILTER_BUCKETS = [
  "All Active Challenges",
  "Open for Registration",
  "Closed Challenges",
];

export const FILTER_CHALLENGE_TYPES = ["Challenge", "First2Finish", "Task"];

export const FILTER_CHALLENGE_TYPE_ABBREVIATIONS = {
  Challenge: "CH",
  First2Finish: "F2F",
  Task: "TSK",
};

export const FILTER_CHALLENGE_TRACKS = [
  "Design",
  "Development",
  "Data Science",
  "QA",
];

export const FILTER_CHALLENGE_TRACK_ABBREVIATIONS = {
  Design: "DES",
  Development: "DEV",
  "Data Science": "DS",
  QA: "QA",
};

export const CHALLENGE_SORT_BY = {
  // "Best Match": "bestMatch",
  "Most recent": "updated",
  "Prize amount": "overview.totalPrizes",
  Title: "name",
};

export const CHALLENGE_SORT_BY_RECOMMENDED = "bestMatch";
export const CHALLENGE_SORT_BY_RECOMMENDED_LABEL = "Best Match";
export const CHALLENGE_SORT_BY_MOST_RECENT = "updated";
export const CHALLENGE_SORT_ORDER_DEFAULT = "desc";

export const SORT_ORDER = {
  DESC: "desc",
  ASC: "asc",
};

export const SORT_BY_SORT_ORDER = {
  // bestMatch: SORT_ORDER.DESC,
  updated: SORT_ORDER.DESC,
  "overview.totalPrizes": SORT_ORDER.DESC,
  name: SORT_ORDER.ASC,
};

export const TRACK_COLOR = {
  Design: "#2984BD",
  Development: "#35AC35",
  "Data Science": "#F46500",
  "Quality Assurance": "#35AC35",
};

export const CURRENCY_SYMBOL = {
  EUR: "€",
  INR: "₹",
  USD: "$",
};

export const MY_GIG_PHASE = {
  APPLIED: "Applied",
  SKILLS_TEST: "Skills Test",
  PHONE_SCREEN: "Phone Screen",
  SCREEN_PASS: "Screen Pass",
  INTERVIEW_PROCESS: "Interview Process",
  SELECTED: "Selected",
  OFFERED: "Offered",
  PLACED: "Placed",
  NOT_SELECTED: "Not Selected",
  JOB_CLOSED: "Job Closed",
};

export const MY_GIG_PHASE_LABEL = {
  APPLIED: "APPLIED",
  SKILLS_TEST: "SKILLS TEST",
  PHONE_SCREEN: "PHONE SCREEN",
  SCREEN_PASS: "SCREEN PASS",
  INTERVIEW_PROCESS: "INTERVIEW PROCESS",
  SELECTED: "SELECTED",
  OFFERED: "OFFERED",
  PLACED: "PLACED",
  NOT_SELECTED: "NOT SELECTED",
  JOB_CLOSED: "JOB CLOSED",
};

export const MY_GIG_PHASE_STATUS = {
  PASSED: "Passed",
  ACTIVE: "Active",
};

export const MY_GIG_PHASE_ACTION = {
  CHECK_EMAIL: "check email",
  STAND_BY: "stand by",
};

export const MY_GIGS_JOB_STATUS = {
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
};
/**
 * Maps the status from API to gig status
 */
export const JOB_STATUS_MAPPER = {
  [MY_GIGS_JOB_STATUS.APPLIED]: MY_GIG_PHASE.APPLIED,
  [MY_GIGS_JOB_STATUS.SKILLS_TEST]: MY_GIG_PHASE.SKILLS_TEST,
  [MY_GIGS_JOB_STATUS.PHONE_SCREEN]: MY_GIG_PHASE.PHONE_SCREEN,
  [MY_GIGS_JOB_STATUS.OPEN]: MY_GIG_PHASE.SCREEN_PASS,
  [MY_GIGS_JOB_STATUS.INTERVIEW]: MY_GIG_PHASE.INTERVIEW_PROCESS,
  [MY_GIGS_JOB_STATUS.SELECTED]: MY_GIG_PHASE.SELECTED,
  [MY_GIGS_JOB_STATUS.OFFERED]: MY_GIG_PHASE.OFFERED,
  [MY_GIGS_JOB_STATUS.PLACED]: MY_GIG_PHASE.PLACED,
  [MY_GIGS_JOB_STATUS.REJECTED_OTHER]: MY_GIG_PHASE.NOT_SELECTED,
  [MY_GIGS_JOB_STATUS.REJECTED_PRE_SCREEN]: MY_GIG_PHASE.NOT_SELECTED,
  [MY_GIGS_JOB_STATUS.CLIENT_REJECTED_INTERVIEW]: MY_GIG_PHASE.NOT_SELECTED,
  [MY_GIGS_JOB_STATUS.CLIENT_REJECTED_SCREENING]: MY_GIG_PHASE.NOT_SELECTED,
  [MY_GIGS_JOB_STATUS.JOB_CLOSED]: MY_GIG_PHASE.JOB_CLOSED,
};

/**
 * messages to be shown in each phase/status
 */
export const JOB_STATUS_MESSAGE_MAPPER = {
  [MY_GIG_PHASE.APPLIED]:
    "Thank you for Applying. We will be reviewing your profile shortly.",
  [MY_GIG_PHASE.SKILLS_TEST]: "You are requested to complete a skills test",
  [MY_GIG_PHASE.PHONE_SCREEN]:
    "You need to schedule a phone screen or a phone screen has already been scheduled",
  [MY_GIG_PHASE.SCREEN_PASS]:
    "You have passed our initial crtieria and we are pushing your profile to our client",
  [MY_GIG_PHASE.INTERVIEW_PROCESS]:
    "You are currently in the interview process.  Please check your email for updates.",
  [MY_GIG_PHASE.SELECTED]:
    "The client has selected you for this position!  Please stand by for an offer Letter.",
  [MY_GIG_PHASE.OFFERED]:
    "An offer letter was sent to your email!  Please review and Accept",
  [MY_GIG_PHASE.PLACED]:
    "Congrats on the placement!  Please follow onboarding instructions from the Client and Topcoder Teams.",
  [MY_GIG_PHASE.NOT_SELECTED]: "You were not selected for this position.",
  [MY_GIG_PHASE.JOB_CLOSED]:
    "This position is no longer active.  Please apply to other open gigs.",
};

export const ACTIONS_AVAILABLE_FOR_MY_GIG_PHASE = {
  [MY_GIG_PHASE_ACTION.CHECK_EMAIL]: [
    MY_GIG_PHASE.SKILLS_TEST,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.OFFERED,
  ],
  [MY_GIG_PHASE_ACTION.STAND_BY]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.SELECTED,
  ],
};
/**
 * jobs can have different flows (progress bar) dependending on the status.
 * here it's where it's defined the flow
 */
export const PHASES_FOR_JOB_STATUS = {
  [MY_GIGS_JOB_STATUS.APPLIED]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.SELECTED,
    MY_GIG_PHASE.OFFERED,
    MY_GIG_PHASE.PLACED,
  ],
  [MY_GIGS_JOB_STATUS.SKILLS_TEST]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.SKILLS_TEST,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.SELECTED,
    MY_GIG_PHASE.OFFERED,
    MY_GIG_PHASE.PLACED,
  ],
  [MY_GIGS_JOB_STATUS.PHONE_SCREEN]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.SELECTED,
    MY_GIG_PHASE.OFFERED,
    MY_GIG_PHASE.PLACED,
  ],
  [MY_GIGS_JOB_STATUS.OPEN]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.SELECTED,
    MY_GIG_PHASE.OFFERED,
    MY_GIG_PHASE.PLACED,
  ],
  [MY_GIGS_JOB_STATUS.INTERVIEW]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.SELECTED,
    MY_GIG_PHASE.OFFERED,
    MY_GIG_PHASE.PLACED,
  ],
  [MY_GIGS_JOB_STATUS.SELECTED]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.SELECTED,
    MY_GIG_PHASE.OFFERED,
    MY_GIG_PHASE.PLACED,
  ],
  [MY_GIGS_JOB_STATUS.OFFERED]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.SELECTED,
    MY_GIG_PHASE.OFFERED,
    MY_GIG_PHASE.PLACED,
  ],
  [MY_GIGS_JOB_STATUS.PLACED]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.SELECTED,
    MY_GIG_PHASE.OFFERED,
    MY_GIG_PHASE.PLACED,
  ],
  [MY_GIGS_JOB_STATUS.REJECTED_OTHER]: [MY_GIG_PHASE.NOT_SELECTED],
  [MY_GIGS_JOB_STATUS.REJECTED_PRE_SCREEN]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.NOT_SELECTED,
  ],
  [MY_GIGS_JOB_STATUS.CLIENT_REJECTED_INTERVIEW]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.INTERVIEW_PROCESS,
    MY_GIG_PHASE.NOT_SELECTED,
  ],
  [MY_GIGS_JOB_STATUS.CLIENT_REJECTED_SCREENING]: [
    MY_GIG_PHASE.APPLIED,
    MY_GIG_PHASE.PHONE_SCREEN,
    MY_GIG_PHASE.SCREEN_PASS,
    MY_GIG_PHASE.NOT_SELECTED,
  ],
  [MY_GIGS_JOB_STATUS.JOB_CLOSED]: [MY_GIG_PHASE.JOB_CLOSED],
};

/**
 * definition of how the sort is made on status. the order in the array defined the
 * priority.
 */
export const SORT_STATUS_ORDER = [
  MY_GIG_PHASE.PLACED,
  MY_GIG_PHASE.OFFERED,
  MY_GIG_PHASE.SELECTED,
  MY_GIG_PHASE.INTERVIEW_PROCESS,
  MY_GIG_PHASE.SCREEN_PASS,
  MY_GIG_PHASE.PHONE_SCREEN,
  MY_GIG_PHASE.SKILLS_TEST,
  MY_GIG_PHASE.APPLIED,
  MY_GIG_PHASE.JOB_CLOSED,
  MY_GIG_PHASE.NOT_SELECTED,
];

export const PER_PAGE = 10;

/**
 * defines which status can show remarks
 */
export const AVAILABLE_REMARK_BY_JOB_STATUS = [
  MY_GIGS_JOB_STATUS.SKILLS_TEST,
  MY_GIGS_JOB_STATUS.PHONE_SCREEN,
  MY_GIGS_JOB_STATUS.SCREEN_PASS,
  MY_GIGS_JOB_STATUS.OFFERED,
  MY_GIGS_JOB_STATUS.PLACED,
  MY_GIGS_JOB_STATUS.REJECTED_OTHER,
  MY_GIGS_JOB_STATUS.REJECTED_PRE_SCREEN,
  MY_GIGS_JOB_STATUS.JOB_CLOSED,
];
export const MY_GIG_STATUS_PLACED = "PLACED";

export const GIG_STATUS = {
  AVAILABLE: "Available",
  UNAVAILABLE: "Unavailable",
  PLACED: "Placed",
};
