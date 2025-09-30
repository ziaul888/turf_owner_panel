import { TrendingUp, TrendingDown } from "lucide-react";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";
import { SectionCards, CardData } from "./_components/section-cards";

export default function Page() {
  const cardData: CardData[] = [
    {
      title: "Total Customers",
      value: "1,234",
      percentage: "-20%",
      subtitle: "Acquisition needs attention",
      icon: <TrendingDown className="size-4" />,
      className: "from-primary-foreground text-primary",
    },
    {
      title: "Total Booking",
      value: "1,234",
      percentage: "12.5%",
      subtitle: "Trending up this month",
      icon: <TrendingUp className="size-4" />,
      className: "from-primary-foreground text-accent",
    },
    {
      title: "Total Expense",
      value: "1,234",
      percentage: "12.5%",
      subtitle: "Trending up this month",
      icon: <TrendingUp className="size-4" />,
      className: "from-destructive/5 text-destructive/70",
    },
    {
      title: "Total Revenue",
      value: "1,234",
      percentage: "12.5%",
      subtitle: "Trending up this month",
      icon: <TrendingUp className="size-4" />,
      className: "from-primary-foreground text-primary",
    },
  ];

  return (
    <div className="@container/main flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <SectionCards cards={cardData} />
      <ChartAreaInteractive />
      {/* <DataTable data={data} /> */}
    </div>
  );
}
