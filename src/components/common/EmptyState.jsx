// src/components/common/EmptyState.jsx
import { Inbox } from "lucide-react";
const EmptyState = ({ title = "No data found" }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 py-20 text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-400">
        <Inbox size={48} strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-slate-500">
        We couldn't find anything matching your criteria.
      </p>
    </div>
  );
};
export default EmptyState;
