"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Calendar, Clock, DollarSign, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionCards, CardData } from "../default/_components/section-cards";
import PageFilterSection from "../bookings/_components/page-filter-section";
import PageTopSection from "../bookings/_components/page-top-section";
import { PageConfig } from "../bookings/types";
import { ScheduleCard } from "./_components/schedule-card";
import {
  getCategoryColor,
  getStatusColor,
  formatTime,
  formatDate,
  filterSchedules,
  sortSchedules,
} from "./_components/schedule-utils";

// Mock schedules data
const mockSchedules = [
  {
    id: "SCH-001",
    venue: "Sports Arena - Field 1",
    dayOfWeek: "Monday",
    startTime: "06:00",
    endTime: "08:00",
    basePrice: 800,
    peakMultiplier: 1.0,
    finalPrice: 800,
    status: "active",
    maxBookings: 4,
    currentBookings: 1,
    category: "early-morning",
    createdAt: "2024-12-20",
    isRecurring: true,
    recurringWeeks: 12,
  },
  {
    id: "SCH-002",
    venue: "Sports Arena - Field 1",
    dayOfWeek: "Monday",
    startTime: "08:00",
    endTime: "10:00",
    basePrice: 1000,
    peakMultiplier: 1.2,
    finalPrice: 1200,
    status: "active",
    maxBookings: 4,
    currentBookings: 3,
    category: "morning-peak",
    createdAt: "2024-12-20",
    isRecurring: true,
    recurringWeeks: 12,
  },
  {
    id: "SCH-003",
    venue: "Sports Arena - Field 1",
    dayOfWeek: "Monday",
    startTime: "18:00",
    endTime: "20:00",
    basePrice: 1200,
    peakMultiplier: 1.5,
    finalPrice: 1800,
    status: "active",
    maxBookings: 4,
    currentBookings: 4,
    category: "evening-peak",
    createdAt: "2024-12-20",
    isRecurring: true,
    recurringWeeks: 12,
  },
  {
    id: "SCH-004",
    venue: "Premium Ground",
    dayOfWeek: "Saturday",
    startTime: "16:00",
    endTime: "18:00",
    basePrice: 1500,
    peakMultiplier: 2.0,
    finalPrice: 3000,
    status: "active",
    maxBookings: 2,
    currentBookings: 2,
    category: "weekend-premium",
    createdAt: "2024-12-19",
    isRecurring: false,
    recurringWeeks: 0,
  },
  {
    id: "SCH-005",
    venue: "Community Field",
    dayOfWeek: "Tuesday",
    startTime: "14:00",
    endTime: "16:00",
    basePrice: 600,
    peakMultiplier: 1.0,
    finalPrice: 600,
    status: "active",
    maxBookings: 6,
    currentBookings: 2,
    category: "off-peak",
    createdAt: "2024-12-18",
    isRecurring: true,
    recurringWeeks: 8,
  },
  {
    id: "SCH-006",
    venue: "Tennis Court 1",
    dayOfWeek: "Wednesday",
    startTime: "10:00",
    endTime: "12:00",
    basePrice: 800,
    peakMultiplier: 1.1,
    finalPrice: 880,
    status: "inactive",
    maxBookings: 4,
    currentBookings: 0,
    category: "morning",
    createdAt: "2024-12-17",
    isRecurring: false,
    recurringWeeks: 0,
  },
];

// Mock schedule stats
const scheduleStats = {
  totalSchedules: { value: "24", change: "+6", trending: "up" as const },
  activeSchedules: { value: "20", change: "+4", trending: "up" as const },
  avgPrice: { value: "₹1,213", change: "+8%", trending: "up" as const },
  weeklyRevenue: { value: "₹48,520", change: "+15%", trending: "up" as const },
};

// Convert schedule stats to card data
const scheduleCards: CardData[] = [
  {
    title: "Total Schedules",
    value: scheduleStats.totalSchedules.value,
    percentage: scheduleStats.totalSchedules.change,
    subtitle: "time slots",
    icon: <Clock className="size-6" />,
    className: "from-primary-foreground text-primary",
  },
  {
    title: "Active Schedules",
    value: scheduleStats.activeSchedules.value,
    percentage: scheduleStats.activeSchedules.change,
    subtitle: "currently active",
    icon: <Calendar className="size-6" />,
    className: "from-blue-50 text-blue-600",
  },
  {
    title: "Average Price",
    value: scheduleStats.avgPrice.value,
    percentage: scheduleStats.avgPrice.change,
    subtitle: "per time slot",
    icon: <DollarSign className="size-6" />,
    className: "from-green-50 text-green-600",
  },
  {
    title: "Weekly Revenue",
    value: scheduleStats.weeklyRevenue.value,
    percentage: scheduleStats.weeklyRevenue.change,
    subtitle: "potential earnings",
    icon: <TrendingUp className="size-6" />,
    className: "from-purple-50 text-purple-600",
  },
];

const SchedulePage = () => {
  const router = useRouter();

  // Filter states
  const [venue, setVenue] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  // Page configuration
  const pageConfig: PageConfig = {
    title: "Schedule Management",
    subtitle: "Manage time slots and pricing for your venues",
    actions: [
      {
        label: "Create Schedule",
        icon: <Plus className="size-4" />,
        variant: "default",
        onClick: () => {
          router.push("/dashboard/schedule/create");
        },
      },
    ],
  };

  // Filter and sort schedules
  const filteredSchedules = filterSchedules(mockSchedules, venue, day, status);
  const sortedSchedules = sortSchedules(filteredSchedules);

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />

      {/* Stats Cards */}
      <div className="mx-6 rounded bg-gray-100 p-4 md:p-6">
        <SectionCards cards={scheduleCards} />
      </div>

      <div className="flex flex-col gap-6 p-6">
        {/* Filters */}
        <PageFilterSection
          filters={[
            {
              id: "venue",
              label: "Venue",
              placeholder: "All venues",
              options: [
                { value: "sports-arena", label: "Sports Arena" },
                { value: "premium-ground", label: "Premium Ground" },
                { value: "community-field", label: "Community Field" },
                { value: "tennis-court", label: "Tennis Court" },
              ],
              value: venue,
              onValueChange: setVenue,
            },
            {
              id: "day",
              label: "Day",
              placeholder: "All days",
              options: [
                { value: "Monday", label: "Monday" },
                { value: "Tuesday", label: "Tuesday" },
                { value: "Wednesday", label: "Wednesday" },
                { value: "Thursday", label: "Thursday" },
                { value: "Friday", label: "Friday" },
                { value: "Saturday", label: "Saturday" },
                { value: "Sunday", label: "Sunday" },
              ],
              value: day,
              onValueChange: setDay,
            },
            {
              id: "status",
              label: "Status",
              placeholder: "All statuses",
              options: [
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "paused", label: "Paused" },
              ],
              value: status,
              onValueChange: setStatus,
            },
          ]}
        />

        {/* Schedules List */}
        <div className="space-y-4">
          {sortedSchedules.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="mb-4 size-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">No schedules found</h3>
                <p className="mb-4 text-center text-gray-600">
                  Create time slot schedules to start managing your venue availability and pricing.
                </p>
                <Button onClick={() => router.push("/dashboard/schedule/create")}>
                  <Plus className="mr-2 size-4" />
                  Create Schedule
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {sortedSchedules.map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  schedule={schedule}
                  getCategoryColor={getCategoryColor}
                  getStatusColor={getStatusColor}
                  formatTime={formatTime}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
