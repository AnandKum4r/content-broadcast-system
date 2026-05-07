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

/*
  Optimized row component
*/

const ContentRow = memo(({ item, actions }) => {
  return (
    <TableRow className="h-19 transition-colors hover:bg-slate-50/50">
      {/* Preview */}
      <TableCell>
        <div className="h-14 w-20 overflow-hidden rounded-lg border border-slate-100 bg-slate-100 shadow-sm">
          <img
            src={item.preview}
            alt={item.title}
            width={80}
            height={56}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </TableCell>

      {/* Details */}
      <TableCell>
        <div className="flex flex-col">
          <span className="line-clamp-1 font-bold text-slate-900">
            {item.title}
          </span>

          <span className="text-xs font-medium uppercase tracking-wider text-indigo-600">
            {item.subject}
          </span>
        </div>
      </TableCell>

      {/* Teacher */}
      <TableCell className="font-medium text-slate-600">
        {item.teacherName}
      </TableCell>

      {/* Status */}
      <TableCell className="text-center">
        <StatusBadge status={item.status} />
      </TableCell>

      {/* Schedule */}
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

      {/* Actions */}
      {actions && (
        <TableCell className="text-right">
          <div className="flex justify-end">{actions(item)}</div>
        </TableCell>
      )}
    </TableRow>
  );
});

ContentRow.displayName = "ContentRow";

const ContentTable = ({ data, actions }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/70">
          <TableRow>
            <TableHead className="w-24 font-semibold text-slate-700">
              Preview
            </TableHead>

            <TableHead className="font-semibold text-slate-700">
              Content Details
            </TableHead>

            <TableHead className="font-semibold text-slate-700">
              Teacher
            </TableHead>

            <TableHead className="text-center font-semibold text-slate-700">
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
            <ContentRow key={item.id} item={item} actions={actions} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default memo(ContentTable);
