import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { users } from "@/data/users";
import { getInitials } from "@/lib/utils";

import { Booking } from "../types";

interface BookingInformationProps {
  booking: Booking;
  title: string;
}

const CustomerInformation: React.FC<BookingInformationProps> = ({ title }) => {
  return (
    <Card className="@container/card p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <Avatar className="size-9 cursor-pointer rounded-lg">
              <AvatarImage src={users[0].avatar || undefined} alt={users[0].name} />
              <AvatarFallback className="rounded-lg">{getInitials(users[0].name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-muted-foreground text-sm">Full Name</p>
              <p className="font-medium">Bappy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="font-medium">example@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Phone</p>
              <p className="font-medium">01676217559</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <p className="text-muted-foreground text-sm">Member Since</p>
              <p className="font-medium">March 2023</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CustomerInformation;
