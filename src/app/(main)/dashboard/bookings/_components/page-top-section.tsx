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
  const [, setIsSticky] = useState(false);
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
      className={`bg-background sticky top-0 z-8 flex flex-col items-start justify-between gap-3 border-b px-4 py-3 transition-shadow duration-200 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-4 md:px-8 md:py-6`}
    >
      {/* Page Title Section */}
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-bold sm:text-2xl lg:text-2xl">{config.title}</h1>
        {config.subtitle && (
          <p className="text-muted-foreground mt-1 text-xs sm:text-sm lg:text-base">
            {config.subtitle}
          </p>
        )}
      </div>

      {/* Actions Section */}
      {config.actions && config.actions.length > 0 && (
        <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap">
          {config.actions.map((action, index) => (
            <Button
              key={`${action.label}-${index}`}
              variant={action.variant ?? "default"}
              size={action.size ?? "sm"}
              onClick={action.onClick}
              disabled={action.disabled}
              className="flex-1 sm:flex-none"
            >
              {action.icon && <span className="mr-1 sm:mr-2">{action.icon}</span>}
              <span className="text-xs sm:text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageTopSection;
