// src/components/dashboard/StatsCard.jsx
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";

const iconMap = {
  "Total Content": { icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  Pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  Approved: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  Rejected: { icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
};

const StatsCard = ({ title, value }) => {
  const config = iconMap[title] || iconMap["Total Content"];
  const Icon = config.icon;

  return (
    <Card className="group overflow-hidden border-none shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              {title}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 tabular-nums">
              {value.toLocaleString()}
            </h2>
          </div>
          <div
            className={`rounded-2xl p-3 ${config.bg} ${config.color} transition-transform group-hover:scale-110`}
          >
            <Icon size={28} />
          </div>
        </div>
        {/* Subtle decorative bottom bar */}
        <div
          className={`h-1 w-full ${config.bg.replace("bg-", "bg-opacity-50 bg-")}`}
        />
      </CardContent>
    </Card>
  );
};

export default StatsCard;
