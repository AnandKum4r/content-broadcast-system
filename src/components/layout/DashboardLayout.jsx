// src/components/layout/DashboardLayout.jsx
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50">
      <AppSidebar />

      <div className="flex-1 lg:ml-72 overflow-y-auto">
        <Navbar />

        <main className="p-4 md:p-8 lg:p-10 transition-all duration-300">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
