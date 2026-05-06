// src/components/common/ErrorState.jsx
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorState = ({
  title = "System Encountered an Issue",
  message = "We're having trouble reaching the broadcast servers right now.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50/30 p-12 text-center backdrop-blur-sm">
      <div className="mb-4 rounded-full bg-rose-100 p-4 text-rose-600">
        <AlertCircle size={32} />
      </div>

      <h2 className="text-xl font-black text-slate-900">{title}</h2>
      <p className="mt-2 max-w-xs text-sm font-medium text-slate-500 leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="mt-6 border-rose-200 bg-white text-rose-600 hover:bg-rose-50 hover:text-rose-700"
        >
          <RefreshCcw size={16} className="mr-2" />
          Attempt Reconnect
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
