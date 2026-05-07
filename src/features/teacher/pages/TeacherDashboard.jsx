// src/features/teacher/pages/TeacherDashboard.jsx
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardSkeleton from "@/components/common/DashboardSkeleton";
import StatsCard from "@/components/dashboard/StatsCard";
import PageHeader from "@/components/common/PageHeader";
import { useTeacherStats } from "../hooks/useTeacherStats";
import { FileText, Clock, CheckCircle2, XCircle, Sparkles } from "lucide-react";

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
      <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
        <PageHeader
          title="Overview"
          description="Here's what's happening with your broadcast content today."
        />

        {/* Stats Grid: Fluid scaling for all devices */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Uploaded"
            value={data?.total || 0}
            icon={<FileText size={20} />}
            className="bg-blue-50/50 border-blue-100"
          />
          <StatsCard
            title="Pending Review"
            value={data?.pending || 0}
            icon={<Clock size={20} />}
            className="bg-amber-50/50 border-amber-100"
          />
          <StatsCard
            title="Approved"
            value={data?.approved || 0}
            icon={<CheckCircle2 size={20} />}
            className="bg-emerald-50/50 border-emerald-100"
          />
          <StatsCard
            title="Rejected"
            value={data?.rejected || 0}
            icon={<XCircle size={20} />}
            className="bg-rose-50/50 border-rose-100"
          />
        </div>

        {/* Actionable Placeholder */}
        <div className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 md:p-20 text-center transition-all hover:border-indigo-300">
          <div className="relative z-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-transform group-hover:scale-110">
              <Sparkles size={24} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Live Activity Feed Coming Soon
            </p>
            <p className="mx-auto mt-2 max-w-xs text-xs text-slate-400">
              Soon you'll be able to see real-time engagement data for your
              broadcasts.
            </p>
          </div>
          <div className="absolute inset-0 bg-linear-to-br from-indigo-50/0 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
