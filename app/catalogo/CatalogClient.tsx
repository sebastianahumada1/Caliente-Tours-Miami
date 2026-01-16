'use client';

import { useState } from 'react';
import CatalogFilters from '@/components/catalogo/CatalogFilters';
import CatalogBoatsList from '@/components/catalogo/CatalogBoatsList';
import { Boat } from '@/types/database';

interface CatalogClientProps {
  boats: Boat[];
}

export default function CatalogClient({ boats }: CatalogClientProps) {
  const [sizeFilter, setSizeFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('');

  return (
    <>
      <CatalogFilters
        sizeFilter={sizeFilter}
        priceFilter={priceFilter}
        onSizeFilterChange={setSizeFilter}
        onPriceFilterChange={setPriceFilter}
      />
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-4">
        <CatalogBoatsList
          boats={boats}
          sizeFilter={sizeFilter}
          priceFilter={priceFilter}
        />
      </main>
    </>
  );
}
