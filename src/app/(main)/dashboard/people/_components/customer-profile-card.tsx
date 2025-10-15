"use client";

import React from "react";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit,
  MoreHorizontal
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { Customer } from "./customer-schema";

interface CustomerProfileCardProps {
  customer: Customer;
  onEdit?: () => void;
  onDelete?: () => void;
  onViewDetails?: () => void;
}

export const CustomerProfileCard: React.FC<CustomerProfileCardProps> = ({
  customer,
  onEdit,
  onDelete,
  onViewDetails
}) => {
  const getMembershipColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "premium": return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "standard": return "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
      case "basic": return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
      default: return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    return status.toLowerCase() === "active" 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt={customer.name} />
              <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">{customer.customerId}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onViewDetails && (
                <DropdownMenuItem onClick={onViewDetails}>
                  View Details
                </DropdownMenuItem>
              )}
              {onEdit && (
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Customer
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  Delete Customer
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Joined {new Date(customer.joinDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold">{customer.totalBookings}</p>
            <p className="text-xs text-muted-foreground">Bookings</p>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <p className="text-2xl font-bold">{customer.totalSpent}</p>
            <p className="text-xs text-muted-foreground">Total Spent</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-between pt-2">
          <Badge className={getMembershipColor(customer.membershipType)}>
            {customer.membershipType}
          </Badge>
          <Badge variant="outline" className={getStatusColor(customer.status)}>
            {customer.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};