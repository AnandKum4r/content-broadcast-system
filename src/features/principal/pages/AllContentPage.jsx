// src/features/principal/pages/AllContentPage.jsx

import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "@/components/layout/DashboardLayout";

import Loader from "@/components/common/Loader";

import EmptyState from "@/components/common/EmptyState";

import PageHeader from "@/components/common/PageHeader";

import ContentTable from "@/components/tables/ContentTable";

import { Input } from "@/components/ui/input";

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
      <PageHeader
        title="All Content"
        description="View and filter all uploaded content"
      />

      {/* Filters */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Search by title or subject"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-52">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>

            <SelectItem value="pending">Pending</SelectItem>

            <SelectItem value="approved">Approved</SelectItem>

            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ContentTable data={filteredData} />
    </DashboardLayout>
  );
};

export default AllContentPage;