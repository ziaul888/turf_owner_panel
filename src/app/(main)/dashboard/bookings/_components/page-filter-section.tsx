import React from "react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car } from "lucide-react";
import { Card } from "@/components/ui/card";

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
  const searchFilter = filters.find(f => f.showSearch);
  const selectFilters = filters.filter(f => !f.showSearch);

  return (
    <Card className="@container/card p-6">
    <div className={`flex-col gap-4 space-y-4 ${className}`}>
      <h1 className="text-black text-[700]">{title}</h1>
      <div className="flex w-full justify-between items-center flex-wrap gap-4">
        {/* Search input on the left */}
        <div className="relative">
          {searchFilter && (
            <>
              <Label className="sr-only">{searchFilter.label}</Label>
              <input
          type="text"
          value={searchFilter.searchValue ?? ""}
          onChange={e => searchFilter.onSearchChange?.(e.target.value)}
          placeholder={`Search ${searchFilter.label}`}
          className="mb-2 w-118 rounded border px-4 py-3 text-[16px] shadow-xs outline-none focus:ring-1 focus:ring-primary rounded-md pl-10"
              />
              {/* Search icon (Magnifying glass) */}
              <span className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M16 16l-3.5-3.5"/>
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
              <Select  value={filter.value} onValueChange={filter.onValueChange}>
                <SelectTrigger
                  className="w-48 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                  size="default"
                  id={filter.id}
                >
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent align="end">
                  {filter.options.map(option => (
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