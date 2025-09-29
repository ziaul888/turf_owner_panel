import React from "react";

import { Calendar, Clock, Mail, Phone, User, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { Booking } from "../types";

interface BookingInformationProps {
  booking: Booking;
}

const getStatusColor = (status: Booking["status"]) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const BookingInformation: React.FC<BookingInformationProps> = ({ booking }) => {
  return (
    <Card className="@container/card p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Booking Status</h3>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Booking Date</p>
              <p className="font-medium">December 20, 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Time Stol</p>
              <p className="font-medium">6:00 PM - 7:00 PM</p>
            </div>
          </div>

          {/* <div className="flex items-center gap-3">
                        <Calendar className="size-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">{booking.date}</p>
                        </div>
                    </div> */}

          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Duration</p>
              <p className="font-medium">1 Hour</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Created On</p>
              <p className="font-medium">Dec 18,2025</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingInformation;
