import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import DashboardLayout from "@/components/layout/DashboardLayout";
import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import ContentTable from "@/components/tables/ContentTable";
import ContentTableSkeleton from "@/components/tables/ContentTableSkeleton";

import { Input } from "@/components/ui/input";

import { Search, Filter } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllContent } from "../services/approval.service";

const AllContentPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  /*
    Debounced search
  */

  const [debouncedSearch] = useDebounce(search, 300);

  /*
    Fetch all content
  */

  const { data = [], isLoading } = useQuery({
    queryKey: ["all-content"],
    queryFn: getAllContent,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });

  /*
    Optimized filtering
  */

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchValue = debouncedSearch.toLowerCase();

      const matchesSearch =
        item.title?.toLowerCase().includes(searchValue) ||
        item.subject?.toLowerCase().includes(searchValue);

      const matchesStatus = status === "all" ? true : item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [data, debouncedSearch, status]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Content Library"
          description="Monitor all educational assets across the institution."
        />

        {/* Filters */}
        <div className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm md:flex-row md:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <Input
              placeholder="Search by title, subject..."
              className="h-11 border-slate-200 pl-10 focus-visible:ring-2 focus-visible:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-slate-500">
              <Filter size={16} />
              Filter by:
            </div>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-11 w-full border-slate-200 md:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <ContentTableSkeleton />
        ) : !filteredData.length ? (
          <EmptyState title="No content found" />
        ) : (
          <div className="animate-in fade-in duration-300">
            <ContentTable data={filteredData} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AllContentPage;
