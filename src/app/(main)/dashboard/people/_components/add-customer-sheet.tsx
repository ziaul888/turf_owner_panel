"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const addCustomerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  membershipType: z.enum(["Basic", "Standard", "Premium"], {
    required_error: "Please select a membership type",
  }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Please select a status",
  }),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type AddCustomerFormData = z.infer<typeof addCustomerSchema>;

interface AddCustomerSheetProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCustomerAdded?: (customer: any) => void;
}

export const AddCustomerSheet: React.FC<AddCustomerSheetProps> = ({
  trigger,
  isOpen: controlledOpen,
  onOpenChange,
  onCustomerAdded
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddCustomerFormData>({
    resolver: zodResolver(addCustomerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      membershipType: "Basic",
      status: "Active",
      address: "",
      notes: "",
    },
  });

  const onSubmit = async (data: AddCustomerFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Adding customer:", data);

      // Generate customer ID
      const customerId = `#CU-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000) + 1).padStart(3, '0')}`;

      const newCustomer = {
        id: Date.now(), // Simple ID generation
        customerId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        joinDate: new Date().toISOString().split('T')[0],
        totalBookings: 0,
        totalSpent: "$0.00",
        status: data.status,
        membershipType: data.membershipType,
        address: data.address,
        notes: data.notes,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Customer added successfully:", newCustomer);

      // Call the callback if provided
      if (onCustomerAdded) {
        onCustomerAdded(newCustomer);
      }

      // Close the sheet and reset form
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding customer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    form.reset();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {trigger && (
        <SheetTrigger asChild>
          {trigger}
        </SheetTrigger>
      )}
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full" side="right">
        {/* Header */}
        <SheetHeader className="space-y-3 pb-4 px-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <User className="size-5" />
            <SheetTitle>Add New Customer</SheetTitle>
          </div>
          <SheetDescription>
            Create a new customer profile with their basic information and membership details.
          </SheetDescription>
        </SheetHeader>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto  px-4 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Basic Information
                </h4>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter customer's full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="customer@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Membership Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Membership Details
                </h4>

                <FormField
                  control={form.control}
                  name="membershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select membership type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Additional Information
                </h4>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter customer's address (optional)"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional notes about the customer (optional)"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        {/* Sticky Action Buttons */}
        <div className="border-t bg-background p-4 flex-shrink-0 sticky bottom-0">
          <div className="flex gap-3">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                  Adding Customer...
                </>
              ) : (
                <>
                  <Plus className="mr-2 size-4" />
                  Add Customer
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};