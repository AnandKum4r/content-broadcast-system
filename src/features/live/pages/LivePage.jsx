// src/features/live/pages/LivePage.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import FilePreview from "@/components/common/FilePreview";
import { getScheduleStatus } from "@/utils/getScheduleStatus";
import { getLiveContent } from "../services/live.service";
import { Radio, RefreshCw, LayoutGrid } from "lucide-react";

const LivePage = () => {
  const { teacherId } = useParams();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["live-content", teacherId],
    queryFn: () => getLiveContent(teacherId),
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader />
      </div>
    );
  }

  if (isError || !data?.content.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
        <EmptyState
          title={isError ? "Connection Lost" : "Broadcast Offline"}
          description={
            error?.message ||
            "There are no active educational sessions at this moment."
          }
          dark
        />
      </div>
    );
  }

  const teacher = data?.teacher;
  const content = data?.content || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Dynamic Header: High-blur glassmorphism */}
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)] shrink-0">
              <Radio className="text-white animate-pulse" size={18} />
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-xl font-bold tracking-tight truncate">
                Live Broadcast
              </h1>
              <p className="text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-widest truncate">
                {teacher?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-[10px] md:text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              SYSTEM ACTIVE
            </div>
            {isFetching && (
              <RefreshCw size={16} className="animate-spin text-slate-500" />
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Statistics Bar: Scrollable on mobile if needed, or flex-wrapped */}
        <div className="mb-8 md:mb-12 flex items-center gap-6 md:gap-8 border-b border-white/5 pb-6 md:pb-8 overflow-x-auto scrollbar-hide">
          <div className="flex flex-col shrink-0">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl md:text-4xl font-black">
                {content.length}
              </span>
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
            </div>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-tighter">
              Active Feeds
            </span>
          </div>

          <div className="h-8 md:h-10 w-px bg-white/10 shrink-0" />

          <div className="flex flex-col shrink-0">
            <span className="text-2xl md:text-4xl font-black text-indigo-400">
              4K
            </span>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-tighter">
              Stream Quality
            </span>
          </div>

          <div className="h-8 md:h-10 w-px bg-white/10 shrink-0 hidden xs:block" />

          <div className="hidden xs:flex flex-col shrink-0">
            <span className="text-2xl md:text-4xl font-black text-slate-200 flex items-center gap-2">
              <LayoutGrid size={20} className="text-indigo-500" />
              GRID
            </span>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-tighter">
              View Mode
            </span>
          </div>
        </div>

        {/* Content Grid: 1 col on mobile, 2 on tablet, 3 on large desktop */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {content.map((item) => (
            <div
              key={item.id}
              className="transition-transform duration-300 hover:scale-[1.02]"
            >
              <FilePreview
                item={item}
                scheduleStatus={getScheduleStatus(item.startTime, item.endTime)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LivePage;
