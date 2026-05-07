// src/features/principal/pages/PendingApprovalPage.jsx

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import PageHeader from "@/components/common/PageHeader";
import ConfirmModal from "@/components/common/ConfirmModal";
import ContentTable from "@/components/tables/ContentTable";
import { Button } from "@/components/ui/button";
import { Check, XCircle } from "lucide-react";
import {
  approveContent,
  getPendingContent,
  rejectContent,
} from "../services/approval.service";

const PendingApprovalPage = () => {
  const queryClient = useQueryClient();

  const [selectedId, setSelectedId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  /*
    Fetch pending content
  */

  const { data, isLoading } = useQuery({
    queryKey: ["pending-content"],

    queryFn: getPendingContent,
    refetchOnMount: true,
  });

  /*
    Approve mutation
  */

  const approveMutation = useMutation({
    mutationFn: approveContent,

    onSuccess: () => {
      toast.success("Content approved successfully");

      queryClient.invalidateQueries({
        queryKey: ["pending-content"],
      });

      queryClient.invalidateQueries({
        queryKey: ["principal-stats"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  /*
    Reject mutation
  */

  const rejectMutation = useMutation({
    mutationFn: rejectContent,

    onSuccess: () => {
      toast.success("Content rejected successfully");

      setModalOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["pending-content"],
      });

      queryClient.invalidateQueries({
        queryKey: ["principal-stats"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

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

  if (!data?.length) {
    return (
      <DashboardLayout>
        <EmptyState title="No pending approvals" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Action Required"
          description="Review and moderate pending content submissions."
        />

        {!data?.length ? (
          <EmptyState title="All caught up!" />
        ) : (
          <ContentTable
            data={data}
            actions={(item) => (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 shadow-sm"
                  onClick={() => approveMutation.mutate(item.id)}
                >
                  <Check size={16} className="mr-1" /> Approve
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-rose-600 cursor-pointer border-rose-200 hover:bg-rose-50 shadow-sm"
                  onClick={() => {
                    setSelectedId(item.id);
                    setModalOpen(true);
                  }}
                >
                  <XCircle size={16} className="mr-1" /> Reject
                </Button>
              </div>
            )}
          />
        )}

        <ConfirmModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={(reason) =>
            rejectMutation.mutate({ id: selectedId, reason })
          }
        />
      </div>
    </DashboardLayout>
  );
};

export default PendingApprovalPage;