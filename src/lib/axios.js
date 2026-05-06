// src/lib/axios.js
import axios from "axios";

/*
  Centralized axios instance
*/

const api = axios.create({
  baseURL: "https://mock-api.local",
  timeout: 5000,
});

/*
  Attach token automatically
*/

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
