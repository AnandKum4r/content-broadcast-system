// src/features/live/services/live.service.js

import { contentData } from "@/mock/mockData";

/*
  Simulate API delay
*/

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
  Fetch active teacher content
*/

export const getLiveContent = async (teacherId) => {
  await delay(1000);

  /*
    Current time
  */

  const now = new Date();

  /*
    Find active approved content
  */

  const activeContent = contentData.filter((item) => {
    const start = new Date(item.startTime);

    const end = new Date(item.endTime);

    return (
      item.teacherId === Number(teacherId) &&
      item.status === "approved" &&
      now >= start &&
      now <= end
    );
  });

  return activeContent;
};
