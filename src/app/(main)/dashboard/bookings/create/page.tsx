"use client";
import React, { useState, useMemo } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Ban, InfoIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import PageTopSection from "../_components/page-top-section";
import { PageConfig } from "../types";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Zod validation schema
const createBookingSchema = z.object({
  customerName: z
    .string()
    .min(2, "Customer name must be at least 2 characters")
    .max(50, "Customer name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[+]?[0-9\s\-()]+$/, "Please enter a valid phone number"),
  customerType: z.string().min(1, "Please select a customers type"),
  venue: z.string().min(1, "Please select a venue"),
  turfType: z.string().min(1, "Please select a turf type"),
  date: z
    .string()
    .min(1, "Please select a date")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Date cannot be in the past"),
  time: z
    .string()
    .min(1, "Please select a time")
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time"),
  duration: z.string().min(1, "Please select a duration"),
});

type CreateBookingForm = z.infer<typeof createBookingSchema>;

interface VenueOption {
  id: string;
  name: string;
  basePrice: number;
  turfTypes: string[];
}

const venues: VenueOption[] = [
  { id: "sports-arena", name: "Sports Arena", basePrice: 1500, turfTypes: ["Football", "Cricket", "Multi-purpose"] },
  { id: "premium-ground", name: "Premium Ground", basePrice: 2000, turfTypes: ["Football", "Cricket"] },
  { id: "community-field", name: "Community Field", basePrice: 1000, turfTypes: ["Football", "Multi-purpose"] },
];

const customerTypes = [
  { id: "regular", name: "Regular Customer", discount: 10 },
  { id: "premium", name: "Premium Member", discount: 15 },
  { id: "new", name: "New Customer", discount: 0 },
];

// eslint-disable-next-line complexity
const CreateBookingPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<CreateBookingForm>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      customerType: "regular",
      venue: "",
      turfType: "",
      date: "",
      time: "",
      duration: "1",
    },
    mode: "onChange",
  });

  const watchedValues = watch();
  const selectedVenue = venues.find((v) => v.id === watchedValues.venue);
  const selectedCustomerType = customerTypes.find((c) => c.id === watchedValues.customerType);

  // Calculate pricing
  const pricing = useMemo(() => {
    if (!selectedVenue || !watchedValues.duration) {
      return { basePrice: 0, discount: 0, tax: 0, total: 0 };
    }

    const basePrice = selectedVenue.basePrice * parseFloat(watchedValues.duration);
    const discountAmount = selectedCustomerType ? (basePrice * selectedCustomerType.discount) / 100 : 0;
    const subtotal = basePrice - discountAmount;
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + tax;

    return {
      basePrice,
      discount: discountAmount,
      tax,
      total,
    };
  }, [selectedVenue, watchedValues.duration, selectedCustomerType]);

  const onSubmit = async (data: CreateBookingForm) => {
    setIsSubmitting(true);

    try {
      console.log("Creating booking:", data);
      // Here you would typically send the data to your API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard/bookings");
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle venue change to reset turf type
  const handleVenueChange = (venueId: string) => {
    setValue("venue", venueId);
    setValue("turfType", ""); // Reset turf type when venue changes
    trigger(["venue", "turfType"]);
  };

  const pageConfig: PageConfig = {
    title: "Create New Booking",
    subtitle: "Add a new booking to your system",
    actions: [
      {
        label: "Save booking",
        icon: <Check className="size-4" />,
        variant: "default",
        onClick: handleSubmit(onSubmit),
        disabled: !isValid || isSubmitting,
      },
      {
        label: "Cancel",
        icon: <Ban className="size-4" />,
        variant: "destructive",
        onClick: () => router.push("/dashboard/bookings"),
      },
    ],
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const endHour = hour + parseFloat(watchedValues.duration);
    const ampm = hour >= 12 ? "PM" : "AM";
    const endAmpm = endHour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const displayEndHour = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour;

    return `${displayHour}:${minutes} ${ampm} - ${displayEndHour}:${minutes} ${endAmpm}`;
  };

  // Helper component for form field with error
  // eslint-disable-next-line react/no-unstable-nested-components
  const FormField = ({
    label,
    error,
    required = false,
    children,
  }: {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
  }) => {
    return (
      <div>
        <Label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="mt-1 w-full">{children}</div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />
      <div className="p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column - Form */}
            <div className="space-y-6 lg:col-span-8">
              {/* Customer Information */}
              <Card className="@container/card py-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Customer Name" required error={errors.customerName?.message}>
                      <Controller
                        name="customerName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Enter customer name"
                            className={errors.customerName ? "border-red-500" : "h-12"}
                          />
                        )}
                      />
                    </FormField>
                    <FormField label="Email Address" required error={errors.email?.message}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="email"
                            placeholder="customer@email.com"
                            className={errors.email ? "border-red-500" : "h-12"}
                          />
                        )}
                      />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Phone Number" required error={errors.phone?.message}>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="tel"
                            placeholder="+91 98765 43210"
                            className={errors.phone ? "border-red-500" : "h-12"}
                          />
                        )}
                      />
                    </FormField>
                    <FormField label="Customer Type" required error={errors.customerType?.message}>
                      <Controller
                        name="customerType"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={errors.customerType ? "border-red-500" : "h-12"}>
                              <SelectValue placeholder="Select customer type" />
                            </SelectTrigger>
                            <SelectContent>
                              {customerTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormField>
                  </div>
                </CardContent>
              </Card>

              {/* Venue & Timing */}
              <Card className="@container/card py-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Venue & Timing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Select Venue" required error={errors.venue?.message}>
                      <Controller
                        name="venue"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleVenueChange(value);
                            }}
                          >
                            <SelectTrigger size="default" className={errors.venue ? "border-red-500" : ""}>
                              <SelectValue placeholder="Choose venue" />
                            </SelectTrigger>
                            <SelectContent>
                              {venues.map((venue) => (
                                <SelectItem key={venue.id} value={venue.id}>
                                  {venue.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormField>
                    <FormField label="Turf Type" required error={errors.turfType?.message}>
                      <Controller
                        name="turfType"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange} disabled={!selectedVenue}>
                            {/* eslint-disable-next-line max-lines */}
                            {/* eslint-disable-next-line max-lines */}
                            <SelectTrigger size="default" className={errors.turfType ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select turf type" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedVenue?.turfTypes.map((type) => (
                                <SelectItem key={type} value={type.toLowerCase()}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField label="Date" required error={errors.date?.message}>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="date"
                            className={errors.date ? "border-red-500" : "h-12"}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        )}
                      />
                    </FormField>
                    <FormField label="Start Time" required error={errors.time?.message}>
                      <Controller
                        name="time"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} type="time" className={errors.time ? "border-red-500" : "h-12"} />
                        )}
                      />
                    </FormField>
                    <FormField label="Duration" required error={errors.duration?.message}>
                      <Controller
                        name="duration"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
                              <SelectValue placeholder="Duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.5">30 minutes</SelectItem>
                              <SelectItem value="1">1 Hour</SelectItem>
                              <SelectItem value="1.5">1.5 Hours</SelectItem>
                              <SelectItem value="2">2 Hours</SelectItem>
                              <SelectItem value="3">3 Hours</SelectItem>
                              <SelectItem value="4">4 Hours</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormField>
                  </div>
                </CardContent>
              </Card>
              <Card className="@container/card py-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Pricing & Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Price" required error={errors.customerName?.message}>
                      <Controller
                        name="customerName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="$ Enter price"
                            className={errors.customerName ? "border-red-500" : "h-12"}
                          />
                        )}
                      />
                    </FormField>
                    <FormField label="Discount" required error={errors.email?.message}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="email"
                            placeholder="$ Enter discount"
                            className={errors.email ? "border-red-500" : "h-12"}
                          />
                        )}
                      />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField label="Payment Method" required error={errors.duration?.message}>
                      <Controller
                        name="duration"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
                              <SelectValue placeholder="Duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.5">30 minutes</SelectItem>
                              <SelectItem value="1">1 Hour</SelectItem>
                              <SelectItem value="1.5">1.5 Hours</SelectItem>
                              <SelectItem value="2">2 Hours</SelectItem>
                              <SelectItem value="3">3 Hours</SelectItem>
                              <SelectItem value="4">4 Hours</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormField>
                    <FormField label="Payement Status" required error={errors.duration?.message}>
                      <Controller
                        name="duration"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
                              <SelectValue placeholder="Duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.5">30 minutes</SelectItem>
                              <SelectItem value="1">1 Hour</SelectItem>
                              <SelectItem value="1.5">1.5 Hours</SelectItem>
                              <SelectItem value="2">2 Hours</SelectItem>
                              <SelectItem value="3">3 Hours</SelectItem>
                              <SelectItem value="4">4 Hours</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormField>
                  </div>
                </CardContent>
              </Card>
              <Card className="@container/card py-6">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Textarea />
                  <div className="flex w-full flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Equipment Required</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Refreshments</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Parking Required</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="space-y-6 lg:col-span-4">
              <Card className="sticky top-[110px]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Venue:</span>
                      <span className="font-medium">{selectedVenue?.name ?? "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date:</span>
                      <span className="font-medium">{formatDate(watchedValues.date) || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Time:</span>
                      <span className="font-medium">{formatTime(watchedValues.time) || "Not selected"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {watchedValues.duration} Hour{parseFloat(watchedValues.duration) !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Base Price:</span>
                      <span className="font-medium">₹{pricing.basePrice.toFixed(0)}</span>
                    </div>
                    {pricing.discount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Discount:</span>
                        <span className="font-medium text-green-600">-₹{pricing.discount.toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax (18%):</span>
                      <span className="font-medium">₹{pricing.tax.toFixed(0)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Amount:</span>
                        <span className="text-lg font-bold text-green-600">₹{pricing.total.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  {/*<div className="pt-4">*/}
                  {/*  <Button type="submit" className="w-full" disabled={isSubmitting || !isValid}>*/}
                  {/*    {isSubmitting ? (*/}
                  {/*      <>*/}
                  {/*        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />*/}
                  {/*        Creating...*/}
                  {/*      </>*/}
                  {/*    ) : (*/}
                  {/*      "Create Booking"*/}
                  {/*    )}*/}
                  {/*  </Button>*/}
                  {/*</div>*/}
                </CardContent>
              </Card>
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <div className="mb-3 flex items-center">
                  <i className="mr-2 text-green-600" data-fa-i2svg="">
                    <svg
                      className="svg-inline--fa fa-circle-info"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="circle-info"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                      ></path>
                    </svg>
                  </i>
                  <h4 className="font-semibold text-green-900">Booking Guidelines</h4>
                </div>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Booking confirmation required</li>
                  <li>• Cancellation 24hrs prior</li>
                  <li>• Valid ID required on arrival</li>
                  <li>• Equipment check before play</li>
                </ul>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                <h4 className="mb-3 font-semibold text-blue-900">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-100">
                    Add to Calendar
                  </button>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-100">

                    Send Confirmation
                  </button>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-blue-700 hover:bg-blue-100">

                    Print Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBookingPage;
