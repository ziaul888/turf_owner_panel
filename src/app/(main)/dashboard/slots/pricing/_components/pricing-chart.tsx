import React from "react";
import { TrendingUp } from "lucide-react";
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

interface PricingChartProps {
  basePrice: number;
  pricingRules: PricingRule[];
}

export const PricingChart: React.FC<PricingChartProps> = ({ basePrice, pricingRules }) => {
  const getPriceForTime = (hour: number) => {
    const finalPrice = basePrice;
    let appliedMultiplier = 1.0;

    // Find the highest multiplier for this time
    pricingRules.forEach((rule) => {
      if (!rule.isActive) return;

      const startHour = parseInt(rule.startTime.split(":")[0]);
      const endHour = parseInt(rule.endTime.split(":")[0]);

      if (hour >= startHour && hour < endHour) {
        if (rule.multiplier > appliedMultiplier) {
          appliedMultiplier = rule.multiplier;
        }
      }
    });

    return Math.round(finalPrice * appliedMultiplier);
  };

  const getColorForMultiplier = (multiplier: number) => {
    if (multiplier >= 1.4) return "bg-red-500";
    if (multiplier >= 1.2) return "bg-orange-500";
    if (multiplier >= 1.0) return "bg-green-500";
    return "bg-blue-500";
  };

  const getMultiplierForTime = (hour: number) => {
    let appliedMultiplier = 1.0;

    pricingRules.forEach((rule) => {
      if (!rule.isActive) return;

      const startHour = parseInt(rule.startTime.split(":")[0]);
      const endHour = parseInt(rule.endTime.split(":")[0]);

      if (hour >= startHour && hour < endHour) {
        if (rule.multiplier > appliedMultiplier) {
          appliedMultiplier = rule.multiplier;
        }
      }
    });

    return appliedMultiplier;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="size-5" />
          24-Hour Pricing Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Price Chart */}
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 24 }, (_, i) => {
              const price = getPriceForTime(i);
              const multiplier = getMultiplierForTime(i);
              const maxPrice = Math.max(...Array.from({ length: 24 }, (_, j) => getPriceForTime(j)));
              const height = (price / maxPrice) * 100;

              return (
                <div key={i} className="flex flex-col items-center">
                  <div className="mb-1 text-xs font-medium">₹{price}</div>
                  <div
                    className={`w-full rounded-t ${getColorForMultiplier(multiplier)} transition-all duration-300`}
                    style={{ height: `${Math.max(height, 20)}px` }}
                  />
                  <div className="mt-1 text-xs text-gray-500">{i}:00</div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-blue-500" />
              <span>Discount (0.5x-0.9x)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-green-500" />
              <span>Standard (1.0x-1.1x)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-orange-500" />
              <span>Peak (1.2x-1.3x)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-red-500" />
              <span>Premium (1.4x+)</span>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                ₹{Math.min(...Array.from({ length: 24 }, (_, i) => getPriceForTime(i)))}
              </div>
              <div className="text-sm text-gray-600">Lowest Price</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">₹{basePrice}</div>
              <div className="text-sm text-gray-600">Base Price</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">
                ₹{Math.max(...Array.from({ length: 24 }, (_, i) => getPriceForTime(i)))}
              </div>
              <div className="text-sm text-gray-600">Highest Price</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};