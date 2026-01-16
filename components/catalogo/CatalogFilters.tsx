'use client';

import { useState } from 'react';

interface Filter {
  id: string;
  label: string;
  isActive?: boolean;
}

interface CatalogFiltersProps {
  filters?: Filter[];
}

export default function CatalogFilters({ 
  filters = [
    { id: 'size', label: 'Size', isActive: true },
    { id: 'price', label: 'Price', isActive: false },
  ]
}: CatalogFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<Filter[]>(filters);

  const handleFilterClick = (filterId: string) => {
    setActiveFilters(prev =>
      prev.map(filter =>
        filter.id === filterId
          ? { ...filter, isActive: !filter.isActive }
          : { ...filter, isActive: false }
      )
    );
  };

  return (
    <div className="relative z-20 px-6 py-4 flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap">
      {activeFilters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`px-5 py-2 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${
            filter.isActive
              ? 'border-secondary bg-secondary/10 text-secondary'
              : 'border-secondary/40 bg-white/5 text-white/80'
          }`}
        >
          {filter.label}
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
      ))}
    </div>
  );
}
