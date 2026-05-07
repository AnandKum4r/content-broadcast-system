// src/components/layout/AppSidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  LayoutDashboard,
  UploadCloud,
  FolderOpen,
  ClipboardList,
  Layers,
  X,
} from "lucide-react";

export const SidebarContent = ({ onClose }) => {
  const { user } = useAuth();

  const teacherLinks = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: LayoutDashboard },
    { name: "Upload Content", path: "/teacher/upload", icon: UploadCloud },
    { name: "My Content", path: "/teacher/content", icon: FolderOpen },
  ];

  const principalLinks = [
    { name: "Dashboard", path: "/principal/dashboard", icon: LayoutDashboard },
    {
      name: "Pending Approval",
      path: "/principal/pending",
      icon: ClipboardList,
    },
    { name: "All Content", path: "/principal/content", icon: Layers },
  ];

  const links = user?.role === "teacher" ? teacherLinks : principalLinks;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 rounded-xl bg-indigo-600 p-3 text-white">
          <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center font-bold">
            CM
          </div>
          <span className="font-bold tracking-tight">Content Management</span>
        </div>
        {/* Mobile-only close button */}
        <button onClick={onClose} className="lg:hidden p-2 text-slate-500">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose} // Close sidebar on link click (mobile)
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon
                  size={20}
                  className={
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  }
                />
                {link.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-400 font-medium">
          System v2.4.0 • 2026
        </div>
      </div>
    </div>
  );
};

const AppSidebar = () => {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white flex-col">
      <SidebarContent />
    </aside>
  );
};

export default AppSidebar;
