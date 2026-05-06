// src/features/teacher/services/teacher.service.js
import { contentData } from "@/mock/mockData";

/*
  Simulate API delay
*/

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
  Fetch teacher dashboard stats
*/

export const getTeacherStats = async () => {
  await delay(1000);

  return {
    total: contentData.length,

    pending: contentData.filter((item) => item.status === "pending").length,

    approved: contentData.filter((item) => item.status === "approved").length,

    rejected: contentData.filter((item) => item.status === "rejected").length,
  };
};

/*
  Fetch teacher content
*/

export const getTeacherContent = async () => {
  await delay(1000);

  return contentData;
};

/*
  Upload content
*/

export const uploadContent = async (payload) => {
  await delay(2000);

  /*
    Random upload failure simulation
  */

  const shouldFail = Math.random() < 0.1;

  if (shouldFail) {
    throw new Error("Upload failed. Please try again.");
  }

  const newContent = {
    id: Date.now(),

    ...payload,

    status: "pending",

    rejectionReason: "",
  };

  contentData.push(newContent);

  return newContent;
};