"use client";

import React, { useState } from "react";

import { Calendar, CheckCircle, Clock, Plus, XCircle, Grid3X3, List } from "lucide-react";
// eslint-disable-next-line no-duplicate-imports
import { Download } from 'lucide-react';

import PageFilterSection from "@/app/(main)/dashboard/bookings/_components/page-filter-section";
import PageTopSection from "@/app/(main)/dashboard/bookings/_components/page-top-section";
import { BookingStats, PageConfig } from "@/app/(main)/dashboard/bookings/types";
import { CardData, SectionCards } from "@/app/(main)/dashboard/default/_components/section-cards";


import data from "../_components/data.json"
import { CustomerDataTable } from "../_components/customer-data-table";
import { AddCustomerSheet } from "../_components/add-customer-sheet";
import { CustomerGridView } from "../_components/customer-grid-view";
import { Button } from "@/components/ui/button";



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
  const [customers, setCustomers] = useState(data);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const handleCustomerAdded = (newCustomer: any) => {
    setCustomers(prev => [newCustomer, ...prev]);
  };

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
        onClick: () => setIsAddCustomerOpen(true),
      },
    ],
  };

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />
      <div className="mx-6 rounded bg-gray-100 p-4 md:p-6">
        <SectionCards cards={bookingCards} />
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
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
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          {viewMode === "table" ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
              <div className="lg:col-span-8">
                <CustomerDataTable data={customers} />
              </div>
            </div>
          ) : (
            <CustomerGridView customers={customers} />
          )}
        </div>
      </div>

      {/* Add Customer Sheet */}
      <AddCustomerSheet
        isOpen={isAddCustomerOpen}
        onOpenChange={setIsAddCustomerOpen}
        onCustomerAdded={handleCustomerAdded}
      />
    </div>
  );
};

export default Page;
