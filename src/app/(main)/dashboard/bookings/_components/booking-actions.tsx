"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Booking } from "../types";

interface BookingActionsProps {
  booking: Booking;
  onEdit?: () => void;
  onDelete?: () => void;
  component?: ReactNode; // 👈 add children support
}

const BookingActions: React.FC<BookingActionsProps> = ({ booking, onEdit, onDelete, component }) => {
  const router = useRouter();

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else {
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
      console.log("Delete booking:", booking.id);
    }
  };

  return (
    <Card className="@container/card p-6">
      <div className="space-y-4">
        {component} {/* 👈 render children here */}
      </div>
    </Card>
  );
};

export default BookingActions;
