// src/features/principal/pages/PrincipalDashboard.jsx
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardSkeleton from "@/components/common/DashboardSkeleton";
import PageHeader from "@/components/common/PageHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { usePrincipalStats } from "../hooks/usePrincipalStats";

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
      <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="Principal Overview"
          description="High-level summary of institutional content and approval workflows."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Content" value={data?.total || 0} />
          <StatsCard title="Pending" value={data?.pending || 0} />
          <StatsCard title="Approved" value={data?.approved || 0} />
          <StatsCard title="Rejected" value={data?.rejected || 0} />
        </div>

        {/* Example of a placeholder for future deeper insights */}
        <div className="mt-8 rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
          <p className="text-slate-400 font-medium">
            Recent Activity Logs will appear here
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PrincipalDashboard;
