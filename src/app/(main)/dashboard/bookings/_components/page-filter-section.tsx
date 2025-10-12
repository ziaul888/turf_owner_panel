import React from "react";

import { Card } from "@/components/ui/card";
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
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
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
  // Separate search filter and select filters
  const searchFilter = filters.find((f) => f.showSearch);
  const selectFilters = filters.filter((f) => !f.showSearch);

  return (
    <Card className="@container/card p-6">
      <div className={`flex-col gap-4 space-y-4 ${className}`}>
        <h1 className="font-bold text-black">{title}</h1>
        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          {/* Search input on the left */}
          <div className="relative">
            {searchFilter && (
              <>
                <Label className="sr-only">{searchFilter.label}</Label>
                <input
                  type="text"
                  value={searchFilter.searchValue ?? ""}
                  onChange={(e) => searchFilter.onSearchChange?.(e.target.value)}
                  placeholder={`Search ${searchFilter.label}`}
                  className="focus:ring-primary mb-2 w-72 rounded-md border px-4 py-3 pl-10 text-base shadow-sm outline-none focus:ring-1"
                />
                {/* Search icon (Magnifying glass) */}
                <span className="pointer-events-none absolute top-4 left-3 text-gray-400">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M16 16l-3.5-3.5" />
                  </svg>
                </span>
              </>
            )}
          </div>

          {/* Select boxes on the right */}
          <div className="flex gap-4">
            {selectFilters.map((filter) => (
              <div key={filter.id}>
                <Label className="sr-only">{filter.label}</Label>
                <Select value={filter.value} onValueChange={filter.onValueChange}>
                  <SelectTrigger className="w-48" size="default" id={filter.id}>
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
      </div>
    </Card>
  );
};

export default PageFilterSection;
