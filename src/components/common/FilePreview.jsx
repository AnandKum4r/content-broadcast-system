// src/components/common/FilePreview.jsx
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const FilePreview = ({ item, scheduleStatus }) => {
  const statusStyles = {
    scheduled: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    active: "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    expired: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <Card className="group relative overflow-hidden border-none bg-slate-900 shadow-2xl transition-all duration-300 hover:ring-2 hover:ring-indigo-500/50">
      {/* Header Image Section */}
      <div className="relative h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-black/20 z-10" />
        <img
          src={item.preview}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={`absolute right-4 top-4 z-20 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest ${statusStyles[scheduleStatus]}`}
        >
          {scheduleStatus === "active" ? "● ON AIR" : scheduleStatus}
        </div>
      </div>

      {/* Content Body */}
      <div className="relative z-20 -mt-12 p-8 pt-0">
        <div className="rounded-2xl bg-slate-900/80 p-6 backdrop-blur-xl border border-white/5 shadow-xl">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-1 text-xs font-bold uppercase tracking-widest">
              <BookOpen size={14} />
              {item.subject}
            </div>
            <h2 className="text-2xl font-black text-white leading-tight">
              {item.title}
            </h2>
          </div>

          <p className="line-clamp-2 text-sm text-slate-400 mb-6 font-medium">
            {item.description}
          </p>

          {/* Schedule Footer */}
          <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 border border-white/5">
            <div className="space-y-1">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">
                Starts
              </span>
              <span className="text-xs font-bold text-slate-200">
                {item.startTime}
              </span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="space-y-1 text-right">
              <span className="block text-[10px] font-bold text-slate-500 uppercase">
                Ends
              </span>
              <span className="text-xs font-bold text-slate-200">
                {item.endTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilePreview;
