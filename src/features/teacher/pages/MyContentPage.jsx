// src/features/teacher/pages/MyContentPage.jsx
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import PageHeader from "@/components/common/PageHeader";
import { Card } from "@/components/ui/card";
import { getTeacherContent } from "../services/teacher.service";
import { Calendar, AlertCircle, Book} from "lucide-react";

const MyContentPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["teacher-content"],
    queryFn: getTeacherContent,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <Loader />
        </div>
      </DashboardLayout>
    );
  }

  if (!data?.length) {
    return (
      <DashboardLayout>
        <EmptyState
          title="Your Library is Empty"
          description="Start by uploading your first educational resource to the system."
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader
          title="My Content"
          description="Manage and track the status of your uploaded media."
        />

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <Card
              key={item.id}
              className="group flex flex-col overflow-hidden border-slate-200 bg-white transition-all hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5"
            >
              {/* Media Preview */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.preview}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <StatusBadge
                    status={item.status}
                    className="shadow-lg backdrop-blur-md"
                  />
                </div>
              </div>

              {/* Content Body */}
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <div className="mb-3">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] uppercase tracking-wider mb-1">
                    <Book size={12} />
                    {item.subject}
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h2>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-6">
                  {item.description}
                </p>

                {/* Meta Info */}
                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <Calendar size={14} className="text-slate-400" />
                      <div className="text-[10px] font-bold leading-tight uppercase">
                        <span className="block text-slate-400 font-medium">
                          Timeline
                        </span>
                        <span className="text-slate-700">
                          {item.startTime.split(",")[0]} -{" "}
                          {item.endTime.split(",")[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback UI */}
                  {item.status === "rejected" && item.rejectionReason && (
                    <div className="flex items-start gap-3 rounded-xl bg-rose-50 p-3 border border-rose-100 animate-in slide-in-from-top-2">
                      <AlertCircle
                        size={16}
                        className="text-rose-500 shrink-0 mt-0.5"
                      />
                      <div className="text-xs">
                        <span className="block font-bold text-rose-700 uppercase mb-0.5">
                          Feedback
                        </span>
                        <p className="text-rose-600 font-medium leading-relaxed italic">
                          "{item.rejectionReason}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyContentPage;
