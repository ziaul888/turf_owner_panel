import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Loader, Eye, Check, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getInitials } from "@/lib/utils";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";
import { rootUser } from "../../../../../data/users";

import { sectionSchema } from "./schema";

export const getDashboardColumns = (
  router: ReturnType<typeof useRouter>,
): ColumnDef<z.infer<typeof sectionSchema>>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "bookingId",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BOOKING ID" />,
    cell: ({ row }) => <div className="w-32 font-medium">{row.original.bookingId}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER" />,
    cell: ({ row }) => (
      <div className="w-full">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={rootUser.avatar || undefined} alt={row.original.customer} />
            <AvatarFallback className="rounded-lg">{getInitials(row.original.customer)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-sm font-medium">{row.original.customer}</h1>
            <p className="text-muted-foreground text-sm">customer@example.com</p>
          </div>
        </div>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "sportType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SPORT TYPE" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground">
        {row.original.sportType}
      </Badge>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => <DataTableColumnHeader column={column} title="DATE & TIME" />,
    cell: ({ row }) => {
      const [date, time] = row.original.dateTime.split(" ");
      return (
        <div className="text-sm">
          <div className="font-medium">{date}</div>
          <div className="text-muted-foreground">{time}</div>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="AMOUNT" />,
    cell: ({ row }) => <div className="font-medium">{row.original.amount}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
    cell: ({ row }) => {
      const status = row.original.status;
      const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
          case "confirmed":
            return "default";
          case "pending":
            return "secondary";
          case "cancelled":
            return "destructive";
          default:
            return "outline";
        }
      };

      return (
        <Badge variant={getStatusVariant(status)} className="gap-1">
          {status === "Confirmed" ? (
            <CircleCheck className="h-3 w-3" />
          ) : status === "Pending" ? (
            <Loader className="h-3 w-3 animate-spin" />
          ) : (
            <X className="h-3 w-3" />
          )}
          {status}
        </Badge>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PAYMENT" />,
    cell: ({ row }) => {
      const paymentStatus = row.original.payment;
      const getPaymentVariant = (payment: string) => {
        switch (payment.toLowerCase()) {
          case "paid":
            return "default";
          case "unpaid":
            return "secondary";
          case "refunded":
            return "outline";
          default:
            return "secondary";
        }
      };

      return <Badge variant={getPaymentVariant(paymentStatus)}>{paymentStatus}</Badge>;
    },
    enableSorting: true,
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ACTIONS" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950"
          onClick={() => {
            const bookingId = row.original.bookingId.replace("#", "");
            router.push(`/dashboard/bookings/${bookingId}`);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950"
          onClick={() => {
            toast.success(`Confirmed booking ${row.original.bookingId}`);
          }}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
          onClick={() => {
            toast.error(`Cancelled booking ${row.original.bookingId}`);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    ),
    enableSorting: false,
  },
];

// Export the original columns for backward compatibility
export const dashboardColumns = getDashboardColumns({} as ReturnType<typeof useRouter>);
