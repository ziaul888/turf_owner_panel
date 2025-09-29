import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface PageAction {
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick: () => void;
  disabled?: boolean;
}

interface PageConfig {
  title: string;
  subtitle?: string;
  actions?: PageAction[];
}

interface PageTopSectionProps {
  config: PageConfig;
}

const PageTopSection = ({ config }: PageTopSectionProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-background sticky top-0 z-10 flex flex-col items-center justify-between gap-2 border-b py-4 transition-shadow duration-200 sm:flex-row sm:gap-4 md:p-6`}
    >
      {/* Page Title Section */}
      <div>
        <h1 className="text-2xl font-bold">{config.title}</h1>
        {config.subtitle && <p className="text-muted-foreground text-sm">{config.subtitle}</p>}
      </div>

      {/* Actions Section */}
      {config.actions && config.actions.length > 0 && (
        <div className="flex gap-2">
          {config.actions.map((action, index) => (
            <Button
              key={`${action.label}-${index}`}
              variant={action.variant ?? "default"}
              size={action.size ?? "lg"}
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageTopSection;
