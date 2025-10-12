"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Plus, Calendar, Clock, Settings, ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import PageTopSection from "../bookings/_components/page-top-section";
import { PageConfig } from "../bookings/types";
import { SectionCards, CardData } from "../default/_components/section-cards";

// Mock slot data
const mockSlots = [
  {
    id: "slot-1",
    fieldId: "field-1",
    fieldName: "Sports Arena - Field 1",
    date: "2024-12-25",
    startTime: "09:00",
    endTime: "10:00",
    status: "available", // available, booked, unavailable
    price: 1200,
    bookingId: null,
    reason: null,
  },
  {
    id: "slot-2",
    fieldId: "field-1",
    fieldName: "Sports Arena - Field 1",
    date: "2024-12-25",
    startTime: "10:00",
    endTime: "11:00",
    status: "booked",
    price: 1200,
    bookingId: "BK-001",
    reason: null,
  },
  {
    id: "slot-3",
    fieldId: "field-1",
    fieldName: "Sports Arena - Field 1",
    date: "2024-12-25",
    startTime: "11:00",
    endTime: "12:00",
    status: "unavailable",
    price: 1200,
    bookingId: null,
    reason: "Maintenance",
  },
  {
    id: "slot-4",
    fieldId: "field-1",
    fieldName: "Sports Arena - Field 1",
    date: "2024-12-25",
    startTime: "14:00",
    endTime: "15:00",
    status: "available",
    price: 1500,
    bookingId: null,
    reason: null,
  },
];

// Mock stats
const slotStats = {
  totalSlots: { value: "156", change: "+12", trending: "up" as const },
  availableSlots: { value: "89", change: "+8", trending: "up" as const },
  bookedSlots: { value: "52", change: "+15", trending: "up" as const },
  revenue: { value: "₹78,400", change: "+22%", trending: "up" as const },
};

const slotCards: CardData[] = [
  {
    title: "Total Slots",
    value: slotStats.totalSlots.value,
    percentage: slotStats.totalSlots.change,
    subtitle: "this week",
    icon: <Clock className="size-6" />,
    className: "from-primary-foreground text-primary",
  },
  {
    title: "Available",
    value: slotStats.availableSlots.value,
    percentage: slotStats.availableSlots.change,
    subtitle: "open slots",
    icon: <Calendar className="size-6" />,
    className: "from-green-50 text-green-600",
  },
  {
    title: "Booked",
    value: slotStats.bookedSlots.value,
    percentage: slotStats.bookedSlots.change,
    subtitle: "confirmed",
    icon: <Calendar className="size-6" />,
    className: "from-blue-50 text-blue-600",
  },
  {
    title: "Revenue",
    value: slotStats.revenue.value,
    percentage: slotStats.revenue.change,
    subtitle: "this week",
    icon: <Calendar className="size-6" />,
    className: "from-purple-50 text-purple-600",
  },
];

const SlotsPage = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("day");
  const [currentDate, setCurrentDate] = useState(new Date());

  const pageConfig: PageConfig = {
    title: "Slot Calendar",
    subtitle: "Manage your field slots and availability",
    actions: [
      {
        label: "Settings",
        icon: <Settings className="size-4" />,
        variant: "outline",
        onClick: () => router.push("/dashboard/slots/business-hours"),
      },
      {
        label: "Generate Slots",
        icon: <Plus className="size-4" />,
        variant: "default",
        onClick: () => router.push("/dashboard/slots/generator"),
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "booked":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "unavailable":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return "🟢";
      case "booked":
        return "🟡";
      case "unavailable":
        return "🔴";
      default:
        return "⚪";
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const handleSlotClick = (slot: any) => {
    if (slot.status === "available") {
      // Open booking modal or navigate to booking creation
      console.log("Create booking for slot:", slot.id);
    } else if (slot.status === "booked") {
      // Navigate to booking details
      console.log("View booking:", slot.bookingId);
    } else {
      // Edit unavailable slot
      console.log("Edit unavailable slot:", slot.id);
    }
  };

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />

      {/* Stats Cards */}
      <div className="mx-6 rounded bg-gray-100 p-4 md:p-6">
        <SectionCards cards={slotCards} />
      </div>

      <div className="flex flex-col gap-6 p-6">
        {/* Calendar Controls */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                  <ChevronLeft className="size-4" />
                </Button>
                <h2 className="text-lg font-semibold">{formatDate(currentDate)}</h2>
                <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                  <ChevronRight className="size-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                {(["day", "week", "month"] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className="capitalize"
                  >
                    {mode}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Legend */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-lg">🟢</span>
                <span className="text-sm font-medium">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🟡</span>
                <span className="text-sm font-medium">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔴</span>
                <span className="text-sm font-medium">Unavailable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Slots Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Slots - Sports Arena Field 1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
              {mockSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`cursor-pointer rounded-lg border-2 p-3 transition-all hover:shadow-md ${getStatusColor(slot.status)} `}
                  onClick={() => handleSlotClick(slot)}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-lg">{getStatusIcon(slot.status)}</span>
                    <Badge variant="outline" className="text-xs">
                      ₹{slot.price}
                    </Badge>
                  </div>

                  <div className="mb-1 text-sm font-medium">
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </div>

                  <div className="text-xs text-gray-600 capitalize">{slot.status}</div>

                  {slot.reason && <div className="mt-1 text-xs text-gray-500 italic">{slot.reason}</div>}

                  {slot.bookingId && <div className="mt-1 text-xs text-blue-600">{slot.bookingId}</div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => router.push("/dashboard/slots/business-hours")}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Clock className="size-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-sm text-gray-600">Set opening & closing times</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => router.push("/dashboard/slots/generator")}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Plus className="size-8 text-green-600" />
                <div>
                  <h3 className="font-semibold">Generate Slots</h3>
                  <p className="text-sm text-gray-600">Auto-create time slots</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => router.push("/dashboard/slots/pricing")}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Settings className="size-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Dynamic Pricing</h3>
                  <p className="text-sm text-gray-600">Set peak & off-peak rates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SlotsPage;
