// src/features/live/pages/LivePage.jsx

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import Loader from "@/components/common/Loader";

import EmptyState from "@/components/common/EmptyState";

import FilePreview from "@/components/common/FilePreview";

import { getScheduleStatus } from "@/utils/getScheduleStatus";

import { getLiveContent } from "../services/live.service";

const LivePage = () => {
  /*
    Get teacher id from route
  */

  const { teacherId } = useParams();

  /*
    Fetch live content
  */

  const { data, isLoading } = useQuery({
    queryKey: ["live-content", teacherId],

    queryFn: () => getLiveContent(teacherId),

    /*
        Poll every 30 seconds
      */

    refetchInterval: 30000,
  });

  /*
    Loading state
  */

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <Loader />
      </div>
    );
  }

  /*
    Empty state
  */

  if (!data?.length) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <EmptyState title="No content available" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">Live Broadcasting</h1>

          <p className="mt-2 text-gray-500">Public live content feed</p>
        </div>

        {/* Live Content */}

        <div className="grid gap-8">
          {data.map((item) => (
            <FilePreview
              key={item.id}
              item={item}
              scheduleStatus={getScheduleStatus(item.startTime, item.endTime)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivePage;