'use client';

import { useState } from 'react';
import { Boat } from '@/types/database';

interface CatalogFiltersProps {
  boats?: Boat[];
  sizeFilter?: string;
  priceFilter?: string;
  onSizeFilterChange?: (filter: string) => void;
  onPriceFilterChange?: (filter: string) => void;
}

interface FilterOption {
  id: string;
  label: string;
  min?: number;
  max?: number;
  lengthMatch?: string;
}

export default function CatalogFilters({ 
  sizeFilter: externalSizeFilter,
  priceFilter: externalPriceFilter,
  onSizeFilterChange,
  onPriceFilterChange
}: CatalogFiltersProps) {
  const [activeFilter, setActiveFilter] = useState<'none' | 'size' | 'price'>('none');
  const [internalSizeFilter, setInternalSizeFilter] = useState<string>('');
  const [internalPriceFilter, setInternalPriceFilter] = useState<string>('');

  // Usar filtros externos si están disponibles, sino usar internos
  const sizeFilter = externalSizeFilter ?? internalSizeFilter;
  const priceFilter = externalPriceFilter ?? internalPriceFilter;

  // Opciones de filtro por tamaño (basado en length)
  const sizeOptions: FilterOption[] = [
    { id: 'small', label: 'Small (< 30ft)', max: 30 },
    { id: 'medium', label: 'Medium (30-50ft)', min: 30, max: 50 },
    { id: 'large', label: 'Large (50-70ft)', min: 50, max: 70 },
    { id: 'xlarge', label: 'X-Large (> 70ft)', min: 70 },
  ];

  // Opciones de filtro por precio (basado en price_per_hour)
  const priceOptions: FilterOption[] = [
    { id: 'budget', label: 'Budget (< $300)', max: 300 },
    { id: 'mid', label: 'Mid ($300-$600)', min: 300, max: 600 },
    { id: 'premium', label: 'Premium ($600-$1000)', min: 600, max: 1000 },
    { id: 'luxury', label: 'Luxury (> $1000)', min: 1000 },
  ];

  const handleFilterClick = (filterType: 'size' | 'price') => {
    if (activeFilter === filterType) {
      // Si ya está activo, desactivarlo
      setActiveFilter('none');
      if (onSizeFilterChange) onSizeFilterChange('');
      if (onPriceFilterChange) onPriceFilterChange('');
      setInternalSizeFilter('');
      setInternalPriceFilter('');
    } else {
      setActiveFilter(filterType);
    }
  };

  const handleOptionClick = (filterId: string) => {
    if (activeFilter === 'size') {
      const newFilter = sizeFilter === filterId ? '' : filterId;
      setInternalSizeFilter(newFilter);
      if (onSizeFilterChange) onSizeFilterChange(newFilter);
    } else if (activeFilter === 'price') {
      const newFilter = priceFilter === filterId ? '' : filterId;
      setInternalPriceFilter(newFilter);
      if (onPriceFilterChange) onPriceFilterChange(newFilter);
    }
  };

  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap mb-4">
        <button
          onClick={() => handleFilterClick('size')}
          className={`px-5 py-2 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${
            activeFilter === 'size'
              ? 'border-secondary bg-secondary/10 text-secondary'
              : 'border-secondary/40 bg-white/5 text-white/80'
          }`}
        >
          Size
          <span className={`material-symbols-outlined text-sm transition-transform ${activeFilter === 'size' ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>
        <button
          onClick={() => handleFilterClick('price')}
          className={`px-5 py-2 rounded-full border text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-colors ${
            activeFilter === 'price'
              ? 'border-secondary bg-secondary/10 text-secondary'
              : 'border-secondary/40 bg-white/5 text-white/80'
          }`}
        >
          Price
          <span className={`material-symbols-outlined text-sm transition-transform ${activeFilter === 'price' ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>
      </div>

      {/* Opciones de filtro de tamaño */}
      {activeFilter === 'size' && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2">
          {sizeOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wide transition-colors ${
                sizeFilter === option.id
                  ? 'border-secondary bg-secondary/20 text-secondary'
                  : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Opciones de filtro de precio */}
      {activeFilter === 'price' && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2">
          {priceOptions.map(option => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wide transition-colors ${
                priceFilter === option.id
                  ? 'border-secondary bg-secondary/20 text-secondary'
                  : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
