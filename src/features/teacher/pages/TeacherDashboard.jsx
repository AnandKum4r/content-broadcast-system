// src/features/teacher/pages/TeacherDashboard.jsx
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardSkeleton from "@/components/common/DashboardSkeleton";
import StatsCard from "@/components/dashboard/StatsCard";
import { useTeacherStats } from "../hooks/useTeacherStats";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";

const TeacherDashboard = () => {
  const { data, isLoading } = useTeacherStats();

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
        {/* Header with Greeting */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Overview
          </h1>
          <p className="text-slate-500 font-medium">
            Here's what's happening with your broadcast content today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Uploaded"
            value={data?.total || 0}
            icon={FileText}
            variant="primary"
          />

          <StatsCard
            title="Pending Review"
            value={data?.pending || 0}
            icon={Clock}
            variant="warning"
          />

          <StatsCard
            title="Approved"
            value={data?.approved || 0}
            icon={CheckCircle2}
            variant="success"
          />

          <StatsCard
            title="Rejected"
            value={data?.rejected || 0}
            icon={XCircle}
            variant="danger"
          />
        </div>

        <div className="rounded-3xl border border-dashed border-slate-200 p-20 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            Activity Feed Coming Soon
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
