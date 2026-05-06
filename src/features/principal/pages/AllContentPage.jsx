// src/features/principal/pages/AllContentPage.jsx

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import ContentTable from "@/components/tables/ContentTable";
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
    Fetch all content
  */

  const { data, isLoading } = useQuery({
    queryKey: ["all-content"],

    queryFn: getAllContent,
  });

  /*
    Optimized filtering
  */

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.subject.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "all" ? true : item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  /*
    Loading state
  */

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

  if (!filteredData.length) {
    return (
      <DashboardLayout>
        <EmptyState title="No content found" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Content Library"
          description="Monitor all educational assets across the institution."
        />

        <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Search by title, subject..."
              className="pl-10 h-11 border-slate-200 focus:ring-indigo-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 whitespace-nowrap">
              <Filter size={16} /> Filter by:
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full md:w-44 h-11 border-slate-200">
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

        {!filteredData.length ? (
          <EmptyState title="No content found" />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ContentTable data={filteredData} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AllContentPage;
