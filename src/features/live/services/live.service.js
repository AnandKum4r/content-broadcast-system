// src/features/live/services/live.service.js

import { contentData, users } from "@/mock/mockData";

/*
  Simulate API delay
*/
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
  Fetch teacher + live content
*/
export const getLiveContent = async (teacherId) => {
  await delay(800);

  const now = new Date();

  const teacher = users.find((u) => u.id === Number(teacherId));

  /*
    Filter active approved content
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

  return {
    teacher,
    content: activeContent,
  };
};
