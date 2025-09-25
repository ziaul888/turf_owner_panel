import React from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  id: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
  value?: string;
  onValueChange?: (value: string) => void;
}

interface PageFilterSectionProps {
  title?: string;
  filters: FilterConfig[];
  className?: string;
}

const PageFilterSection: React.FC<PageFilterSectionProps> = ({
  title = "Filter and Search",
  filters,
  className = "",
}) => {
  return (
    <div className={`flex-col gap-4 space-y-4 ${className}`}>
      <h1 className="text-black">{title}</h1>
      <div className="flex w-full flex-wrap gap-4">
        {filters.map((filter) => (
          <div key={filter.id} className="">
            <Label className="sr-only">{filter.label}</Label>
            <Select value={filter.value} onValueChange={filter.onValueChange}>
              <SelectTrigger
                className="w-48 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                size="lg"
                id={filter.id}
              >
                <SelectValue placeholder={filter.placeholder} />
              </SelectTrigger>
              <SelectContent align="end">
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageFilterSection;
