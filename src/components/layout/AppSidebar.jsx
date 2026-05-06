// src/components/layout/AppSidebar.jsx
import { NavLink } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";

const AppSidebar = () => {
  const { user } = useAuth();

  /*
    Sidebar items based on role
  */

  const teacherLinks = [
    {
      name: "Dashboard",
      path: "/teacher/dashboard",
    },
    {
      name: "Upload Content",
      path: "/teacher/upload",
    },
    {
      name: "My Content",
      path: "/teacher/content",
    },
  ];

  const principalLinks = [
    {
      name: "Dashboard",
      path: "/principal/dashboard",
    },
    {
      name: "Pending Approval",
      path: "/principal/pending",
    },
    {
      name: "All Content",
      path: "/principal/content",
    },
  ];

  const links = user?.role === "teacher" ? teacherLinks : principalLinks;

  return (
    <aside className="w-64 border-r bg-gray-100 p-4">
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-2 ${
                isActive ? "bg-black text-white" : "hover:bg-gray-200"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
