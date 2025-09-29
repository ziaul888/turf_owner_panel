import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentDetailsProps {
  method: string;
  transactionId: string;
  date: string;
  gateway: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  method,
  transactionId,
  date,
  gateway,
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold">Payment Details</h3>

      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 font-medium">Payment Method</p>
          <p className="text-gray-900">**** **** **** 4532</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 font-medium">Transaction ID</p>
          <p className="text-gray-900">TXN-2024-001234567</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 font-medium">Payment Date</p>
          <p className="text-gray-900">Dec 18, 2024 at 3:45 PM</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 font-medium">Gateway</p>
          <p className="text-gray-900">Razorpay</p>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
