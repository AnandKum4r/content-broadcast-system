// src/features/auth/services/auth.service.js
import { mockLogin } from "@/mock/mockApi";

/*
  Login API service
*/

export const loginUser = async (payload) => {
  try {
    const response = await mockLogin(payload);

    return response;
  } catch (error) {
    /*
      Safely throw readable message
    */

    throw new Error(error.message || "Login failed", { cause: error });
  }
};