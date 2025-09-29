import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, Loader, EllipsisVertical } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { DataTableColumnHeader } from "../../../../../components/data-table/data-table-column-header";

import { sectionSchema } from "./schema";
import { TableCellViewer } from "./table-cell-viewer";
import Image from "next/image";
import {rootUser} from "../../../../../data/users"

import { AvatarFallback,Avatar, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
export const dashboardColumns: ColumnDef<z.infer<typeof sectionSchema>>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <div className="flex items-center justify-center">
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex items-center justify-center">
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "header",
    header: ({ column }) => <DataTableColumnHeader column={column} title="BOOKING ID" />,
    cell: ({ row }) => (
      <div className="w-32">
          {row.original.header}
      </div>
    ),
    enableSorting: false,
  },
  
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="CUSTOMER" />,
    cell: ({ row }) => (
      <div className="w-full">
        <div className="flex gap-2 items-center">
           <Avatar className="h-10 w-10 rounded-lg grayscale">
                <AvatarImage src={rootUser.avatar || undefined} alt={rootUser.name} />
                <AvatarFallback className="rounded-lg">{getInitials(rootUser.name)}</AvatarFallback>
              </Avatar>
          <div>
            <h1 className="text-sm">{row.original.type}</h1>
            <p className="text-sm text-gray-500">ziaul@gmail.com</p>
          </div>
        </div>
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="SPORT TYPE" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "Done" ? (
          <CircleCheck className="stroke-border fill-green-500 dark:fill-green-400" />
        ) : (
          <Loader />
        )}
        {row.original.status}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "target",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="DATE & TIME" />,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Target
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "limit",
    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="AMOUNT" />,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          Limit
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-left shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.limit}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "reviewer",    header: ({ column }) => <DataTableColumnHeader className="w-full text-left" column={column} title="STATUS" />,
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "Booking",
    header: ({ column }) => <DataTableColumnHeader column={column} title="PAYMENT" />,
    cell: ({ row }) => (
      <div className="w-32">
          {row.original.header}
      </div>
    ),
    enableSorting: false,
  },
  {
     accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ACTION" />,
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
    enableSorting: false,
    //id: "actions",
    // cell: () => (
    //   <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //       <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer" size="icon">
    //         <EllipsisVertical />
    //         <span className="sr-only">Open menu</span>
    //       </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent align="end" className="w-32">
    //       <DropdownMenuItem>Edit</DropdownMenuItem>
    //       <DropdownMenuItem>Make a copy</DropdownMenuItem>
    //       <DropdownMenuItem>Favorite</DropdownMenuItem>
    //       <DropdownMenuSeparator />
    //       <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
    //     </DropdownMenuContent>
    //   </DropdownMenu>
    // ),
    enableSorting: false,
  },
];
