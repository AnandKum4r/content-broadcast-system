// src/components/common/DashboardSkeleton.jsx
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-10 w-64 rounded-lg bg-slate-200" />
        <Skeleton className="h-5 w-96 rounded-md bg-slate-100" />
      </div>

      {/* Stats Cards Grid Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="space-y-3">
              {/* Title label placeholder */}
              <Skeleton className="h-3 w-20 bg-slate-100" />
              {/* Large value placeholder */}
              <Skeleton className="h-8 w-12 bg-slate-200" />
            </div>

            {/* Icon placeholder (matching the 2xl rounded style) */}
            <Skeleton className="h-12 w-12 rounded-2xl bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Main Content Area Placeholder */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-slate-200" />
          <Skeleton className="h-6 w-24 bg-slate-100" />
        </div>
        <Skeleton className="h-100 w-full rounded-2xl border border-slate-100 bg-white/50 shadow-sm" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
