import { Calendar, Clock, MapPin, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingCardProps {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  location?: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  price?: number;
  onEdit?: (id: string) => void;
  onCancel?: (id: string) => void;
}

export function BookingCard({
  id,
  customerName,
  service,
  date,
  time,
  location,
  status,
  price,
  onEdit,
  onCancel,
}: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{service}</CardTitle>
          <Badge className={getStatusColor(status)}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{customerName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>

        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        )}

        {price && <div className="text-lg font-semibold text-green-600">${price.toFixed(2)}</div>}

        <div className="flex gap-2 pt-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(id)} className="flex-1">
              Edit
            </Button>
          )}
          {onCancel && status !== "cancelled" && (
            <Button variant="destructive" size="sm" onClick={() => onCancel(id)} className="flex-1">
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
