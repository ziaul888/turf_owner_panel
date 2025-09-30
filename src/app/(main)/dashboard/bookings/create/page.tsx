// "use client";

// import React, { useState, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Check, Ban } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import PageTopSection from "../_components/page-top-section";
// import { PageConfig } from "../types";

// // Zod validation schema
// const createBookingSchema = z.object({
//     customerName: z.string()
//         .min(2, "Customer name must be at least 2 characters")
//         .max(50, "Customer name must be less than 50 characters"),
//     email: z.string()
//         .email("Please enter a valid email address"),
//     phone: z.string()
//         .min(10, "Phone number must be at least 10 digits")
//         .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Please enter a valid phone number"),
//     customerType: z.string()
//         .min(1, "Please select a customer type"),
//     venue: z.string()
//         .min(1, "Please select a venue"),
//     turfType: z.string()
//         .min(1, "Please select a turf type"),
//     date: z.string()
//         .min(1, "Please select a date")
//         .refine((date) => {
//             const selectedDate = new Date(date);
//             const today = new Date();
//             today.setHours(0, 0, 0, 0);
//             return selectedDate >= today;
//         }, "Date cannot be in the past"),
//     time: z.string()
//         .min(1, "Please select a time")
//         .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time"),
//     duration: z.string()
//         .min(1, "Please select a duration"),
// });

// type CreateBookingForm = z.infer<typeof createBookingSchema>;

// interface VenueOption {
//     id: string;
//     name: string;
//     basePrice: number;
//     turfTypes: string[];
// }

// const venues: VenueOption[] = [
//     { id: "sports-arena", name: "Sports Arena", basePrice: 1500, turfTypes: ["Football", "Cricket", "Multi-purpose"] },
//     { id: "premium-ground", name: "Premium Ground", basePrice: 2000, turfTypes: ["Football", "Cricket"] },
//     { id: "community-field", name: "Community Field", basePrice: 1000, turfTypes: ["Football", "Multi-purpose"] },
// ];

// const customerTypes = [
//     { id: "regular", name: "Regular Customer", discount: 10 },
//     { id: "premium", name: "Premium Member", discount: 15 },
//     { id: "new", name: "New Customer", discount: 0 },
// ];

// const CreateBookingPage = () => {
//     const router = useRouter();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const {
//         control,
//         handleSubmit,
//         watch,
//         formState: { errors, isValid },
//         setValue,
//         trigger,
//     } = useForm<CreateBookingForm>({
//         resolver: zodResolver(createBookingSchema),
//         defaultValues: {
//             customerName: "",
//             email: "",
//             phone: "",
//             customerType: "regular",
//             venue: "",
//             turfType: "",
//             date: "",
//             time: "",
//             duration: "1",
//         },
//         mode: "onChange",
//     });

//     const watchedValues = watch();
//     const selectedVenue = venues.find(v => v.id === watchedValues.venue);
//     const selectedCustomerType = customerTypes.find(c => c.id === watchedValues.customerType);

//     // Calculate pricing
//     const pricing = useMemo(() => {
//         if (!selectedVenue || !watchedValues.duration) {
//             return { basePrice: 0, discount: 0, tax: 0, total: 0 };
//         }

//         const basePrice = selectedVenue.basePrice * parseFloat(watchedValues.duration);
//         const discountAmount = selectedCustomerType ? (basePrice * selectedCustomerType.discount) / 100 : 0;
//         const subtotal = basePrice - discountAmount;
//         const tax = subtotal * 0.18; // 18% tax
//         const total = subtotal + tax;

//         return {
//             basePrice,
//             discount: discountAmount,
//             tax,
//             total
//         };
//     }, [selectedVenue, watchedValues.duration, selectedCustomerType]);

//     const onSubmit = async (data: CreateBookingForm) => {
//         setIsSubmitting(true);

//         try {
//             console.log("Creating booking:", data);
//             // Here you would typically send the data to your API
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             router.push("/dashboard/bookings");
//         } catch (error) {
//             console.error("Error creating booking:", error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     // Handle venue change to reset turf type
//     const handleVenueChange = (venueId: string) => {
//         setValue("venue", venueId);
//         setValue("turfType", ""); // Reset turf type when venue changes
//         trigger(["venue", "turfType"]);
//     };

//     const pageConfig: PageConfig = {
//         title: "Create New Booking",
//         subtitle: "Add a new booking to your system",
//         actions: [
//             {
//                 label: "Save booking",
//                 icon: <Check className="size-4" />,
//                 variant: "default",
//                 onClick: handleSubmit(onSubmit),
//                 disabled: !isValid || isSubmitting,
//             },
//             {
//                 label: "Cancel",
//                 icon: <Ban className="size-4" />,
//                 variant: "destructive",
//                 onClick: () => router.push("/dashboard/bookings"),
//             },
//         ],
//     };

