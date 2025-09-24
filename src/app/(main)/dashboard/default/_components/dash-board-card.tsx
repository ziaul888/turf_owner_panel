import React from "react";

import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashBoardCardProps {
  title: string;
  value: string;
  percentage: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
}

export default function DashBoardCard({ title, value, percentage, subtitle, icon, className }: DashBoardCardProps) {
  return (
    <Card className={cn("@container/card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardDescription>{title}</CardDescription>
        <div className="text-muted-foreground h-4 w-4">{icon}</div>
      </CardHeader>
      <div className="px-6 pb-1">
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value}</CardTitle>
      </div>
      <CardFooter className="flex-col items-start gap-1 pt-0 text-sm">
        <div className="flex items-center gap-1 text-xs">
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="mr-1 h-3 w-3" />+{percentage}
          </Badge>
        </div>
        <div className="text-muted-foreground">{subtitle}</div>
      </CardFooter>
    </Card>
  );
}
