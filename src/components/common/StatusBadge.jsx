// src/components/common/StatusBadge.jsx
import { Badge } from "@/components/ui/badge";

import { CONTENT_STATUS } from "@/lib/constants";

const StatusBadge = ({ status }) => {
  /*
    Badge color based on status
  */

  const statusStyles = {
    [CONTENT_STATUS.PENDING]:
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",

    [CONTENT_STATUS.APPROVED]: "bg-green-100 text-green-800 hover:bg-green-100",

    [CONTENT_STATUS.REJECTED]: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return <Badge className={statusStyles[status]}>{status}</Badge>;
};

export default StatusBadge;