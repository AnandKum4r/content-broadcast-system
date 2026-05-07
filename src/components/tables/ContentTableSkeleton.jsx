import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = Array.from({ length: 6 });

const ContentTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/70">
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Content Details</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Schedule</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((_, index) => (
            <TableRow key={index} className="h-19">
              {/* Image */}
              <TableCell>
                <div className="h-14 w-20 animate-pulse rounded-lg bg-slate-200" />
              </TableCell>

              {/* Details */}
              <TableCell>
                <div className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />

                  <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                </div>
              </TableCell>

              {/* Teacher */}
              <TableCell>
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
              </TableCell>

              {/* Status */}
              <TableCell>
                <div className="mx-auto h-6 w-20 animate-pulse rounded-full bg-slate-200" />
              </TableCell>

              {/* Schedule */}
              <TableCell>
                <div className="space-y-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />

                  <div className="h-3 w-12 animate-pulse rounded bg-slate-100" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContentTableSkeleton;
