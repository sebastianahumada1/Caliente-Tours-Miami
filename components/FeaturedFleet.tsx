import Link from 'next/link';
import FleetCard from './FleetCard';
import { Boat } from '@/types/database';

interface FeaturedFleetProps {
  maxBoats?: number;
  boats: Boat[];
}

export default function FeaturedFleet({ maxBoats = 2, boats }: FeaturedFleetProps) {
  const featuredBoats = boats.slice(0, maxBoats);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between px-2 mb-6">
        <h3 className="text-2xl font-bold italic uppercase tracking-tighter">Featured Fleet</h3>
        <Link
          href="/catalogo"
          className="text-secondary text-xs font-bold uppercase tracking-widest border-b border-secondary/30 pb-1 hover:border-secondary transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x px-2">
        {featuredBoats.map((boat, index) => (
          <FleetCard
            key={boat.id}
            id={boat.id}
            slug={boat.slug}
            name={boat.name}
            type={`${boat.length} ${boat.category}`}
            price={boat.price}
            image={boat.mainImage || '/images/placeholder.jpg'}
            isHotDeal={index === 0}
            opacity={index > 0 ? 0.7 : 1}
          />
        ))}
      </div>
    </section>
  );
}
