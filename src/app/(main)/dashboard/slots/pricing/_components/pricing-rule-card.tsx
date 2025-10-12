import React from "react";
import { Trash2, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

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

interface PricingRuleCardProps {
  rule: PricingRule;
  onUpdate: (id: string, updates: Partial<PricingRule>) => void;
  onRemove: (id: string) => void;
  timeSlots: string[];
}

const daysOfWeek = [
  { id: "monday", name: "Mon" },
  { id: "tuesday", name: "Tue" },
  { id: "wednesday", name: "Wed" },
  { id: "thursday", name: "Thu" },
  { id: "friday", name: "Fri" },
  { id: "saturday", name: "Sat" },
  { id: "sunday", name: "Sun" },
];

export const PricingRuleCard: React.FC<PricingRuleCardProps> = ({
  rule,
  onUpdate,
  onRemove,
  timeSlots,
}) => {
  return (
    <Card className={`border-l-4 ${rule.isActive ? "border-l-green-500" : "border-l-gray-300"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{rule.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdate(rule.id, { isActive: !rule.isActive })}
              className={rule.isActive ? "text-green-600" : "text-gray-400"}
            >
              {rule.isActive ? "Active" : "Inactive"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onRemove(rule.id)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor={`name-${rule.id}`}>Rule Name</Label>
            <Input
              id={`name-${rule.id}`}
              value={rule.name}
              onChange={(e) => onUpdate(rule.id, { name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor={`type-${rule.id}`}>Type</Label>
            <Select value={rule.type} onValueChange={(value) => onUpdate(rule.id, { type: value as PricingRule["type"] })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="peak">Peak Hours</SelectItem>
                <SelectItem value="off-peak">Off-Peak</SelectItem>
                <SelectItem value="weekend">Weekend</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Price Multiplier: {rule.multiplier}x</Label>
          <Slider
            value={[rule.multiplier]}
            onValueChange={([value]) => onUpdate(rule.id, { multiplier: value })}
            max={3}
            min={0.5}
            step={0.1}
            className="mt-2"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>0.5x</span>
            <span>3.0x</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor={`start-${rule.id}`} className="flex items-center gap-1">
              <Clock className="size-4" />
              Start Time
            </Label>
            <Select value={rule.startTime} onValueChange={(value) => onUpdate(rule.id, { startTime: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`end-${rule.id}`} className="flex items-center gap-1">
              <Clock className="size-4" />
              End Time
            </Label>
            <Select value={rule.endTime} onValueChange={(value) => onUpdate(rule.id, { endTime: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-1">
            <Calendar className="size-4" />
            Active Days
          </Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <Button
                key={day.id}
                variant={rule.days.includes(day.id) ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const newDays = rule.days.includes(day.id)
                    ? rule.days.filter((d) => d !== day.id)
                    : [...rule.days, day.id];
                  onUpdate(rule.id, { days: newDays });
                }}
              >
                {day.name}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};