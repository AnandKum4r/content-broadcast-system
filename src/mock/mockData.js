// src/mock/mockData.js

export const users = [
  {
    id: 1,
    email: "teacher@test.com",
    password: "123456",
    role: "teacher",
    name: "Rahul Teacher",
  },
  {
    id: 2,
    email: "principal@test.com",
    password: "123456",
    role: "principal",
    name: "Sharma Principal",
  },
];

export const contentData = [
  {
    id: 1,
    title: "Math Chapter 1",
    subject: "Mathematics",
    description: "Introduction to algebra",
    status: "pending",
    teacherId: 1,
    teacherName: "Rahul Teacher",
    preview: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    startTime: "2026-05-06T00:00",
    endTime: "2026-05-07T23:59",
    rejectionReason: "",
  },

  {
    id: 2,
    title: "Physics Motion",
    subject: "Physics",
    description: "Basics of motion",
    status: "approved",
    teacherId: 1,
    teacherName: "Rahul Teacher",
    preview: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    startTime: "2026-05-06T00:00",
    endTime: "2026-05-07T23:59",
    rejectionReason: "",
  },

  {
    id: 3,
    title: "Chemistry Reactions",
    subject: "Chemistry",
    description: "Chemical reactions overview",
    status: "rejected",
    teacherId: 1,
    teacherName: "Rahul Teacher",
    preview: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    startTime: "2026-05-05T01:00",
    endTime: "2026-05-05T03:00",
    rejectionReason: "Image quality is too low",
  },
];
