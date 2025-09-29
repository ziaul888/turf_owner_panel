"use client";
import React from "react";

import { useRouter } from "next/navigation";

import { Calendar, Clock, User, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Booking } from "../types";

interface BookingsListProps {
  bookings: Booking[];
}

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: "BK-001",
    customerName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    service: "Consultation",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "confirmed",
    notes: "First-time consultation",
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
  },
  {
    id: "BK-002",
    customerName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    service: "Treatment",
    date: "2024-01-16",
    time: "2:00 PM",
    status: "pending",
    notes: "Follow-up treatment session",
    createdAt: "2024-01-11T10:00:00Z",
    updatedAt: "2024-01-11T10:00:00Z",
  },
  {
    id: "BK-003",
    customerName: "Mike Johnson",
    email: "mike.johnson@example.com",
    service: "Follow-up",
    date: "2024-01-14",
    time: "11:30 AM",
    status: "completed",
    createdAt: "2024-01-09T15:00:00Z",
    updatedAt: "2024-01-14T12:00:00Z",
  },
  {
    id: "BK-004",
    customerName: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    service: "Consultation",
    date: "2024-01-13",
    time: "9:00 AM",
    status: "cancelled",
    notes: "Patient requested cancellation",
    createdAt: "2024-01-08T11:00:00Z",
    updatedAt: "2024-01-12T16:00:00Z",
  },
];

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

const BookingsList: React.FC<BookingsListProps> = ({ bookings = mockBookings }) => {
  const router = useRouter();

  const handleViewDetails = (bookingId: string) => {
    router.push(`/dashboard/bookings/${bookingId}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Bookings</h2>
      <div className="grid gap-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="p-4 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="text-muted-foreground size-4" />
                    <span className="font-medium">{booking.customerName}</span>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(booking.id)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="size-4" />
                    View Details
                  </Button>
                </div>

                <div className="text-muted-foreground flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span>{new Date(booking.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{booking.time}</span>
                  </div>
                  <span className="text-foreground font-medium">{booking.service}</span>
                </div>

                <div className="text-muted-foreground text-sm">
                  <span>{booking.email}</span>
                  {booking.phone && <span className="ml-4">{booking.phone}</span>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookingsList;
