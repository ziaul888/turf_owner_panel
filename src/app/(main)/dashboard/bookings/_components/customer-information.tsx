import React from "react";

import { Calendar, Clock, Mail, Phone, User, FileText } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { users } from "@/data/users";
import { getInitials } from "@/lib/utils";

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

const CustomerInformation: React.FC<BookingInformationProps> = ({ booking }) => {
  return (
    <Card className="@container/card p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Customer Details</h3>
          {/* <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge> */}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Avatar className="size-9 cursor-pointer rounded-lg">
              <AvatarImage src={users[0].avatar || undefined} alt={users[0].name} />
              <AvatarFallback className="rounded-lg">{getInitials(users[0].name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-muted-foreground text-sm">Full Name</p>
              <p className="font-medium">Bappy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="font-medium">eample@gmail.com</p>
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
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="font-medium">01676217559</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Member Since</p>
              <p className="font-medium">March 2023</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerInformation;
