import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

const ConfirmModal = ({ open, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  /*
    Confirm rejection
  */

  const handleConfirm = () => {
    if (!reason.trim()) return;

    onConfirm(reason);

    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Content</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            placeholder="Enter rejection reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <Button className="w-full" onClick={handleConfirm}>
            Confirm Reject
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
