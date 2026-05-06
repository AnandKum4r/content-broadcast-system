// src/features/auth/utils/authStorage.js
export const setAuthData = (data) => {
  localStorage.setItem("token", data.token);

  localStorage.setItem("user", JSON.stringify(data.user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};