// src/features/live/pages/LivePage.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import FilePreview from "@/components/common/FilePreview";
import { getScheduleStatus } from "@/utils/getScheduleStatus";
import { getLiveContent } from "../services/live.service";
import { Radio, RefreshCw } from "lucide-react";

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
      {/* Dynamic Header */}
      <div className="border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]">
              <Radio className="text-white animate-pulse" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Live Broadcast
              </h1>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                {teacher?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              SYSTEM ACTIVE
            </div>
            {isFetching && (
              <RefreshCw size={16} className="animate-spin text-slate-500" />
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl p-6 lg:p-10">
        {/* Statistics Bar */}
        <div className="mb-10 flex items-center gap-8 border-b border-white/5 pb-8">
          <div className="flex flex-col">
            <span className="text-3xl font-black">{content.length}</span>
            <span className="text-xs font-bold text-slate-500 uppercase">
              Active Feeds
            </span>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="text-3xl font-black text-indigo-400">HD</span>
            <span className="text-xs font-bold text-slate-500 uppercase">
              Stream Quality
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {content.map((item) => (
            <FilePreview
              key={item.id}
              item={item}
              scheduleStatus={getScheduleStatus(item.startTime, item.endTime)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default LivePage;
