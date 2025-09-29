import React from "react";
import { Separator } from "@/components/ui/separator";


const PaymentSummary: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Summary</h3>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-gray-700">Turf booking</h1>
        <p className="text-gray-900">$150</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-gray-700">Platform Fee</h1>
        <p className="text-gray-900">$150</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-gray-600">Equipment Rental</h1>
        <p className="text-gray-900">$150</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-gray-700">Refreshments</h1>
        <p className="text-gray-900">$150</p>
      </div>
      <Separator />

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-gray-700 font-bold">Total</h1>
        <p className="font-bold">$600</p>
      </div>
    </div>
  );
};

export default PaymentSummary;
