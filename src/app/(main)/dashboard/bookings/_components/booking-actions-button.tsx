import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChartNoAxesColumn, Check, Download, Edit, EyeClosed, MessageCircle, Trash2 } from "lucide-react";

interface BookingActionsButtonProps {
  onEdit?: () => void;
  onBack?: () => void;
  onDelete?: () => void;
}
const BookingActionsButton: React.FC<BookingActionsButtonProps> = ({
 onEdit,
  onBack,
  onDelete
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Actions</h3>
        <div className="space-y-3">
          <Button onClick={onEdit} className="w-full text-white py-6 rounded-lg font-medium hover:bg-green-700" variant="default">
            <Check className="mr-2 size-6" />
            Approve Booking
          </Button>

          <Button onClick={onBack} className="w-full py-6 rounded-lg font-medium" variant="destructive">
            <EyeClosed className="mr-2 size-6" />
            Reject Bookings
          </Button>

          <Button onClick={onDelete} className="w-full  py-6 rounded-lg font-medium hover:bg-green-700" variant="secondary">
            <ChartNoAxesColumn className="mr-2 size-6" />
            Cancel Booking
          </Button>
            <Button onClick={onDelete} className="w-full py-6 rounded-lg font-medium hover:bg-green-700" variant="outline">
            <MessageCircle className="mr-2 size-6" />
             Sent Remainder
          </Button>
            <Button onClick={onDelete} className="w-full py-6 rounded-lg font-medium hover:bg-green-700" variant="outline">
            <Download className="mr-2 size-6" />
          Download Invoice
          </Button>

        </div>
    </>
  );
};

export default BookingActionsButton;
