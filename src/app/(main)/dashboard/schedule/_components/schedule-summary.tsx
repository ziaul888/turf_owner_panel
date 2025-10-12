import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ScheduleSummaryProps {
  selectedVenue?: { name: string };
  selectedCategory?: { name: string };
  watchedValues: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    basePrice: string;
    peakMultiplier: string;
    maxBookings: string;
    isRecurring: boolean;
    recurringWeeks?: string;
  };
  calculateDuration: () => string;
  calculateFinalPrice: () => number;
  formatTime: (time: string) => string;
  isSubmitting: boolean;
  isValid: boolean;
}

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-sm text-gray-600">{label}:</span>
    <span className="text-right font-medium">{value}</span>
  </div>
);

const PricingRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-sm text-gray-600">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);

const RecurringInfo = ({ recurringWeeks }: { recurringWeeks?: string }) => (
  <div className="rounded-lg bg-blue-50 p-3">
    <div className="text-sm text-blue-900">
      <div className="mb-1 font-medium">Recurring Schedule</div>
      <div>Duration: {recurringWeeks} weeks</div>
      <div>Total slots: {recurringWeeks} slots</div>
    </div>
  </div>
);

export const ScheduleSummary = ({
  selectedVenue,
  selectedCategory,
  watchedValues,
  calculateDuration,
  calculateFinalPrice,
  formatTime,
  isSubmitting,
  isValid,
}: ScheduleSummaryProps) => {
  const getTimeDisplay = () => {
    if (watchedValues.startTime && watchedValues.endTime) {
      return `${formatTime(watchedValues.startTime)} - ${formatTime(watchedValues.endTime)}`;
    }
    return "Not set";
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Schedule Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <SummaryRow label="Venue" value={selectedVenue?.name ?? "Not selected"} />
          <SummaryRow label="Day" value={watchedValues.dayOfWeek ?? "Not selected"} />
          <SummaryRow label="Time" value={getTimeDisplay()} />
          <SummaryRow label="Duration" value={calculateDuration() ?? "Not calculated"} />
          <SummaryRow label="Category" value={selectedCategory?.name ?? "Not selected"} />
          <SummaryRow label="Max Bookings" value={watchedValues.maxBookings ?? "Not set"} />
        </div>

        <div className="space-y-3 border-t pt-4">
          <PricingRow label="Base Price" value={`₹${watchedValues.basePrice ?? "0"}`} />
          <PricingRow label="Peak Multiplier" value={`${watchedValues.peakMultiplier ?? "1.0"}x`} />
          <div className="border-t pt-3">
            <div className="flex justify-between">
              <span className="font-semibold">Final Price:</span>
              <span className="text-lg font-bold text-green-600">₹{calculateFinalPrice().toFixed(0)}</span>
            </div>
          </div>
        </div>

        {watchedValues.isRecurring && <RecurringInfo recurringWeeks={watchedValues.recurringWeeks} />}

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isSubmitting || !isValid}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                Creating...
              </>
            ) : (
              <>
                <Calendar className="mr-2 size-4" />
                Create Schedule
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
