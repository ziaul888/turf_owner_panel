"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Ban, Clock, Users, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import PageTopSection from "../../bookings/_components/page-top-section";
import { PageConfig } from "../../bookings/types";
import { ScheduleSummary } from "../_components/schedule-summary";
// Constants
const venues = [
  { id: "court-1", name: "Court 1", capacity: 4 },
  { id: "court-2", name: "Court 2", capacity: 6 },
  { id: "court-3", name: "Court 3", capacity: 8 },
  { id: "court-4", name: "Court 4", capacity: 4 },
];

const priceCategories = [
  {
    id: "standard",
    name: "Standard",
    description: "Regular pricing for weekdays",
  },
  {
    id: "peak",
    name: "Peak Hours",
    description: "Higher pricing for evenings and weekends",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Premium pricing for special events",
  },
];

const daysOfWeek = [
  { id: "monday", name: "Monday" },
  { id: "tuesday", name: "Tuesday" },
  { id: "wednesday", name: "Wednesday" },
  { id: "thursday", name: "Thursday" },
  { id: "friday", name: "Friday" },
  { id: "saturday", name: "Saturday" },
  { id: "sunday", name: "Sunday" },
];

const recurringWeeksOptions = [
  { id: "1", name: "1 week" },
  { id: "2", name: "2 weeks" },
  { id: "4", name: "4 weeks" },
  { id: "8", name: "8 weeks" },
  { id: "12", name: "12 weeks" },
];

// Zod validation schema for schedule creation
const createScheduleSchema = z
  .object({
    venue: z.string().min(1, "Please select a venue"),
    dayOfWeek: z.string().min(1, "Please select a day of the week"),
    startTime: z
      .string()
      .min(1, "Please select start time")
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time"),
    endTime: z
      .string()
      .min(1, "Please select end time")
      .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time"),
    basePrice: z
      .string()
      .min(1, "Please enter base price")
      .refine((val) => {
        const num = parseFloat(val);
        return num > 0 && num <= 10000;
      }, "Base price must be between ₹1 and ₹10,000"),
    peakMultiplier: z
      .string()
      .min(1, "Please enter peak multiplier")
      .refine((val) => {
        const num = parseFloat(val);
        return num >= 1.0 && num <= 5.0;
      }, "Peak multiplier must be between 1.0 and 5.0"),
    maxBookings: z
      .string()
      .min(1, "Please enter maximum bookings")
      .refine((val) => {
        const num = parseInt(val);
        return num > 0 && num <= 20;
      }, "Maximum bookings must be between 1 and 20"),
    category: z.string().min(1, "Please select a price category"),
    isRecurring: z.boolean(),
    recurringWeeks: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(`2000-01-01T${data.startTime}`);
      const end = new Date(`2000-01-01T${data.endTime}`);
      return end > start;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    },
  );

type CreateScheduleForm = z.infer<typeof createScheduleSchema>;

