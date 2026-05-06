// src/components/common/FilePreview.jsx

import { Card } from "@/components/ui/card";

const FilePreview = ({ item, scheduleStatus }) => {
  /*
    Status colors
  */

  const statusStyles = {
    scheduled: "bg-yellow-100 text-yellow-800",

    active: "bg-green-100 text-green-800",

    expired: "bg-red-100 text-red-800",
  };

  return (
    <Card className="overflow-hidden">
      {/* Image */}

      <img
        src={item.preview}
        alt={item.title}
        className="h-72 w-full object-cover"
      />

      {/* Content */}

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{item.title}</h2>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[scheduleStatus]}`}
          >
            {scheduleStatus}
          </span>
        </div>

        <p className="text-lg text-gray-600">{item.subject}</p>

        <p className="text-gray-500">{item.description}</p>

        {/* Schedule */}

        <div className="rounded-lg bg-gray-100 p-4 text-sm">
          <p>
            <span className="font-semibold">Start:</span> {item.startTime}
          </p>

          <p className="mt-1">
            <span className="font-semibold">End:</span> {item.endTime}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FilePreview;
