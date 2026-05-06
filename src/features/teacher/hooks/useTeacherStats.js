// src/features/teacher/hooks/useTeacherStats.js
import DashboardLayout from "@/components/layout/DashboardLayout";

import StatsCard from "@/components/dashboard/StatsCard";

import Loader from "@/components/common/Loader";

import { useTeacherStats } from "../hooks/useTeacherStats";

const TeacherDashboard = () => {
  /*
    Fetch dashboard stats
  */

  const { data, isLoading } = useTeacherStats();

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Total Uploaded" value={data?.total || 0} />

          <StatsCard title="Pending" value={data?.pending || 0} />

          <StatsCard title="Approved" value={data?.approved || 0} />

          <StatsCard title="Rejected" value={data?.rejected || 0} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;