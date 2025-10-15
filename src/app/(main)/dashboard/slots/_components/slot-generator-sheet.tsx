/* eslint-disable max-lines */
"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Zap, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SlotGeneratorForm } from "./slot-generator-form";

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

type SlotGeneratorFormData = z.infer<typeof slotGeneratorSchema>;

interface SlotGeneratorSheetProps {
    trigger?: React.ReactNode;
    onSlotsGenerated?: (slots: any[]) => void;
}

export const SlotGeneratorSheet: React.FC<SlotGeneratorSheetProps> = ({
    trigger,
    onSlotsGenerated
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewSlots, setPreviewSlots] = useState<any[]>([]);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
        reset,
    } = useForm<SlotGeneratorFormData>({
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

    const handleDayToggle = (dayId: string, checked: boolean) => {
        const currentDays = watchedValues.selectedDays || [];
        if (checked) {
            setValue("selectedDays", [...currentDays, dayId]);
        } else {
            setValue("selectedDays", currentDays.filter((day) => day !== dayId));
        }
    };

    const selectWeekdays = () => {
        setValue("selectedDays", ["monday", "tuesday", "wednesday", "thursday", "friday"]);
    };

    const selectWeekends = () => {
        setValue("selectedDays", ["saturday", "sunday"]);
    };

    const selectAllDays = () => {
        setValue("selectedDays", ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);
    };

    const generateSlots = (data: SlotGeneratorFormData) => {
        const slots = [];
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const duration = data.duration === "custom" ? parseInt(data.customDuration || "60") : parseInt(data.duration);

        // Generate slots for each day in the date range
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

            if (data.selectedDays.includes(dayName)) {
                const startTime = new Date(`${date.toDateString()} ${data.startTime}`);
                const endTime = new Date(`${date.toDateString()} ${data.endTime}`);

                // Generate time slots for this day
                for (let time = new Date(startTime); time < endTime; time.setMinutes(time.getMinutes() + duration)) {
                    const slotEndTime = new Date(time.getTime() + duration * 60000);

                    if (slotEndTime <= endTime) {
                        slots.push({
                            id: `${data.field}-${date.toISOString().split('T')[0]}-${time.getHours()}-${time.getMinutes()}`,
                            field: data.field,
                            date: date.toISOString().split('T')[0],
                            startTime: time.toTimeString().slice(0, 5),
                            endTime: slotEndTime.toTimeString().slice(0, 5),
                            duration,
                            price: parseInt(data.basePrice),
                            status: "available",
                        });
                    }
                }
            }
        }

        return slots;
    };

    const onSubmit = async (data: SlotGeneratorFormData) => {
        setIsGenerating(true);
        try {
            console.log("Generating slots:", data);

            // Generate preview slots
            const slots = generateSlots(data);
            setPreviewSlots(slots);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            console.log(`Generated ${slots.length} slots successfully`);

            // Call the callback if provided
            if (onSlotsGenerated) {
                onSlotsGenerated(slots);
            }

            // Close the sheet after successful generation
            setIsOpen(false);
            reset();
        } catch (error) {
            console.error("Error generating slots:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        reset();
        setPreviewSlots([]);
    };

    const defaultTrigger = (
        <Button>
            <Zap className="mr-2 size-4" />
            Generate Slots
        </Button>
    );

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                {trigger || defaultTrigger}
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-2xl flex flex-col h-full" side="right">
                {/* Header */}
                <SheetHeader className="space-y-3 pb-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Zap className="size-5" />
                            <SheetTitle>Generate Time Slots</SheetTitle>
                        </div>
                        <Button variant="ghost" size="sm" onClick={handleClose}>
                            <X className="size-4" />
                        </Button>
                    </div>
                    <SheetDescription>
                        Create multiple time slots automatically based on your configuration. Set the field, duration, date range, and days to generate slots.
                    </SheetDescription>
                </SheetHeader>

                {/* Scrollable Form Content */}
                
                    <div className="space-y-6 pb-4">
                        <SlotGeneratorForm
                            control={control}
                            errors={errors}
                            watchedValues={watchedValues}
                            handleDayToggle={handleDayToggle}
                            selectWeekdays={selectWeekdays}
                            selectWeekends={selectWeekends}
                            selectAllDays={selectAllDays}
                        />

                        {/* Preview Section */}
                        {previewSlots.length > 0 && (
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <h4 className="mb-2 font-medium">Preview</h4>
                                <p className="text-sm text-muted-foreground">
                                    {previewSlots.length} slots will be generated
                                </p>
                                <div className="mt-2 max-h-32 overflow-y-auto">
                                    <div className="space-y-1 text-xs">
                                        {previewSlots.slice(0, 5).map((slot, index) => (
                                            <div key={index} className="flex justify-between">
                                                <span>{slot.date}</span>
                                                <span>{slot.startTime} - {slot.endTime}</span>
                                                <span>₹{slot.price}</span>
                                            </div>
                                        ))}
                                        {previewSlots.length > 5 && (
                                            <div className="text-center text-muted-foreground">
                                                ... and {previewSlots.length - 5} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                

                {/* Sticky Action Buttons */}
                <div className="border-t bg-background p-4 flex-shrink-0 sticky bottom-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-3">
                            <Button
                                type="submit"
                                disabled={!isValid || isGenerating}
                                className="flex-1"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="mr-2 size-4" />
                                        Generate Slots
                                    </>
                                )}
                            </Button>
                            <Button type="button" variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};