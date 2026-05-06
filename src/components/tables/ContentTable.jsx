// src/components/tables/ContentTable.jsx

import { memo } from "react";

import StatusBadge from "@/components/common/StatusBadge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/*
  Memoized table for performance
*/

const ContentTable = ({
  data,
  actions,
}) => {
  return (
    <div className="rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Preview
            </TableHead>

            <TableHead>
              Title
            </TableHead>

            <TableHead>
              Subject
            </TableHead>

            <TableHead>
              Teacher
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Schedule
            </TableHead>

            {actions && (
              <TableHead>
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img
                  src={item.preview}
                  alt={item.title}
                  className="h-14 w-20 rounded-md object-cover"
                  loading="lazy"
                />
              </TableCell>

              <TableCell className="font-medium">
                {item.title}
              </TableCell>

              <TableCell>
                {item.subject}
              </TableCell>

              <TableCell>
                {item.teacherName}
              </TableCell>

              <TableCell>
                <StatusBadge
                  status={item.status}
                />
              </TableCell>

              <TableCell className="text-sm text-gray-500">
                <div>
                  {item.startTime}
                </div>

                <div>
                  {item.endTime}
                </div>
              </TableCell>

              {actions && (
                <TableCell>
                  {actions(item)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default memo(ContentTable);