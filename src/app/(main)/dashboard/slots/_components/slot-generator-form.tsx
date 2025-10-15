/**
 * SlotGeneratorForm Component
 * 
 * This component provides the form interface for generating time slots.
 * It's designed to be used within the SlotGeneratorSheet offcanvas component.
 * 
 * Features:
 * - Field selection
 * - Slot duration configuration (preset or custom)
 * - Date range selection
 * - Day of week selection with quick presets
 * - Time range and pricing configuration
 */
import React from "react";

import { Calendar, Clock } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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



interface SlotGeneratorFormProps {
  control: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  errors: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  watchedValues: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  handleDayToggle: (dayId: string, checked: boolean) => void;
  selectWeekdays: () => void;
  selectWeekends: () => void;
  selectAllDays: () => void;
}

export const SlotGeneratorForm = ({
  control,
  errors,
  watchedValues,
  handleDayToggle,
  selectWeekdays,
  selectWeekends,
  selectAllDays,
}: SlotGeneratorFormProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
