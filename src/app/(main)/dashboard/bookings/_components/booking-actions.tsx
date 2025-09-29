"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Booking } from "../types";

interface BookingActionsProps {
  booking: Booking;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BookingActions: React.FC<BookingActionsProps> = ({ booking, onEdit, onDelete }) => {
  const router = useRouter();

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
      // Default edit behavior - navigate to edit page
      router.push(`/dashboard/bookings/${booking.id}/edit`);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/bookings");
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      // Default delete behavior - you might want to show a confirmation dialog
      console.log("Delete booking:", booking.id);
    }
  };

  return (
    <Card className="@container/card p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Actions</h3>

        <div className="space-y-3">
          <Button onClick={handleEdit} className="w-full justify-start" variant="outline">
            <Edit className="mr-2 size-4" />
            Edit Booking
          </Button>

          <Button onClick={handleBack} className="w-full justify-start" variant="outline">
            <ArrowLeft className="mr-2 size-4" />
            Back to Bookings
          </Button>

          <Button onClick={handleDelete} className="w-full justify-start" variant="destructive">
            <Trash2 className="mr-2 size-4" />
            Cancel Booking
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="mb-3 text-sm font-medium">Booking Timeline</h4>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Created</p>
              <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p>{new Date(booking.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingActions;
