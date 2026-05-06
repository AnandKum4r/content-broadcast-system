// src/routes/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

import Loader from "@/components/common/Loader";

import { useAuth } from "@/features/auth/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  /*
    Prevent flashing redirect
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  /*
    Redirect if unauthenticated
  */

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;