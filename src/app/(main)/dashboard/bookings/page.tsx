"use client";
import React from "react";

import { Plus, Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

import { Card } from "@/components/ui/card";

import { DataTable } from "../default/_components/data-table";
import data from "../default/_components/data.json";
import { SectionCards, CardData } from "../default/_components/section-cards";

import PageTopSection from "./_components/page-top-section";
import { PageConfig, BookingStats } from "./types";

// Mock booking stats - replace with your actual data source
const bookingStats: BookingStats = {
  totalBookings: { value: "1,234", change: "-20%", trending: "down" },
  completedBookings: { value: "1,234", change: "12.5%", trending: "up" },
  pendingBookings: { value: "1,234", change: "12.5%", trending: "up" },
  cancelledBookings: { value: "1,234", change: "12.5%", trending: "up" },
};

// Convert booking stats to card data
const bookingCards: CardData[] = [
  {
    title: "Total Bookings",
    value: bookingStats.totalBookings.value,
    percentage: bookingStats.totalBookings.change,
    subtitle: bookingStats.totalBookings.trending === "up" ? "increase" : "decrease",
    icon: <Calendar className="size-4" />,
  },
  {
    title: "Completed",
    value: bookingStats.completedBookings.value,
    percentage: bookingStats.completedBookings.change,
    subtitle: bookingStats.completedBookings.trending === "up" ? "increase" : "decrease",
    icon: <CheckCircle className="size-4" />,
  },
  {
    title: "Pending",
    value: bookingStats.pendingBookings.value,
    percentage: bookingStats.pendingBookings.change,
    subtitle: bookingStats.pendingBookings.trending === "up" ? "increase" : "decrease",
    icon: <Clock className="size-4" />,
  },
  {
    title: "Cancelled",
    value: bookingStats.cancelledBookings.value,
    percentage: bookingStats.cancelledBookings.change,
    subtitle: bookingStats.cancelledBookings.trending === "up" ? "increase" : "decrease",
    icon: <XCircle className="size-4" />,
  },
];

const BookingsPage = () => {
  // Page configuration for reusable PageTopSection
  const pageConfig: PageConfig = {
    title: "Bookings",
    subtitle: "Manage your bookings and reservations",
    actions: [
      {
        label: "Import",
        icon: <Plus className="size-4" />,
        variant: "outline",
        onClick: () => {
          console.log("Import clicked");
        },
      },
      {
        label: "Add Booking",
        icon: <Plus className="size-4" />,
        variant: "default",
        onClick: () => {
          console.log("Add Booking clicked");
        },
      },
    ],
  };
  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <Card className="@container/card gap-4 px-4 shadow-xs sm:px-8">
        {/* Reusable Page Top Section */}
        <PageTopSection config={pageConfig} />
        <SectionCards cards={bookingCards} />
        {/* Data Table Section */}
        <div className="mt-6">
          <DataTable data={data} />
        </div>
      </Card>
    </div>
  );
};

export default BookingsPage;
