'use client';

import { useMemo } from 'react';
import CatalogBoatCard from './CatalogBoatCard';
import { Boat } from '@/types/database';

interface CatalogBoatsListProps {
  boats: Boat[];
  sizeFilter?: string;
  priceFilter?: string;
}

export default function CatalogBoatsList({ boats, sizeFilter, priceFilter }: CatalogBoatsListProps) {
  // Filtrar botes basado en los filtros
  const filteredBoats = useMemo(() => {
    let filtered = [...boats];

    // Filtrar por tamaño
    if (sizeFilter) {
      const lengthNum = parseInt(sizeFilter.replace(/\D/g, '')) || 0;
      filtered = filtered.filter(boat => {
        const boatLength = parseInt(boat.length.replace(/\D/g, '')) || 0;
        if (sizeFilter === 'small') return boatLength < 30;
        if (sizeFilter === 'medium') return boatLength >= 30 && boatLength < 50;
        if (sizeFilter === 'large') return boatLength >= 50 && boatLength < 70;
        if (sizeFilter === 'xlarge') return boatLength >= 70;
        return true;
      });
    }

    // Filtrar por precio
    if (priceFilter) {
      filtered = filtered.filter(boat => {
        const price = boat.price;
        if (priceFilter === 'budget') return price < 300;
        if (priceFilter === 'mid') return price >= 300 && price < 600;
        if (priceFilter === 'premium') return price >= 600 && price < 1000;
        if (priceFilter === 'luxury') return price >= 1000;
        return true;
      });
    }

    return filtered;
  }, [boats, sizeFilter, priceFilter]);

  if (filteredBoats.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No hay botes disponibles con estos filtros.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {filteredBoats.map((boat, index) => (
        <CatalogBoatCard
          key={boat.id}
          id={boat.id}
          slug={boat.slug}
          name={boat.name}
          type={boat.category}
          price={boat.price}
          image={boat.mainImage || '/images/placeholder.jpg'}
          length={boat.length}
          capacity={boat.capacity}
          badge={index === 0 ? 'Trending' : undefined}
          opacity={index > 1 ? 0.9 : 1}
          features={[
            { icon: 'straighten', label: boat.length },
            { icon: 'group', label: `${boat.capacity} Guests` },
            { icon: boat.id === '2' ? 'water_lux' : boat.id === '3' ? 'speed' : 'anchor', label: boat.id === '2' ? 'Jacuzzi' : boat.id === '3' ? 'Fast' : 'Pro Crew' },
          ]}
        />
      ))}
    </div>
  );
}
