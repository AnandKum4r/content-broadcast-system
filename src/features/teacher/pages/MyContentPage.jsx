// src/features/teacher/pages/MyContentPage.jsx
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { getTeacherContent } from "../services/teacher.service";
import { Calendar, AlertCircle, Book } from "lucide-react";

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
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            My Content
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage and track the status of your uploaded media.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
          {data.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-slate-200 bg-white transition-all hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={item.preview}
                  alt={item.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 shadow-sm">
                  <StatusBadge status={item.status} />
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-1">
                    <Book size={14} />
                    {item.subject}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h2>
                </div>

                <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-6">
                  {item.description}
                </p>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar size={16} className="text-slate-400" />
                    <div className="text-[11px] font-bold leading-tight uppercase">
                      <span className="block text-slate-400 font-medium">
                        Timeline
                      </span>
                      {item.startTime.split(",")[0]} -{" "}
                      {item.endTime.split(",")[0]}
                    </div>
                  </div>
                </div>

                {item.rejectionReason && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-rose-50 p-4 border border-rose-100">
                    <AlertCircle
                      size={18}
                      className="text-rose-500 mt-0.5 shrink-0"
                    />
                    <div className="text-xs">
                      <span className="block font-bold text-rose-700 uppercase mb-0.5">
                        Feedback
                      </span>
                      <p className="text-rose-600 font-medium leading-relaxed">
                        {item.rejectionReason}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyContentPage;
