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
  PHONE_SCREEN: "Phone Screen",
  SCREEN_PASS: "Screen Pass",
  INTERVIEW_PROCESS: "Interview Process",
  SELECTED: "Selected",
  OFFERED: "Offered",
  PLACED: "Placed",
};

export const MY_GIG_PHASE_LABEL = {
  APPLIED: "APPLIED",
  PHONE_SCREEN: "PHONE SCREEN",
  SCREEN_PASS: "SCREEN PASS",
  INTERVIEW_PROCESS: "INTERVIEW PROCESS",
  SELECTED: "SELECTED",
  OFFERED: "OFFERED",
  PLACED: "PLACED",
  NOT_SELECTED: "NOT SELECTED",
};

export const MY_GIG_PHASE_STATUS = {
  PASSED: "Passed",
  ACTIVE: "Active",
};

export const MY_GIG_PHASE_ACTION = {
  CHECK_EMAIL: "check email",
  STAND_BY: "stand by",
  ROUND: "round",
  FOLLOW_UP_BY_EMAIL: "follow-up by email",
};

export const MY_GIG_STATUS_PLACED = "PLACED";

export const GIG_STATUS = {
  AVAILABLE: "Available",
  UNAVAILABLE: "Unavailable",
  PLACED: "Placed",
};

export const GIG_STATUS_TOOLTIP = {
  AVAILABLE: "You’re open to take on new jobs.",
  UNAVAILABLE: "You’re not open to take on new jobs.",
  PLACED: "You’re on a topcoder gig already.",
};
