// src/features/principal/pages/PrincipalDashboard.jsx

import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "@/components/layout/DashboardLayout";

// import Loader from "@/components/common/Loader";
import DashboardSkeleton from "@/components/common/DashboardSkeleton";

import PageHeader from "@/components/common/PageHeader";

import StatsCard from "@/components/dashboard/StatsCard";

import { getPrincipalStats } from "../services/approval.service";

const PrincipalDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["principal-stats"],

    queryFn: getPrincipalStats,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        {/* <Loader /> */}
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Principal Dashboard"
        description="Monitor and manage uploaded content"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Content" value={data?.total} />

        <StatsCard title="Pending" value={data?.pending} />

        <StatsCard title="Approved" value={data?.approved} />

        <StatsCard title="Rejected" value={data?.rejected} />
      </div>
    </DashboardLayout>
  );
};

export default PrincipalDashboard;