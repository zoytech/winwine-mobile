const timeToMs = {
  DAY: 86400000,
  HR: 3600000,
  MI: 60000,
};
const timePartToMs = {
  MORNING: 3600000 * 6,
  AFTERNOON: 3600000 * 12,
};
const timeFetch = {
  SPLASH: 5000,
};

export {timeToMs, timeFetch, timePartToMs};
