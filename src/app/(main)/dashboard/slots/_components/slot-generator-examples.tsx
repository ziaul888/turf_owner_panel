import React from "react";
import { Plus, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlotGeneratorSheet } from "./slot-generator-sheet";

/**
 * Example usage of SlotGeneratorSheet component
 * This shows different ways to use the offcanvas slot generator
 */
export const SlotGeneratorExamples = () => {
  const handleSlotsGenerated = (slots: any[]) => {
    console.log("Generated slots:", slots);
    // Handle the generated slots (e.g., update state, show notification, etc.)
  };

  return (
    <div className="space-y-4">
      {/* Example 1: Default trigger button */}
      <SlotGeneratorSheet onSlotsGenerated={handleSlotsGenerated} />

      {/* Example 2: Custom trigger button */}
      <SlotGeneratorSheet 
        onSlotsGenerated={handleSlotsGenerated}
        trigger={
          <Button variant="outline">
            <Calendar className="mr-2 size-4" />
            Quick Slot Generator
          </Button>
        }
      />

      {/* Example 3: Icon-only trigger */}
      <SlotGeneratorSheet 
        onSlotsGenerated={handleSlotsGenerated}
        trigger={
          <Button size="icon" variant="ghost">
            <Zap className="size-4" />
          </Button>
        }
      />

      {/* Example 4: Custom styled trigger */}
      <SlotGeneratorSheet 
        onSlotsGenerated={handleSlotsGenerated}
        trigger={
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Plus className="mr-2 size-4" />
            Create Multiple Slots
          </Button>
        }
      />
    </div>
  );
};