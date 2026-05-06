// src/features/teacher/pages/TeacherDashboard.jsx

import DashboardLayout from "@/components/layout/DashboardLayout";

import DashboardSkeleton from "@/components/common/DashboardSkeleton";

const TeacherDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
      <DashboardSkeleton />
    </DashboardLayout>
  );
};

export default TeacherDashboard;