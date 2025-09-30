"use client";
import React from "react";

import { useParams } from "next/navigation";

import { Ban, Check, Plus } from "lucide-react";

import { AdditionalServices } from "../_components/additional-services";
import BookingActions from "../_components/booking-actions";
import BookingActionsButton from "../_components/booking-actions-button";
import BookingInformation from "../_components/booking-information";
import CustomerInformation from "../_components/customer-information";
import PageTopSection from "../_components/page-top-section";
import PaymentDetails from "../_components/payment-details";
import PaymentSummary from "../_components/payment-surmmary";
import { Booking, PageConfig } from "../types";

// Mock booking data - replace with your actual data fetching
const mockBooking: Booking = {
  id: "BK-001",
  customerName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  service: "Consultation",
  date: "2024-01-15",
  time: "10:00 AM",
  status: "confirmed",
  notes: "First-time consultation. Patient has concerns about recent symptoms.",
  createdAt: "2024-01-10T09:00:00Z",
  updatedAt: "2024-01-12T14:30:00Z",
};

// Mock additional services data
const mockAdditionalServices = [
  {
    id: "1",
    name: "Equipment Rental",
    price: 200,
    description: "Professional equipment rental for the session",
  },
  {
    id: "2",
    name: "Refreshments",
    price: 150,
    description: "Catering and refreshments for participants",
  },
  {
    id: "3",
    name: "Coaching Session",
    price: 300,
    description: "One-on-one coaching session",
  },
  {
    id: "4",
    name: "Photography",
    price: 250,
    description: "Professional photography services",
  },
];
const pageConfig: PageConfig = {
  title: "Bookings Details",
  subtitle: "Manage your bookings and reservations",
  actions: [
    {
      label: "Approve booking",
      icon: <Check className="size-4" />,
      variant: "default",
      onClick: () => {
        console.log("Import clicked");
      },
    },
    {
      label: "Canncel bookng",
      icon: <Ban className="size-4" />,
      variant: "destructive",
      onClick: () => {
        console.log("Add Booking clicked");
      },
    },
  ],
};

const BookingDetailsPage = () => {
  const params = useParams();
  const bookingId = params.id as string;

  // In a real app, you'd fetch the booking data based on the ID
  const booking = mockBooking;

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />
      {/* Grid layout: 8 columns for main content, 4 columns for sidebar */}
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main booking details - 8 columns */}
          <div className="space-y-4 lg:col-span-8">
            <BookingInformation booking={booking} />
            <CustomerInformation booking={booking} title="Customer Details" />
            <CustomerInformation booking={booking} title="Veune Details" />
            <AdditionalServices services={mockAdditionalServices} readonly={true} />
          </div>

          {/* Sidebar actions - 4 columns */}
          <div className="space-y-4 lg:col-span-4">
            <BookingActions booking={booking} component={<PaymentSummary booking={booking} />} />
            <BookingActions booking={booking} component={<PaymentDetails booking={booking} />} />
            <BookingActions booking={booking} component={<BookingActionsButton />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