//     const formatDate = (dateString: string) => {
//         if (!dateString) return "";
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     const formatTime = (timeString: string) => {
//         if (!timeString) return "";
//         const [hours, minutes] = timeString.split(':');
//         const hour = parseInt(hours);
//         const endHour = hour + parseFloat(watchedValues.duration);
//         const ampm = hour >= 12 ? 'PM' : 'AM';
//         const endAmpm = endHour >= 12 ? 'PM' : 'AM';
//         const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
//         const displayEndHour = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour;

//         return `${displayHour}:${minutes} ${ampm} - ${displayEndHour}:${minutes} ${endAmpm}`;
//     };

//     // Helper component for form field with error
//     const FormField = ({
//         label,
//         error,
//         required = false,
//         children
//     }: {
//         label: string;
//         error?: string;
//         required?: boolean;
//         children: React.ReactNode;
//     }) => (
//         <div>
//             <Label className="text-sm font-medium text-gray-700">
//                 {label} {required && <span className="text-red-500">*</span>}
//             </Label>
//             <div className="mt-1">
//                 {children}
//             </div>
//             {error && (
//                 <p className="mt-1 text-sm text-red-600">{error}</p>
//             )}
//         </div>
//     );

//     return (
//         <div className="@container/main flex flex-col gap-6 md:gap-6">
//             <PageTopSection config={pageConfig} />
//             <div className="p-4 md:p-6">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
//                         {/* Left Column - Form */}
//                         <div className="space-y-6 lg:col-span-8">
//                             {/* Customer Information */}
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="text-lg font-semibold">Customer Information</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <FormField
//                                             label="Customer Name"
//                                             required
//                                             error={errors.customerName?.message}
//                                         >
//                                             <Controller
//                                                 name="customerName"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Input
//                                                         {...field}
//                                                         placeholder="Enter customer name"
//                                                         className={errors.customerName ? "border-red-500" : ""}
//                                                     />
//                                                 )}
//                                             />
//                                         </FormField>
//                                         <FormField
//                                             label="Email Address"
//                                             required
//                                             error={errors.email?.message}
//                                         >
//                                             <Controller
//                                                 name="email"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Input
//                                                         {...field}
//                                                         type="email"
//                                                         placeholder="customer@email.com"
//                                                         className={errors.email ? "border-red-500" : ""}
//                                                     />
//                                                 )}
//                                             />
//                                         </FormField>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <FormField
//                                             label="Phone Number"
//                                             required
//                                             error={errors.phone?.message}
//                                         >
//                                             <Controller
//                                                 name="phone"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Input
//                                                         {...field}
//                                                         type="tel"
//                                                         placeholder="+91 98765 43210"
//                                                         className={errors.phone ? "border-red-500" : ""}
//                                                     />
//                                                 )}
//                                             />
//                                         </FormField>
//                                         <FormField
//                                             label="Customer Type"
//                                             required
//                                             error={errors.customerType?.message}
//                                         >
//                                             <Controller
//                                                 name="customerType"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Select value={field.value} onValueChange={field.onChange}>
//                                                         <SelectTrigger className={errors.customerType ? "border-red-500" : ""}>
//                                                             <SelectValue placeholder="Select customer type" />
//                                                         </SelectTrigger>
//                                                         <SelectContent>
//                                                             {customerTypes.map((type) => (
//                                                                 <SelectItem key={type.id} value={type.id}>
//                                                                     {type.name}
//                                                                 </SelectItem>
//                                                             ))}
//                                                         </SelectContent>
//                                                     </Select>
//                                                 )}
//                                             />
//                                         </FormField>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             {/* Venue & Timing */}
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle className="text-lg font-semibold">Venue & Timing</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <FormField
//                                             label="Select Venue"
//                                             required
//                                             error={errors.venue?.message}
//                                         >
//                                             <Controller
//                                                 name="venue"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Select
//                                                         value={field.value}
//                                                         onValueChange={(value) => {
//                                                             field.onChange(value);
//                                                             handleVenueChange(value);
//                                                         }}
//                                                     >
//                                                         <SelectTrigger className={errors.venue ? "border-red-500" : ""}>
//                                                             <SelectValue placeholder="Choose venue" />
//                                                         </SelectTrigger>
//                                                         <SelectContent>
//                                                             {venues.map((venue) => (
//                                                                 <SelectItem key={venue.id} value={venue.id}>
//                                                                     {venue.name}
//                                                                 </SelectItem>
//                                                             ))}
//                                                         </SelectContent>
//                                                     </Select>
//                                                 )}
//                                             />
//                                         </FormField>
//                                         <FormField
//                                             label="Turf Type"
//                                             required
//                                             error={errors.turfType?.message}
//                                         >
//                                             <Controller
//                                                 name="turfType"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Select
//                                                         value={field.value}
//                                                         onValueChange={field.onChange}
//                                                         disabled={!selectedVenue}
//                                                     >
//                                                         <SelectTrigger className={errors.turfType ? "border-red-500" : ""}>
//                                                             <SelectValue placeholder="Select turf type" />
//                                                         </SelectTrigger>
//                                                         <SelectContent>
//                                                             {selectedVenue?.turfTypes.map((type) => (
//                                                                 <SelectItem key={type} value={type.toLowerCase()}>
//                                                                     {type}
//                                                                 </SelectItem>
//                                                             ))}
//                                                         </SelectContent>
//                                                     </Select>
//                                                 )}
//                                             />
//                                         </FormField>
//                                     </div>
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                         <FormField
//                                             label="Date"
//                                             required
//                                             error={errors.date?.message}
//                                         >
//                                             <Controller
//                                                 name="date"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Input
//                                                         {...field}
//                                                         type="date"
//                                                         className={errors.date ? "border-red-500" : ""}
//                                                         min={new Date().toISOString().split('T')[0]}
//                                                     />
//                                                 )}
//                                             />
//                                         </FormField>
//                                         <FormField
//                                             label="Start Time"
//                                             required
//                                             error={errors.time?.message}
//                                         >
//                                             <Controller
//                                                 name="time"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Input
//                                                         {...field}
//                                                         type="time"
//                                                         className={errors.time ? "border-red-500" : ""}
//                                                     />
//                                                 )}
//                                             />
//                                         </FormField>
//                                         <FormField
//                                             label="Duration"
//                                             required
//                                             error={errors.duration?.message}
//                                         >
//                                             <Controller
//                                                 name="duration"
//                                                 control={control}
//                                                 render={({ field }) => (
//                                                     <Select value={field.value} onValueChange={field.onChange}>
//                                                         <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
//                                                             <SelectValue placeholder="Duration" />
//                                                         </SelectTrigger>
//                                                         <SelectContent>
//                                                             <SelectItem value="0.5">30 minutes</SelectItem>
//                                                             <SelectItem value="1">1 Hour</SelectItem>
//                                                             <SelectItem value="1.5">1.5 Hours</SelectItem>
//                                                             <SelectItem value="2">2 Hours</SelectItem>
//                                                             <SelectItem value="3">3 Hours</SelectItem>
//                                                             <SelectItem value="4">4 Hours</SelectItem>
//                                                         </SelectContent>
//                                                     </Select>
//                                                 )}
//                                             />
//                                         </FormField>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </div>

//                         {/* Right Column - Booking Summary */}
//                         <div className="lg:col-span-4">
//                             <Card className="sticky top-6">
//                                 <CardHeader>
//                                     <CardTitle className="text-lg font-semibold">Booking Summary</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="space-y-4">
//                                     <div className="space-y-3">
//                                         <div className="flex justify-between">
//                                             <span className="text-sm text-gray-600">Venue:</span>
//                                             <span className="font-medium">
//                                                 {selectedVenue?.name || "Not selected"}
//                                             </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-sm text-gray-600">Date:</span>
//                                             <span className="font-medium">
//                                                 {formatDate(watchedValues.date) || "Not selected"}
//                                             </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-sm text-gray-600">Time:</span>
//                                             <span className="font-medium">
//                                                 {formatTime(watchedValues.time) || "Not selected"}
//                                             </span>
//                                         </div>
//                                         <div className="flex justify-between">
//                                             <span className="text-sm text-gray-600">Duration:</span>
//                                             <span className="font-medium">
//                                                 {watchedValues.duration} Hour{parseFloat(watchedValues.duration) !== 1 ? 's' : ''}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <div className="border-t pt-4 space-y-3">
//                                         <div className="flex justify-between">
//                                             <span className="text-sm text-gray-600">Base Price:</span>
//                                             <span className="font-medium">₹{pricing.basePrice.toFixed(0)}</span>
//                                         </div>
//                                         {pricing.discount > 0 && (
//                                             <div className="flex justify-between">
//                                                 <span className="text-sm text-gray-600">Discount:</span>
//                                                 <span className="font-medium text-green-600">-₹{pricing.discount.toFixed(0)}</span>
//                                             </div>
//                                         )}
//                                         <div className="flex justify-between">
//                                             <span className="text-sm text-gray-600">Tax (18%):</span>
//                                             <span className="font-medium">₹{pricing.tax.toFixed(0)}</span>
//                                         </div>
//                                         <div className="border-t pt-3">
//                                             <div className="flex justify-between">
//                                                 <span className="font-semibold">Total Amount:</span>
//                                                 <span className="font-bold text-lg text-green-600">₹{pricing.total.toFixed(0)}</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="pt-4">
//                                         <Button
//                                             type="submit"
//                                             className="w-full"
//                                             disabled={isSubmitting || !isValid}
//                                         >
//                                             {isSubmitting ? (
//                                                 <>
//                                                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
//                                                     Creating...
//                                                 </>
//                                             ) : (
//                                                 "Create Booking"
//                                             )}
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CreateBookingPage;
