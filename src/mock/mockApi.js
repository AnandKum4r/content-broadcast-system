// src/mock/mockApi.js
import { users } from "./mockData";

/*
  Simulate network delay
*/

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/*
  Mock login API
*/

export const mockLogin = async (payload) => {
  await delay(1500);

  const user = users.find(
    (item) =>
      item.email === payload.email && item.password === payload.password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    token: "mock-jwt-token",
    user,
  };
};
