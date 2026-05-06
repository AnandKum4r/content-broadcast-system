// src/components/common/ConfirmModal.jsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({ open, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <AlertTriangle size={24} />
          </div>
          <DialogTitle className="text-center text-xl">Reject Content</DialogTitle>
          <DialogDescription className="text-center">
            Please provide a specific reason for rejection. This will be shared with the teacher.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <Textarea
            placeholder="e.g., Video quality is low or syllabus mismatch..."
            className="min-h-[120px] border-slate-200 focus:ring-rose-500"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button 
              variant="destructive" 
              className="flex-1 font-bold" 
              onClick={handleConfirm}
              disabled={!reason.trim()}
            >
              Confirm Reject
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;

