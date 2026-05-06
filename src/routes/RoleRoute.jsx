// src/routes/RoleRoute.jsx
import { Navigate } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";

const RoleRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  /*
    Prevent unauthorized access
  */

  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
