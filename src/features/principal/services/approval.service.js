// src/features/principal/services/approval.service.js

import { contentData } from "@/mock/mockData";

/*
  Simulate delay
*/

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
  Fetch dashboard stats
*/

export const getPrincipalStats = async () => {
  await delay(1000);

  return {
    total: contentData.length,

    pending: contentData.filter((item) => item.status === "pending").length,

    approved: contentData.filter((item) => item.status === "approved").length,

    rejected: contentData.filter((item) => item.status === "rejected").length,
  };
};

/*
  Fetch pending content
*/

export const getPendingContent = async () => {
  await delay(1000);

  return contentData.filter((item) => item.status === "pending");
};

/*
  Fetch all content
*/

export const getAllContent = async () => {
  await delay(1000);

  return contentData;
};

/*
  Approve content
*/

export const approveContent = async (id) => {
  await delay(1000);

  const content = contentData.find((item) => item.id === id);

  if (!content) {
    throw new Error("Content not found");
  }

  content.status = "approved";

  return content;
};

/*
  Reject content
*/

export const rejectContent = async ({ id, reason }) => {
  await delay(1000);

  const content = contentData.find((item) => item.id === id);

  if (!content) {
    throw new Error("Content not found");
  }

  content.status = "rejected";

  content.rejectionReason = reason;

  return content;
};