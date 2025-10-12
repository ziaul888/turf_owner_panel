"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, DollarSign, Calendar, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import PageTopSection from "../../bookings/_components/page-top-section";
import { PageConfig } from "../../bookings/types";
import { PricingRuleCard } from "./_components/pricing-rule-card";
import { PricingChart } from "./_components/pricing-chart";
import { PricingTemplates } from "./_components/pricing-templates";

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

const fields = [
  { id: "field-1", name: "Sports Arena - Field 1" },
  { id: "field-2", name: "Sports Arena - Field 2" },
  { id: "premium-ground", name: "Premium Ground" },
  { id: "community-field", name: "Community Field" },
];

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

const DynamicPricingPage = () => {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState("field-1");
  const [basePrice, setBasePrice] = useState(1000);
  const [pricingRules, setPricingRules] = useState<PricingRule[]>([
    {
      id: "1",
      name: "Morning Peak",
      type: "peak",
      multiplier: 1.2,
      startTime: "08:00",
      endTime: "12:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      isActive: true,
    },
    {
      id: "2",
      name: "Evening Peak",
      type: "peak",
      multiplier: 1.5,
      startTime: "17:00",
      endTime: "21:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      isActive: true,
    },
    {
      id: "3",
      name: "Weekend Premium",
      type: "weekend",
      multiplier: 1.3,
      startTime: "09:00",
      endTime: "20:00",
      days: ["saturday", "sunday"],
      isActive: true,
    },
    {
      id: "4",
      name: "Off Peak Hours",
      type: "off-peak",
      multiplier: 0.8,
      startTime: "13:00",
      endTime: "16:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      isActive: true,
    },
  ]);

  const pageConfig: PageConfig = {
    title: "Dynamic Pricing",
    subtitle: "Set peak hours and special pricing rules",
    actions: [
      {
        label: "Back to Calendar",
        icon: <ArrowLeft className="size-4" />,
        variant: "outline",
        onClick: () => router.push("/dashboard/slots"),
      },
      {
        label: "Save Pricing",
        icon: <Save className="size-4" />,
        variant: "default",
        onClick: () => {
          console.log("Saving pricing rules:", { basePrice, pricingRules });
          // Here you would save to your API
        },
      },
    ],
  };

  const updatePricingRule = (id: string, updates: Partial<PricingRule>) => {
    setPricingRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)));
  };

  const addPricingRule = () => {
    const newRule: PricingRule = {
      id: Date.now().toString(),
      name: "New Rule",
      type: "peak",
      multiplier: 1.0,
      startTime: "09:00",
      endTime: "17:00",
      days: ["monday"],
      isActive: true,
    };
    setPricingRules((prev) => [...prev, newRule]);
  };

  const removePricingRule = (id: string) => {
    setPricingRules((prev) => prev.filter((rule) => rule.id !== id));
  };



  return (
    <div className="@container/main flex flex-col gap-6 md:gap-6">
      <PageTopSection config={pageConfig} />

      <div className="flex flex-col gap-6 p-6">
        {/* Field Selection & Base Price */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Field Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="size-5" />
                Base Price
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Base Price (₹)</Label>
                <Input
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(parseInt(e.target.value) || 0)}
                  min="100"
                  max="10000"
                />
                <p className="text-sm text-gray-600">This is the default price before any multipliers are applied.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Timeline */}
        <PricingChart basePrice={basePrice} pricingRules={pricingRules} />

        {/* Pricing Rules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pricing Rules</CardTitle>
              <Button onClick={addPricingRule} size="sm">
                <Plus className="mr-2 size-4" />
                Add Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pricingRules.map((rule) => (
              <PricingRuleCard
                key={rule.id}
                rule={rule}
                onUpdate={updatePricingRule}
                onRemove={removePricingRule}
                timeSlots={timeSlots}
              />
            ))}
          </CardContent>
        </Card>

        {/* Quick Templates */}
        <PricingTemplates onApplyTemplate={setPricingRules} />
      </div>
    </div>
  );
};

export default DynamicPricingPage;
