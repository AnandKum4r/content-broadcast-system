// src/features/auth/hooks/useAuth.js

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

/*
  Custom auth hook
*/

export const useAuth = () => {
  return useContext(AuthContext);
};