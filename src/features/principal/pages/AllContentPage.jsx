// src/features/principal/pages/AllContentPage.jsx
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import ContentTable from "@/components/tables/ContentTable";
import ContentTableSkeleton from "@/components/tables/ContentTableSkeleton";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
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
  const [debouncedSearch] = useDebounce(search, 300);

  const { data = [], isLoading } = useQuery({
    queryKey: ["all-content"],
    queryFn: getAllContent,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

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

        {/* Filters: Enhanced Mobile UI */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm space-y-4 md:space-y-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1 group">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <Input
                placeholder="Search by title, subject..."
                className="h-12 border-slate-200 pl-11 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filter Group */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-slate-600">
                <SlidersHorizontal size={16} className="text-slate-400" />
                STATUS
              </div>

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-12 w-full sm:w-48 border-slate-200 rounded-xl font-medium">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Submissions</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Display */}
        {isLoading ? (
          <ContentTableSkeleton />
        ) : !filteredData.length ? (
          <div className="pt-10">
            <EmptyState
              title="No content found"
              description="Try adjusting your search or filters to find what you're looking for."
            />
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all animate-in fade-in duration-500">
            <ContentTable data={filteredData} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AllContentPage;
