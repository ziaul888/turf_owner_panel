import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PricingRule {
  id: string;
  name: string;
  type: "peak" | "off-peak" | "weekend" | "holiday";
  multiplier: number;
  startTime: string;
  endTime: string;
  days: string[];
  isActive: boolean;
}

interface PricingTemplatesProps {
  onApplyTemplate: (rules: PricingRule[]) => void;
}

export const PricingTemplates: React.FC<PricingTemplatesProps> = ({ onApplyTemplate }) => {
  const templates = [
    {
      name: "Standard Peak Hours",
      description: "Morning & evening peaks",
      rules: [
        {
          id: "1",
          name: "Morning Peak",
          type: "peak" as const,
          multiplier: 1.2,
          startTime: "08:00",
          endTime: "12:00",
          days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          isActive: true,
        },
        {
          id: "2",
          name: "Evening Peak",
          type: "peak" as const,
          multiplier: 1.5,
          startTime: "17:00",
          endTime: "21:00",
          days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          isActive: true,
        },
      ],
    },
    {
      name: "Weekend Focus",
      description: "Higher weekend rates",
      rules: [
        {
          id: "1",
          name: "Weekend Premium",
          type: "weekend" as const,
          multiplier: 1.3,
          startTime: "09:00",
          endTime: "20:00",
          days: ["saturday", "sunday"],
          isActive: true,
        },
        {
          id: "2",
          name: "Weekday Off-Peak",
          type: "off-peak" as const,
          multiplier: 0.8,
          startTime: "13:00",
          endTime: "16:00",
          days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          isActive: true,
        },
      ],
    },
    {
      name: "Flat Rate",
      description: "Same price all day",
      rules: [],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {templates.map((template, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex h-auto flex-col items-start p-4"
              onClick={() => onApplyTemplate(template.rules)}
            >
              <div className="font-medium">{template.name}</div>
              <div className="text-sm text-gray-600">{template.description}</div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};