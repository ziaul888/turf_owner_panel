import { TrendingUp, TrendingDown } from "lucide-react";
import DashBoardCard from "./DashBoardCard";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <DashBoardCard className="from-primary-foreground text-primary" title="Total Customers" value="1,234" percentage="-20%" subtitle="Acquisition needs attention" icon={<TrendingDown className="size-4" />} />
      <DashBoardCard className="from-primary-foreground text-accent" title="Total Booking" value="1,234" percentage="12.5%" subtitle="Trending up this month" icon={<TrendingUp className="size-4" />} />
      <DashBoardCard className="from-destructive/5 text-destructive/70" title="Total Expense" value="1,234" percentage="12.5%" subtitle="Trending up this month" icon={<TrendingUp className="size-4" />} />
      <DashBoardCard className="from-primary-foreground text-primary" title="Total Revenue" value="1,234" percentage="12.5%" subtitle="Trending up this month" icon={<TrendingUp className="size-4" />} />
    </div>
  );
}
