// src/features/teacher/pages/MyContentPage.jsx

import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "@/components/layout/DashboardLayout";

import Loader from "@/components/common/Loader";

import EmptyState from "@/components/common/EmptyState";

import StatusBadge from "@/components/common/StatusBadge";

import { Card } from "@/components/ui/card";

import { getTeacherContent } from "../services/teacher.service";

const MyContentPage = () => {
  /*
    Fetch teacher content
  */

  const { data, isLoading } = useQuery({
    queryKey: ["teacher-content"],

    queryFn: getTeacherContent,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  /*
    Empty state
  */

  if (!data?.length) {
    return (
      <DashboardLayout>
        <EmptyState title="No content uploaded yet" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold">My Content</h1>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {data.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              {/* Preview */}

              <img
                src={item.preview}
                alt={item.title}
                className="h-52 w-full object-cover"
              />

              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{item.title}</h2>

                  <StatusBadge status={item.status} />
                </div>

                <p className="text-gray-600">{item.subject}</p>

                <p className="text-sm text-gray-500">{item.description}</p>

                <div className="text-sm text-gray-500">
                  <p>Start: {item.startTime}</p>

                  <p>End: {item.endTime}</p>
                </div>

                {/* Rejection reason */}

                {item.rejectionReason && (
                  <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    <span className="font-semibold">Rejection Reason:</span>{" "}
                    {item.rejectionReason}
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