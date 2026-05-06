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
import { Calendar } from "lucide-react";

const ContentTable = ({ data, actions }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-[100px] font-semibold text-slate-700">
              Preview
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Content Details
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Teacher
            </TableHead>
            <TableHead className="font-semibold text-slate-700 text-center">
              Status
            </TableHead>
            <TableHead className="font-semibold text-slate-700">
              Schedule
            </TableHead>
            {actions && (
              <TableHead className="text-right font-semibold text-slate-700">
                Actions
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="group transition-colors hover:bg-slate-50/50"
            >
              <TableCell>
                <div className="relative h-14 w-20 overflow-hidden rounded-lg border border-slate-100 shadow-sm">
                  <img
                    src={item.preview}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">{item.title}</span>
                  <span className="text-xs font-medium text-indigo-600 uppercase tracking-wider">
                    {item.subject}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-slate-600 font-medium">
                {item.teacherName}
              </TableCell>
              <TableCell className="text-center">
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Calendar size={14} className="text-slate-400" />
                  <div className="flex flex-col leading-tight">
                    <span>{item.startTime}</span>
                    <span className="text-[10px] text-slate-400">
                      to {item.endTime}
                    </span>
                  </div>
                </div>
              </TableCell>
              {actions && (
                <TableCell className="text-right">
                  <div className="flex justify-end">{actions(item)}</div>
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
