// src/features/auth/context/AuthContext.jsx
import { createContext, useEffect, useState } from "react";

import { clearAuthData, getUser } from "../utils/authStorage";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /*
    Store authenticated user
  */

  const [user, setUser] = useState(null);

  /*
    Loading state while checking auth
  */

  const [loading, setLoading] = useState(true);

  /*
    Restore session on refresh
  */

  useEffect(() => {
    const existingUser = getUser();

    if (existingUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(existingUser);
    }

    setLoading(false);
  }, []);

  /*
    Logout handler
  */

  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
