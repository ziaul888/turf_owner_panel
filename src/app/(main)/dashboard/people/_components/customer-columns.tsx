import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit, Trash2, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getInitials } from "@/lib/utils";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";
import { rootUser } from "../../../../../data/users";
import { customerSchema } from "./customer-schema";

export const getCustomerColumns = (
    router: ReturnType<typeof useRouter>,
): ColumnDef<z.infer<typeof customerSchema>>[] => [
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
            accessorKey: "customerId",
            header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER ID" />,
            cell: ({ row }) => <div className="w-32 font-medium">{row.original.customerId}</div>,
            enableSorting: true,
        },
        {
            accessorKey: "name",
            header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER" />,
            cell: ({ row }) => (
                <div className="w-full">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-lg">
                            <AvatarImage src={rootUser.avatar || undefined} alt={row.original.name} />
                            <AvatarFallback className="rounded-lg">{getInitials(row.original.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-sm font-medium">{row.original.name}</h1>
                            <p className="text-muted-foreground text-sm">{row.original.email}</p>
                        </div>
                    </div>
                </div>
            ),
            enableSorting: true,
        },
       
        {
            accessorKey: "joinDate",
            header: ({ column }) => <DataTableColumnHeader column={column} title="JOIN DATE" />,
            cell: ({ row }) => (
                <div className="text-sm font-medium">
                    {new Date(row.original.joinDate).toLocaleDateString()}
                </div>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "totalBookings",
            header: ({ column }) => <DataTableColumnHeader column={column} title="BOOKINGS" />,
            cell: ({ row }) => <div className="font-medium text-center">{row.original.totalBookings}</div>,
            enableSorting: true,
        },
        {
            accessorKey: "totalSpent",
            header: ({ column }) => <DataTableColumnHeader column={column} title="TOTAL SPENT" />,
            cell: ({ row }) => <div className="font-medium">{row.original.totalSpent}</div>,
            enableSorting: true,
        },
        {
            accessorKey: "membershipType",
            header: ({ column }) => <DataTableColumnHeader column={column} title="MEMBERSHIP" />,
            cell: ({ row }) => {
                const membershipType = row.original.membershipType;
                const getMembershipVariant = (type: string) => {
                    switch (type.toLowerCase()) {
                        case "premium":
                            return "default";
                        case "standard":
                            return "secondary";
                        case "basic":
                            return "outline";
                        default:
                            return "outline";
                    }
                };

                return (
                    <Badge variant={getMembershipVariant(membershipType)}>
                        {membershipType}
                    </Badge>
                );
            },
            enableSorting: true,
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title="STATUS" />,
            cell: ({ row }) => {
                const status = row.original.status;
                const getStatusVariant = (status: string) => {
                    switch (status.toLowerCase()) {
                        case "active":
                            return "default";
                        case "inactive":
                            return "secondary";
                        default:
                            return "outline";
                    }
                };

                return (
                    <Badge variant={getStatusVariant(status)}>
                        {status}
                    </Badge>
                );
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
                            const customerId = row.original.customerId.replace("#", "");
                            router.push(`/dashboard/people/customers/${customerId}`);
                        }}
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950"
                        onClick={() => {
                            toast.success(`Editing customer ${row.original.name}`);
                        }}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
                        onClick={() => {
                            toast.error(`Deleted customer ${row.original.name}`);
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
            enableSorting: false,
        },
    ];

// Export the customer columns for backward compatibility
export const customerColumns = getCustomerColumns({} as ReturnType<typeof useRouter>);
