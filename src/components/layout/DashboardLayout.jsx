// src/components/layout/DashboardLayout.jsx
import Navbar from "./Navbar";
import AppSidebar from "./AppSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex">
        <AppSidebar />

        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;