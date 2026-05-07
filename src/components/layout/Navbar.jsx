// src/components/layout/Navbar.jsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LogOut, User as UserIcon, Menu } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-4 md:px-8 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        <div className="sm:block">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Institutional Access
          </span>
          <h2 className="text-sm font-semibold text-slate-900">
            {user?.role === "teacher" ? "Faculty Portal" : "Administrative Office"}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-3 border-r border-slate-200 pr-3 md:pr-6">
          <div className="hidden md:flex flex-col text-right">
            <p className="text-sm font-bold text-slate-900">{user?.name}</p>
            <p className="text-[11px] font-medium text-indigo-600 uppercase tracking-tighter">
              {user?.role}
            </p>
          </div>
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
            <UserIcon size={18} />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500 p-5 cursor-pointer hover:text-rose-600 px-2 md:px-4"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <LogOut size={18} className="md:mr-2" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;