// Simple form field wrapper component
const SimpleFormField = ({
  label,
  required,
  error,
  children
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const CreateSchedulePage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateScheduleForm>({
    resolver: zodResolver(createScheduleSchema),
    defaultValues: {
      venue: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      basePrice: "1000",
      peakMultiplier: "1.0",
      maxBookings: "4",
      category: "",
      isRecurring: false,
      recurringWeeks: "4",
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const selectedVenue = venues.find((v: { id: string; name: string; capacity: number }) => v.id === watchedValues.venue);
  const selectedCategory = priceCategories.find((c: { id: string; name: string; description: string }) => c.id === watchedValues.category);

  const onSubmit = async (data: CreateScheduleForm) => {
    setIsSubmitting(true);
    try {
      console.log("Creating schedule:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard/schedule");
    } catch (error) {
      console.error("Error creating schedule:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageConfig: PageConfig = {
    title: "Create Schedule",
    subtitle: "Create a new time slot schedule with pricing",
    actions: [
      {
        label: "Save Schedule",
        icon: <Check className="size-4" />,
        variant: "default",
        onClick: handleSubmit(onSubmit),
        disabled: !isValid || isSubmitting,
      },
      {
        label: "Cancel",
        icon: <Ban className="size-4" />,
        variant: "destructive",
        onClick: () => router.push("/dashboard/schedule"),
      },
    ],
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const calculateDuration = () => {
    if (!watchedValues.startTime || !watchedValues.endTime) return "";
    const start = new Date(`2000-01-01T${watchedValues.startTime}`);
    const end = new Date(`2000-01-01T${watchedValues.endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours > 0 ? `${diffHours} hour${diffHours !== 1 ? "s" : ""}` : "";
  };

  const calculateFinalPrice = () => {
    if (!watchedValues.basePrice || !watchedValues.peakMultiplier) return 0;
    const basePrice = parseFloat(watchedValues.basePrice);
    const multiplier = parseFloat(watchedValues.peakMultiplier);
    return basePrice * multiplier;
  };

  const calculateWeeklyRevenue = () => {
    const finalPrice = calculateFinalPrice();
    const maxBookings = parseInt(watchedValues.maxBookings ?? "0");
    return finalPrice * maxBookings;
  };

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />
      <div className="p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column - Form */}
            <div className="space-y-6 lg:col-span-8">
              {/* Venue & Day Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <MapPin className="size-5" />
                    Venue & Day Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SimpleFormField label="Venue" required error={errors.venue?.message}>
                      <Controller
                        name="venue"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={errors.venue ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select venue" />
                            </SelectTrigger>
                            <SelectContent>
                              {venues.map((venue: { id: string; name: string; capacity: number }) => (
                                <SelectItem key={venue.id} value={venue.id}>
                                  {venue.name} (Capacity: {venue.capacity})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </SimpleFormField>

                    <SimpleFormField label="Day of Week" required error={errors.dayOfWeek?.message}>
                      <Controller
                        name="dayOfWeek"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={errors.dayOfWeek ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                              {daysOfWeek.map((day: { id: string; name: string }) => (
                                <SelectItem key={day.id} value={day.id}>
                                  {day.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </SimpleFormField>
                  </div>

                  <SimpleFormField label="Price Category" required error={errors.category?.message}>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                            <SelectValue placeholder="Select price category" />
                          </SelectTrigger>
                          <SelectContent>
                            {priceCategories.map((category: { id: string; name: string; description: string }) => (
                              <SelectItem key={category.id} value={category.id}>
                                <div>
                                  <div className="font-medium">{category.name}</div>
                                  <div className="text-xs text-gray-500">{category.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </SimpleFormField>
                </CardContent>
              </Card>

              {/* Time & Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Clock className="size-5" />
                    Time & Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SimpleFormField label="Start Time" required error={errors.startTime?.message}>
                      <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} type="time" className={errors.startTime ? "border-red-500" : ""} />
                        )}
                      />
                    </SimpleFormField>

                    <SimpleFormField label="End Time" required error={errors.endTime?.message}>
                      <Controller
                        name="endTime"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} type="time" className={errors.endTime ? "border-red-500" : ""} />
                        )}
                      />
                    </SimpleFormField>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <SimpleFormField label="Base Price (₹)" required error={errors.basePrice?.message}>
                      <Controller
                        name="basePrice"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="1"
                            max="10000"
                            placeholder="1000"
                            className={errors.basePrice ? "border-red-500" : ""}
                          />
                        )}
                      />
                    </SimpleFormField>

                    <SimpleFormField label="Peak Multiplier" required error={errors.peakMultiplier?.message}>
                      <Controller
                        name="peakMultiplier"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min="1.0"
                            max="5.0"
                            step="0.1"
                            placeholder="1.0"
                            className={errors.peakMultiplier ? "border-red-500" : ""}
                          />
                        )}
                      />
                    </SimpleFormField>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-900">Final Price per Booking:</span>
                      <span className="text-lg font-bold text-blue-900">₹{calculateFinalPrice().toFixed(0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bookings & Recurring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <Users className="size-5" />
                    Bookings & Recurring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SimpleFormField label="Maximum Bookings per Slot" required error={errors.maxBookings?.message}>
                    <Controller
                      name="maxBookings"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          max="20"
                          placeholder="4"
                          className={errors.maxBookings ? "border-red-500" : ""}
                        />
                      )}
                    />
                  </SimpleFormField>

                  <div className="space-y-3">
                    <SimpleFormField label="Recurring Schedule">
                      <Controller
                        name="isRecurring"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">Create recurring time slots</span>
                          </div>
                        )}
                      />
                    </SimpleFormField>

                    {watchedValues.isRecurring && (
                      <SimpleFormField label="Duration" error={errors.recurringWeeks?.message}>
                        <Controller
                          name="recurringWeeks"
                          control={control}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                {recurringWeeksOptions.map((option: { id: string; name: string }) => (
                                  <SelectItem key={option.id} value={option.id}>
                                    {option.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </SimpleFormField>
                    )}
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-900">Revenue per Week:</span>
                        <span className="text-lg font-bold text-green-900">₹{calculateWeeklyRevenue().toFixed(0)}</span>
                      </div>
                      {watchedValues.isRecurring && watchedValues.recurringWeeks && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-900">
                            Total Revenue ({watchedValues.recurringWeeks} weeks):
                          </span>
                          <span className="text-lg font-bold text-green-900">
                            ₹{(calculateWeeklyRevenue() * parseInt(watchedValues.recurringWeeks)).toFixed(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Schedule Summary */}
            <div className="lg:col-span-4">
              <ScheduleSummary
                selectedVenue={selectedVenue}
                selectedCategory={selectedCategory}
                watchedValues={watchedValues}
                calculateDuration={calculateDuration}
                calculateFinalPrice={calculateFinalPrice}
                formatTime={formatTime}
                isSubmitting={isSubmitting}
                isValid={isValid}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSchedulePage;
