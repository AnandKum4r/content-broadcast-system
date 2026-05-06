// src/components/common/StatusBadge.jsx
import { Badge } from "@/components/ui/badge";
import { CONTENT_STATUS } from "@/lib/constants";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    [CONTENT_STATUS.PENDING]: {
      container:
        "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
      dot: "bg-amber-500",
    },
    [CONTENT_STATUS.APPROVED]: {
      container:
        "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
      dot: "bg-emerald-500",
    },
    [CONTENT_STATUS.REJECTED]: {
      container: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50",
      dot: "bg-rose-500",
    },
  };

  const style = statusStyles[status] || statusStyles[CONTENT_STATUS.PENDING];

  return (
    <Badge
      variant="outline"
      className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-tight shadow-sm ${style.container}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </Badge>
  );
};

export default StatusBadge;
