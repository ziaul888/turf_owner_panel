import React from "react";

import DashBoardCard from "./dash-board-card";

export interface CardData {
  title: string;
  value: string;
  percentage: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
}

interface SectionCardsProps {
  cards: CardData[];
}

export function SectionCards({ cards }: SectionCardsProps) {
  return (
    <div className="*:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card, index) => (
        <DashBoardCard
          key={index}
          className={card.className}
          title={card.title}
          value={card.value}
          percentage={card.percentage}
          subtitle={card.subtitle}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
