"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { Save, Copy, ArrowLeft, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import PageTopSection from "../../bookings/_components/page-top-section";
import { PageConfig } from "../../bookings/types";

interface BusinessHours {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

interface FieldHours {
  [key: string]: BusinessHours;
}

const daysOfWeek = [
  { id: "monday", name: "Monday" },
  { id: "tuesday", name: "Tuesday" },
  { id: "wednesday", name: "Wednesday" },
  { id: "thursday", name: "Thursday" },
  { id: "friday", name: "Friday" },
  { id: "saturday", name: "Saturday" },
  { id: "sunday", name: "Sunday" },
];

const fields = [
  { id: "field-1", name: "Sports Arena - Field 1" },
  { id: "field-2", name: "Sports Arena - Field 2" },
  { id: "premium-ground", name: "Premium Ground" },
  { id: "community-field", name: "Community Field" },
];

const BusinessHoursPage = () => {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState("field-1");
  const [fieldHours, setFieldHours] = useState<Record<string, FieldHours>>({
    "field-1": {
      monday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
      tuesday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
      wednesday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
      thursday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
      friday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
      saturday: { isOpen: true, openTime: "07:00", closeTime: "23:00" },
      sunday: { isOpen: true, openTime: "07:00", closeTime: "21:00" },
    },
  });

  const pageConfig: PageConfig = {
    title: "Business Hours Setup",
    subtitle: "Configure opening and closing hours for each field",
    actions: [
      {
        label: "Back to Calendar",
        icon: <ArrowLeft className="size-4" />,
        variant: "outline",
        onClick: () => router.push("/dashboard/slots"),
      },
      {
        label: "Save Changes",
        icon: <Save className="size-4" />,
        variant: "default",
        onClick: () => {
          console.log("Saving business hours:", fieldHours);
          // Here you would save to your API
        },
      },
    ],
  };

  const updateFieldHours = (field: string, day: string, updates: Partial<BusinessHours>) => {
    setFieldHours((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [day]: {
          ...prev[field]?.[day],
          ...updates,
        },
      },
    }));
  };

  const copyToAllDays = (sourceDay: string) => {
    const sourceHours = fieldHours[selectedField]?.[sourceDay];
    if (!sourceHours) return;

    const updatedHours = { ...fieldHours[selectedField] };
    daysOfWeek.forEach((day) => {
      updatedHours[day.id] = { ...sourceHours };
    });

    setFieldHours((prev) => ({
      ...prev,
      [selectedField]: updatedHours,
    }));
  };

  const copyToWeekdays = (sourceDay: string) => {
    const sourceHours = fieldHours[selectedField]?.[sourceDay];
    if (!sourceHours) return;

    const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    const updatedHours = { ...fieldHours[selectedField] };

    weekdays.forEach((day) => {
      updatedHours[day] = { ...sourceHours };
    });

    setFieldHours((prev) => ({
      ...prev,
      [selectedField]: updatedHours,
    }));
  };

  const copyToWeekends = (sourceDay: string) => {
    const sourceHours = fieldHours[selectedField]?.[sourceDay];
    if (!sourceHours) return;

    const weekends = ["saturday", "sunday"];
    const updatedHours = { ...fieldHours[selectedField] };

    weekends.forEach((day) => {
      updatedHours[day] = { ...sourceHours };
    });

    setFieldHours((prev) => ({
      ...prev,
      [selectedField]: updatedHours,
    }));
  };

  const getCurrentFieldHours = () => {
    return fieldHours[selectedField] || {};
  };

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />

      <div className="flex flex-col gap-6 p-6">
        {/* Field Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="size-5" />
              Select Field
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Choose a field" />
              </SelectTrigger>
              <SelectContent>
                {fields.map((field) => (
                  <SelectItem key={field.id} value={field.id}>
                    {field.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Business Hours Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Business Hours - {fields.find((f) => f.id === selectedField)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {daysOfWeek.map((day) => {
              const dayHours = getCurrentFieldHours()[day.id] || {
                isOpen: false,
                openTime: "09:00",
                closeTime: "18:00",
              };

              return (
                <div key={day.id} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="w-24">
                    <Label className="font-medium">{day.name}</Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={dayHours.isOpen}
                      onCheckedChange={(checked) => updateFieldHours(selectedField, day.id, { isOpen: checked })}
                    />
                    <Label className="text-sm">Open</Label>
                  </div>

                  {dayHours.isOpen && (
                    <>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">From:</Label>
                        <Input
                          type="time"
                          value={dayHours.openTime}
                          onChange={(e) => updateFieldHours(selectedField, day.id, { openTime: e.target.value })}
                          className="w-32"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Label className="text-sm">To:</Label>
                        <Input
                          type="time"
                          value={dayHours.closeTime}
                          onChange={(e) => updateFieldHours(selectedField, day.id, { closeTime: e.target.value })}
                          className="w-32"
                        />
                      </div>
                    </>
                  )}

                  <div className="ml-auto flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => copyToAllDays(day.id)} className="text-xs">
                      <Copy className="mr-1 size-3" />
                      All Days
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => copyToWeekdays(day.id)} className="text-xs">
                      <Copy className="mr-1 size-3" />
                      Weekdays
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => copyToWeekends(day.id)} className="text-xs">
                      <Copy className="mr-1 size-3" />
                      Weekends
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Quick Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Button
                variant="outline"
                className="flex h-auto flex-col items-start p-4"
                onClick={() => {
                  const template = {
                    monday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                    tuesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                    wednesday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                    thursday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                    friday: { isOpen: true, openTime: "09:00", closeTime: "18:00" },
                    saturday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
                    sunday: { isOpen: false, openTime: "09:00", closeTime: "18:00" },
                  };
                  setFieldHours((prev) => ({ ...prev, [selectedField]: template }));
                }}
              >
                <div className="font-medium">Weekdays Only</div>
                <div className="text-sm text-gray-600">Mon-Fri: 9 AM - 6 PM</div>
              </Button>

              <Button
                variant="outline"
                className="flex h-auto flex-col items-start p-4"
                onClick={() => {
                  const template = {
                    monday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
                    tuesday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
                    wednesday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
                    thursday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
                    friday: { isOpen: true, openTime: "06:00", closeTime: "22:00" },
                    saturday: { isOpen: true, openTime: "07:00", closeTime: "23:00" },
                    sunday: { isOpen: true, openTime: "07:00", closeTime: "21:00" },
                  };
                  setFieldHours((prev) => ({ ...prev, [selectedField]: template }));
                }}
              >
                <div className="font-medium">Extended Hours</div>
                <div className="text-sm text-gray-600">Early morning to late night</div>
              </Button>

              <Button
                variant="outline"
                className="flex h-auto flex-col items-start p-4"
                onClick={() => {
                  const template = {
                    monday: { isOpen: true, openTime: "10:00", closeTime: "20:00" },
                    tuesday: { isOpen: true, openTime: "10:00", closeTime: "20:00" },
                    wednesday: { isOpen: true, openTime: "10:00", closeTime: "20:00" },
                    thursday: { isOpen: true, openTime: "10:00", closeTime: "20:00" },
                    friday: { isOpen: true, openTime: "10:00", closeTime: "20:00" },
                    saturday: { isOpen: true, openTime: "09:00", closeTime: "21:00" },
                    sunday: { isOpen: true, openTime: "09:00", closeTime: "19:00" },
                  };
                  setFieldHours((prev) => ({ ...prev, [selectedField]: template }));
                }}
              >
                <div className="font-medium">Standard Hours</div>
                <div className="text-sm text-gray-600">Regular business hours</div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessHoursPage;
