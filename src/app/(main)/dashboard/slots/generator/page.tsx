"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Zap, Calendar, Clock } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import PageTopSection from "../../bookings/_components/page-top-section";
import { PageConfig } from "../../bookings/types";

const slotGeneratorSchema = z.object({
  field: z.string().min(1, "Please select a field"),
  duration: z.string().min(1, "Please select slot duration"),
  customDuration: z.string().optional(),
  startDate: z.string().min(1, "Please select start date"),
  endDate: z.string().min(1, "Please select end date"),
  selectedDays: z.array(z.string()).min(1, "Please select at least one day"),
  startTime: z.string().min(1, "Please select start time"),
  endTime: z.string().min(1, "Please select end time"),
  basePrice: z.string().min(1, "Please enter base price"),
});

type SlotGeneratorForm = z.infer<typeof slotGeneratorSchema>;

const fields = [
  { id: "field-1", name: "Sports Arena - Field 1" },
  { id: "field-2", name: "Sports Arena - Field 2" },
  { id: "premium-ground", name: "Premium Ground" },
  { id: "community-field", name: "Community Field" },
];

const daysOfWeek = [
  { id: "monday", name: "Monday", short: "Mon" },
  { id: "tuesday", name: "Tuesday", short: "Tue" },
  { id: "wednesday", name: "Wednesday", short: "Wed" },
  { id: "thursday", name: "Thursday", short: "Thu" },
  { id: "friday", name: "Friday", short: "Fri" },
  { id: "saturday", name: "Saturday", short: "Sat" },
  { id: "sunday", name: "Sunday", short: "Sun" },
];

const durationOptions = [
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
  { value: "custom", label: "Custom duration" },
];

