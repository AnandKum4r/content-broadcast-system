// src/features/teacher/pages/UploadContentPage.jsx
import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadContentForm from "@/components/forms/UploadContentForm";
import { UploadCloud } from "lucide-react";

const UploadContentPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl space-y-10 animate-in slide-in-from-bottom-2 duration-500">
        <div className="flex items-center gap-5 border-b border-slate-100 ">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <UploadCloud size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Publish Content
            </h1>
            <p className="text-slate-500 font-medium">
              Add new media to the institutional broadcast queue.
            </p>
          </div>
        </div>

        <div className="bg-slate-50/50 p-1 rounded-3xl">
          <UploadContentForm />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadContentPage;
