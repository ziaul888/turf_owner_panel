import React from "react";

import {
  ArrowLeft,
  Ban,
  ChartNoAxesColumn,
  Check,
  Download,
  Edit,
  EyeClosed,
  MessageCircle,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface BookingActionsButtonProps {
  onEdit?: () => void;
  onBack?: () => void;
  onDelete?: () => void;
}
const BookingActionsButton: React.FC<BookingActionsButtonProps> = ({ onEdit, onBack, onDelete }) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Actions</h3>
      <div className="space-y-3">
        <Button
          onClick={onEdit}
          className="w-full rounded-lg py-6 font-medium text-white hover:bg-green-700"
          variant="default"
        >
          <Check className="mr-2 size-6" />
          Approve Booking
        </Button>

        <Button onClick={onBack} className="w-full rounded-lg py-6 font-medium" variant="destructive">
          <EyeClosed className="mr-2 size-6" />
          Reject Bookings
        </Button>

        <Button
          onClick={onDelete}
          className="w-full rounded-lg py-6 font-medium hover:bg-green-700"
          variant="secondary"
        >
          <Ban className="mr-2 size-6" />
          Cancel Booking
        </Button>
        <Button onClick={onDelete} className="w-full rounded-lg py-6 font-medium hover:bg-green-700" variant="outline">
          <MessageCircle className="mr-2 size-6" />
          Sent Remainder
        </Button>
        <Button onClick={onDelete} className="w-full rounded-lg py-6 font-medium hover:bg-green-700" variant="outline">
          <Download className="mr-2 size-6" />
          Download Invoice
        </Button>
      </div>
    </>
  );
};

export default BookingActionsButton;
