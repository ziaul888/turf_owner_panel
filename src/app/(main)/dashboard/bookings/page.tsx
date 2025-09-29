"use client";
import React from "react";

import { Plus, Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

import { Card } from "@/components/ui/card";

import { SectionCards, CardData } from "../default/_components/section-cards";

import BookingsList from "./_components/bookings-list";
import PageFilterSection from "./_components/page-filter-section";
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
    icon: <Calendar className="size-6" />,
    className: "from-primary-foreground text-primary",
  },
  {
    title: "Completed",
    value: bookingStats.completedBookings.value,
    percentage: bookingStats.completedBookings.change,
    subtitle: bookingStats.completedBookings.trending === "up" ? "increase" : "decrease",
    icon: <CheckCircle className="size-6" />,
    className: "from-primary-foreground text-primary",
  },
  {
    title: "Pending",
    value: bookingStats.pendingBookings.value,
    percentage: bookingStats.pendingBookings.change,
    subtitle: bookingStats.pendingBookings.trending === "up" ? "increase" : "decrease",
    icon: <Clock className="size-6" />,
    className: "from-primary-foreground text-primary",
  },
  {
    title: "Cancelled",
    value: bookingStats.cancelledBookings.value,
    percentage: bookingStats.cancelledBookings.change,
    subtitle: bookingStats.cancelledBookings.trending === "up" ? "increase" : "decrease",
    icon: <XCircle className="size-6" />,
    className: "from-primary-foreground text-primary",
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
      {/* Reusable Page Top Section */}
      <PageTopSection config={pageConfig} />
      <div className="rounded bg-gray-100 p-4 md:p-6">
        <SectionCards cards={bookingCards} />
      </div>
      <div className="p-6">
        <PageFilterSection
          filters={[
            {
              id: "status",
              label: "Status",
              placeholder: "Select status",
              options: [
                { value: "all", label: "All Bookings" },
                { value: "pending", label: "Pending" },
                { value: "confirmed", label: "Confirmed" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ],
            },
            {
              id: "date-range",
              label: "Date Range",
              placeholder: "Select date range",
              options: [
                { value: "today", label: "Today" },
                { value: "week", label: "This Week" },
                { value: "month", label: "This Month" },
                { value: "quarter", label: "This Quarter" },
                { value: "year", label: "This Year" },
              ],
            },
            {
              id: "service",
              label: "Service",
              placeholder: "Select service",
              options: [
                { value: "all", label: "All Services" },
                { value: "consultation", label: "Consultation" },
                { value: "treatment", label: "Treatment" },
                { value: "follow-up", label: "Follow-up" },
              ],
            },
          ]}
        />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
          <div className="lg:col-span-8">
            <BookingsList />
          </div>
        </div>
      </div>
      {/* Bookings List - 8 column grid */}
    </div>
  );
};

export default BookingsPage;
