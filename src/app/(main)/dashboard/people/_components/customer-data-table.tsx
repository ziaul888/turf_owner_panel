"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { z } from "zod";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { DataTablePagination } from "../../../../../components/data-table/data-table-pagination";
import { withDndColumn } from "../../../../../components/data-table/table-utils";
import { customerSchema } from "./customer-schema";
import { getCustomerColumns } from "./customer-columns";



export function CustomerDataTable({
  data: initialData,
  
}: {
  data: z.infer<typeof customerSchema>[];
  
}) {
  const router = useRouter();
  const [data, setData] = React.useState(() => initialData);
  const columns = withDndColumn(getCustomerColumns(router));
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id.toString() });
  console.log({ data });

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
        <div className="overflow-hidden rounded-lg border">
          <DataTableNew table={table} columns={columns} onReorder={setData} />
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
      <TabsContent value="past-performance" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}
