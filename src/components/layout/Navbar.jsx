// src/components/layout/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LogOut, User as UserIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/50 px-8 backdrop-blur-xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Institutional Access
        </span>
        <h2 className="text-sm font-semibold text-slate-900">
          {user?.role === "teacher"
            ? "Faculty Portal"
            : "Administrative Office"}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 border-r border-slate-200 pr-6">
          <div className="flex flex-col text-right">
            <p className="text-sm font-bold text-slate-900">{user?.name}</p>
            <p className="text-[11px] font-medium text-indigo-600 uppercase tracking-tighter">
              {user?.role}
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
            <UserIcon size={20} />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500 hover:text-rose-600 transition-colors"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
