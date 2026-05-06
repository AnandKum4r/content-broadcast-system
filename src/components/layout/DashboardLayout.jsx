// src/components/layout/DashboardLayout.jsx
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-4 md:p-8 lg:p-10 transition-all duration-300">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
