"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { CustomerProfileCard } from "./customer-profile-card";
import { Customer } from "./customer-schema";

interface CustomerGridViewProps {
  customers: Customer[];
  onCustomerUpdate?: (customer: Customer) => void;
  onCustomerDelete?: (customerId: string) => void;
}

export const CustomerGridView: React.FC<CustomerGridViewProps> = ({
  customers,
  onCustomerUpdate,
  onCustomerDelete
}) => {
  const router = useRouter();

  const handleViewDetails = (customer: Customer) => {
    const customerId = customer.customerId.replace("#CU-", "");
    router.push(`/dashboard/people/customers/${customerId}`);
  };

  const handleEdit = (customer: Customer) => {
    toast.info(`Edit functionality for ${customer.name} - Coming soon!`);
    // TODO: Implement edit functionality
    if (onCustomerUpdate) {
      onCustomerUpdate(customer);
    }
  };

  const handleDelete = (customer: Customer) => {
    toast.error(`Delete functionality for ${customer.name} - Coming soon!`);
    // TODO: Implement delete functionality
    if (onCustomerDelete) {
      onCustomerDelete(customer.customerId);
    }
  };

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">No customers found</h3>
          <p className="text-muted-foreground">
            No customers match your current filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {customers.map((customer) => (
        <CustomerProfileCard
          key={customer.id}
          customer={customer}
          onViewDetails={() => handleViewDetails(customer)}
          onEdit={() => handleEdit(customer)}
          onDelete={() => handleDelete(customer)}
        />
      ))}
    </div>
  );
};