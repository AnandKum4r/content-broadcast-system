// src/features/principal/pages/PrincipalDashboard.jsx
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardSkeleton from "@/components/common/DashboardSkeleton";
import PageHeader from "@/components/common/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { usePrincipalStats } from "../hooks/usePrincipalStats";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
} from "lucide-react";

const PrincipalDashboard = () => {
  const { data, isLoading } = usePrincipalStats();

  if (isLoading) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <PageHeader
          title="Principal Overview"
          description="High-level summary of institutional content and approval workflows."
        />

        {/* Stats Grid: Highly responsive column counts */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Content"
            value={data?.total || 0}
            icon={<FileText className="text-blue-600" size={20} />}
          />
          <StatsCard
            title="Pending Review"
            value={data?.pending || 0}
            icon={<Clock className="text-amber-500" size={20} />}
            trend="Action Required"
            trendColor="text-amber-600"
          />
          <StatsCard
            title="Approved"
            value={data?.approved || 0}
            icon={<CheckCircle2 className="text-emerald-500" size={20} />}
          />
          <StatsCard
            title="Rejected"
            value={data?.rejected || 0}
            icon={<AlertCircle className="text-rose-500" size={20} />}
          />
        </div>

        {/* Insight Section */}
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm">
            <div className="mx-auto max-w-md text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                <Activity size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Activity Analytics
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                Detailed logs of teacher uploads and approval timelines are
                currently being processed. Full reports will be available in the
                next system update.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalDashboard;
