export const PAGINATION_PER_PAGE = [10, 20, 50];
export const PAGINATION_MAX_PAGE_DISPLAY = 3;

export const NAV_MENU = {
  "My Work": {
    "My Gig": {
      "Gigs ": "",
      Feedback: "",
      Payment: "",
    },
    "My Challenges": "",
    "My Tasks": "",
  },
  "Find Work": {
    Gigs: "",
    Challenges: "/earn/find/challenges",
  },
};

export const NAV_MENU_ICONS = {
  "My Work": ["my-work.svg", "my-work-green.svg"],
  "Find Work": ["find-work.svg", "find-work-green.svg"],
};

export const FILTER_BUCKETS = [
  "All Active Challenges",
  "Open for Registration",
  "Past Challenges",
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
  "Quality Assurance",
];

export const FILTER_CHALLENGE_TRACK_ABBREVIATIONS = {
  Design: "DES",
  Development: "DEV",
  "Data Science": "DS",
  "Quality Assurance": "QA",
};

export const CHALLENGE_SORT_BY = {
  "Best Match": "bestMatch",
  "Most recent": "updated",
  "Prize amount": "overview.totalPrizes",
  Title: "name",
};

export const TRACK_COLOR = {
  Design: "#2984BD",
  Development: "#35AC35",
  "Data Science": "#F46500",
  "Quality Assurance": "#35AC35",
};
