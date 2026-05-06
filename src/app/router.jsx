// src/app/router.jsx

import { createBrowserRouter } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";

import TeacherDashboard from "@/features/teacher/pages/TeacherDashboard";

import UploadContentPage from "@/features/teacher/pages/UploadContentPage";

import MyContentPage from "@/features/teacher/pages/MyContentPage";

import PrincipalDashboard from "@/features/principal/pages/PrincipalDashboard";

import ProtectedRoute from "@/routes/ProtectedRoute";

import RoleRoute from "@/routes/RoleRoute";

import PendingApprovalPage from "@/features/principal/pages/PendingApprovalPage";

import AllContentPage from "@/features/principal/pages/AllContentPage";

import LivePage from "@/features/live/pages/LivePage";

import NotFound from "@/components/common/NotFound";

const router = createBrowserRouter([
  /*
    Public route
  */

  {
    path: "/",

    element: <LoginPage />,
  },

  // Live content route

  {
    path: "/live/:teacherId",

    element: <LivePage />,
  },

  /*
    Teacher routes
  */

  {
    path: "/teacher/dashboard",

    element: (
      <ProtectedRoute>
        <RoleRoute allowedRole="teacher">
          <TeacherDashboard />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },

  {
    path: "/teacher/upload",

    element: (
      <ProtectedRoute>
        <RoleRoute allowedRole="teacher">
          <UploadContentPage />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },

  {
    path: "/teacher/content",

    element: (
      <ProtectedRoute>
        <RoleRoute allowedRole="teacher">
          <MyContentPage />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },

  /*
    Principal route
  */

  {
    path: "/principal/dashboard",

    element: (
      <ProtectedRoute>
        <RoleRoute allowedRole="principal">
          <PrincipalDashboard />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },

  {
    path: "/principal/pending",

    element: (
      <ProtectedRoute>
        <RoleRoute allowedRole="principal">
          <PendingApprovalPage />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },

  {
    path: "/principal/content",

    element: (
      <ProtectedRoute>
        <RoleRoute allowedRole="principal">
          <AllContentPage />
        </RoleRoute>
      </ProtectedRoute>
    ),
  },

  // Catch-all route for 404 Not Found

  {
    path: "*",

    element: <NotFound />,
  },
]);

export default router;