// src/utils/getScheduleStatus.js

/*
  Determine schedule status
*/

export const getScheduleStatus = (
  startTime,
  endTime
) => {
  const now = new Date();

  const start = new Date(startTime);

  const end = new Date(endTime);

  /*
    Content not started yet
  */

  if (now < start) {
    return "scheduled";
  }

  /*
    Content currently active
  */

  if (
    now >= start &&
    now <= end
  ) {
    return "active";
  }

  /*
    Content expired
  */

  return "expired";
};