const SlotGeneratorPage = () => {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewSlots, setPreviewSlots] = useState<any[]>([]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<SlotGeneratorForm>({
    resolver: zodResolver(slotGeneratorSchema),
    defaultValues: {
      field: "",
      duration: "60",
      customDuration: "",
      startDate: "",
      endDate: "",
      selectedDays: [],
      startTime: "09:00",
      endTime: "18:00",
      basePrice: "1000",
    },
    mode: "onChange",
  });

  const watchedValues = watch();

  const pageConfig: PageConfig = {
    title: "Slot Generator",
    subtitle: "Auto-generate time slots for your fields",
    actions: [
      {
        label: "Back to Calendar",
        icon: <ArrowLeft className="size-4" />,
        variant: "outline",
        onClick: () => router.push("/dashboard/slots"),
      },
      {
        label: "Generate Slots",
        icon: <Zap className="size-4" />,
        variant: "default",
        onClick: handleSubmit(onSubmit),
        disabled: !isValid || isGenerating,
      },
    ],
  };

  async function onSubmit(data: SlotGeneratorForm) {
    setIsGenerating(true);
    try {
      console.log("Generating slots:", data);

      // Generate preview slots
      const slots = generateSlotPreview(data);
      setPreviewSlots(slots);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`Generated ${slots.length} slots successfully`);
    } catch (error) {
      console.error("Error generating slots:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  const generateSlotPreview = (data: SlotGeneratorForm) => {
    const slots = [];
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const duration = data.duration === "custom" ? parseInt(data.customDuration ?? "60") : parseInt(data.duration);

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

      if (data.selectedDays.includes(dayName)) {
        const startTime = new Date(`2000-01-01T${data.startTime}`);
        const endTime = new Date(`2000-01-01T${data.endTime}`);

        let currentSlotTime = new Date(startTime);
        while (currentSlotTime < endTime) {
          const slotEndTime = new Date(currentSlotTime.getTime() + duration * 60000);
          if (slotEndTime <= endTime) {
            slots.push({
              date: currentDate.toISOString().split("T")[0],
              startTime: currentSlotTime.toTimeString().slice(0, 5),
              endTime: slotEndTime.toTimeString().slice(0, 5),
              price: parseInt(data.basePrice),
              field: data.field,
            });
          }
          currentSlotTime = slotEndTime;
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return slots;
  };

  const handleDayToggle = (dayId: string, checked: boolean) => {
    const currentDays = watchedValues.selectedDays || [];
    if (checked) {
      setValue("selectedDays", [...currentDays, dayId]);
    } else {
      setValue(
        "selectedDays",
        currentDays.filter((d) => d !== dayId),
      );
    }
  };

  const selectWeekdays = () => {
    const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    setValue("selectedDays", weekdays);
  };

  const selectWeekends = () => {
    const weekends = ["saturday", "sunday"];
    setValue("selectedDays", weekends);
  };

  const selectAllDays = () => {
    const allDays = daysOfWeek.map((d) => d.id);
    setValue("selectedDays", allDays);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />

      <div className="flex flex-col gap-6 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Field Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Field Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Field *</Label>
                <Controller
                  name="field"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={errors.field ? "border-red-500" : ""}>
                        <SelectValue placeholder="Choose a field" />
                      </SelectTrigger>
                      <SelectContent>
                        {fields.map((fieldOption) => (
                          <SelectItem key={fieldOption.id} value={fieldOption.id}>
                            {fieldOption.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.field && <p className="mt-1 text-sm text-red-600">{errors.field.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Slot Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5" />
                Slot Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>Slot Duration *</Label>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {durationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {watchedValues.duration === "custom" && (
                  <div>
                    <Label>Custom Duration (minutes) *</Label>
                    <Controller
                      name="customDuration"
                      control={control}
                      render={({ field }) => <Input {...field} type="number" min="15" max="480" placeholder="60" />}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label>Start Time *</Label>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="time" className={errors.startTime ? "border-red-500" : ""} />
                    )}
                  />
                </div>

                <div>
                  <Label>End Time *</Label>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} type="time" className={errors.endTime ? "border-red-500" : ""} />
                    )}
                  />
                </div>

                <div>
                  <Label>Base Price (₹) *</Label>
                  <Controller
                    name="basePrice"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        placeholder="1000"
                        className={errors.basePrice ? "border-red-500" : ""}
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Range */}
          <Card>
            <CardHeader>
              <CardTitle>Date Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>Start Date *</Label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className={errors.startDate ? "border-red-500" : ""}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label>End Date *</Label>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="date"
                        min={watchedValues.startDate || new Date().toISOString().split("T")[0]}
                        className={errors.endDate ? "border-red-500" : ""}
                      />
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Days Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Days</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4 flex gap-2">
                <Button type="button" size="sm" variant="outline" onClick={selectWeekdays}>
                  Weekdays
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={selectWeekends}>
                  Weekends
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={selectAllDays}>
                  All Days
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={day.id}
                      checked={watchedValues.selectedDays?.includes(day.id) || false}
                      onCheckedChange={(checked) => handleDayToggle(day.id, checked as boolean)}
                    />
                    <Label htmlFor={day.id} className="text-sm font-medium">
                      {day.short}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.selectedDays && <p className="text-sm text-red-600">{errors.selectedDays.message}</p>}
            </CardContent>
          </Card>

          {/* Preview */}
          {previewSlots.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Slots Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Total slots to be created: <span className="font-semibold">{previewSlots.length}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Estimated revenue:{" "}
                    <span className="font-semibold">
                      ₹{previewSlots.reduce((sum, slot) => sum + slot.price, 0).toLocaleString()}
                    </span>
                  </p>

                  <div className="mt-4 max-h-40 overflow-y-auto rounded border p-2">
                    {previewSlots.slice(0, 10).map((slot, index) => (
                      <div key={index} className="py-1 text-xs text-gray-600">
                        {slot.date} | {formatTime(slot.startTime)} - {formatTime(slot.endTime)} | ₹{slot.price}
                      </div>
                    ))}
                    {previewSlots.length > 10 && (
                      <div className="py-1 text-xs text-gray-500">... and {previewSlots.length - 10} more slots</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
};

export default SlotGeneratorPage;
