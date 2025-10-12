"use client";

import React, { useState } from "react";

import { Calendar, CheckCircle, Clock, Plus, XCircle } from "lucide-react";
// eslint-disable-next-line no-duplicate-imports
import { Download } from 'lucide-react';

import PageFilterSection from "@/app/(main)/dashboard/bookings/_components/page-filter-section";
import PageTopSection from "@/app/(main)/dashboard/bookings/_components/page-top-section";
import { BookingStats, PageConfig } from "@/app/(main)/dashboard/bookings/types";
import { CardData, SectionCards } from "@/app/(main)/dashboard/default/_components/section-cards";


import data from "../_components/data.json"
import { DataTable } from "@/app/(main)/dashboard/default/_components/data-table";


const pageConfig: PageConfig = {
  title: "Customer Management",
  subtitle: "Manage customer profiles, booking history, and loyalty status",
  actions: [
    {
      label: "Export",
      icon: <Download className="size-4" />,
      variant: "outline",
      onClick: () => {
        console.log("Import clicked");
      },
    },
    {
      label: "Add Customer",
      icon: <Plus className="size-4" />,
      variant: "default",
      onClick: () => {
        // router.push("/dashboard/bookings/create");
      },
    },
  ],
};
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
    title: "Total Customers",
    value: bookingStats.totalBookings.value,
    percentage: bookingStats.totalBookings.change,
    subtitle: bookingStats.totalBookings.trending === "up" ? "increase" : "decrease",
    icon: <Calendar className="size-6" />,
    className: "from-primary-foreground text-primary",
  },
  {
    title: "Active This Month",
    value: bookingStats.completedBookings.value,
    percentage: bookingStats.completedBookings.change,
    subtitle: bookingStats.completedBookings.trending === "up" ? "increase" : "decrease",
    icon: <CheckCircle className="size-6" />,
    className: "from-primary-foreground text-primary",
  },
  {
    title: "VIP Members",
    value: bookingStats.pendingBookings.value,
    percentage: bookingStats.pendingBookings.change,
    subtitle: bookingStats.pendingBookings.trending === "up" ? "increase" : "decrease",
    icon: <Clock className="size-6" />,
    className: "from-primary-foreground text-primary",
  },
  {
    title: "Blocked",
    value: bookingStats.cancelledBookings.value,
    percentage: bookingStats.cancelledBookings.change,
    subtitle: bookingStats.cancelledBookings.trending === "up" ? "increase" : "decrease",
    icon: <XCircle className="text-destructive/70 size-6" />,
    className: "from-destructive/5 text-destructive/70",
  },
];
const Page = () => {
  const [status, setStatus] = useState<string>("");
  const [statusSearch, setStatusSearch] = useState<string>("");
  const [type, setType] = useState<string>("");

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />
      <div className="mx-6 rounded bg-gray-100 p-4 md:p-6">
        <SectionCards cards={bookingCards} />
      </div>
      <div className="flex flex-col gap-6 p-6">
        <PageFilterSection
          filters={[
            {
              id: "search",
              label: "Customers",
              placeholder: "Search Customers",
              options: [],
              showSearch: true,
              searchValue: statusSearch,
              onSearchChange: setStatusSearch,
            },
            {
              id: "status",
              label: "Status",
              placeholder: "Select status",
              options: [
                { value: "pending", label: "Pending" },
                { value: "done", label: "Done" },
              ],
              value: status,
              onValueChange: setStatus,
            },
            {
              id: "sort_by",
              label: "Sort By",
              placeholder: "Sort by",
              options: [
                { value: "online", label: "Online" },
                { value: "offline", label: "Offline" },
              ],
              value: type,
              onValueChange: setType,
            },
            {
              id: "location",
              label: "Location",
              placeholder: "Location",
              options: [
                { value: "online", label: "Online" },
                { value: "offline", label: "Offline" },
              ],
              value: type,
              onValueChange: setType,
            },

          ]}
        />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-8">
          <div className="lg:col-span-8">
            <DataTable  data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
