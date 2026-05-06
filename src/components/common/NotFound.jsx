// src/components/common/NotFound.jsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoveLeft, HelpCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6">
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black leading-none text-slate-200/50 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
            <HelpCircle size={48} className="text-indigo-600" />
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-black text-slate-900">
          Lost in the System?
        </h2>
        <p className="mt-3 max-w-sm text-slate-500 font-medium">
          The broadcast link you're following might have expired or been moved
          to a different department.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link to="/">
            <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">
              <MoveLeft size={18} className="mr-2" />
              Return to Dashboard
            </Button>
          </Link>
          <Button variant="ghost" className="h-12 text-slate-500 font-bold">
            Contact Support
          </Button>
        </div>
      </div>

      <div className="mt-20 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
        Content Broadcasting System • 2026
      </div>
    </div>
  );
};

export default NotFound;
