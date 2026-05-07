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
import { Check, XCircle, ShieldAlert, Loader2 } from "lucide-react"; // Added Loader2
import {
  approveContent,
  getPendingContent,
  rejectContent,
} from "../services/approval.service";

const PendingApprovalPage = () => {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["pending-content"],
    queryFn: getPendingContent,
    refetchOnMount: true,
  });

  const approveMutation = useMutation({
    mutationFn: approveContent,
    onSuccess: () => {
      toast.success("Content approved successfully");
      queryClient.invalidateQueries({ queryKey: ["pending-content"] });
      queryClient.invalidateQueries({ queryKey: ["principal-stats"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const rejectMutation = useMutation({
    mutationFn: rejectContent,
    onSuccess: () => {
      toast.success("Content rejected successfully");
      setModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["pending-content"] });
      queryClient.invalidateQueries({ queryKey: ["principal-stats"] });
    },
    onError: (error) => toast.error(error.message),
  });

  if (isLoading)
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <PageHeader
            title="Action Required"
            description="Review and moderate pending content submissions."
          />
          {data?.length > 0 && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-100">
              <ShieldAlert size={14} />
              {data.length} URGENT REVIEWS
            </div>
          )}
        </div>

        {!data?.length ? (
          <EmptyState
            title="All caught up!"
            description="No pending items to review."
          />
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-in fade-in duration-500">
            <ContentTable
              data={data}
              actions={(item) => {
                // Check if THIS specific item is the one being approved or rejected
                const isApprovingThis =
                  approveMutation.isPending &&
                  approveMutation.variables === item.id;
                const isRejectingThis =
                  rejectMutation.isPending &&
                  rejectMutation.variables?.id === item.id;
                const isAnyActionPending =
                  approveMutation.isPending || rejectMutation.isPending;

                return (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-semibold transition-all active:scale-95"
                      onClick={() => approveMutation.mutate(item.id)}
                      disabled={isAnyActionPending}
                    >
                      {isApprovingThis ? (
                        <Loader2 size={16} className="mr-1.5 animate-spin" />
                      ) : (
                        <Check size={16} className="mr-1.5" />
                      )}
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-rose-600 cursor-pointer border-rose-200 hover:bg-rose-50 font-semibold transition-all active:scale-95"
                      onClick={() => {
                        setSelectedId(item.id);
                        setModalOpen(true);
                      }}
                      disabled={isAnyActionPending}
                    >
                      {isRejectingThis ? (
                        <Loader2 size={16} className="mr-1.5 animate-spin" />
                      ) : (
                        <XCircle size={16} className="mr-1.5" />
                      )}
                      Reject
                    </Button>
                  </div>
                );
              }}
            />
          </div>
        )}

        <ConfirmModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={(reason) =>
            rejectMutation.mutate({ id: selectedId, reason })
          }
          title="Reject Submission"
          description="Please provide a reason for rejection. This will be shared with the teacher."
        />
      </div>
    </DashboardLayout>
  );
};

export default PendingApprovalPage;
