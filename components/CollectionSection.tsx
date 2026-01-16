import Link from 'next/link';
import FleetCard from './FleetCard';
import { Boat } from '@/types/database';

interface CollectionSectionProps {
  title: string;
  emoji: string;
  boats: Boat[];
  maxBoats?: number;
}

export default function CollectionSection({ 
  title, 
  emoji, 
  boats, 
  maxBoats = 3 
}: CollectionSectionProps) {
  const collectionBoats = boats.slice(0, maxBoats);

  if (collectionBoats.length === 0) {
    return null; // No mostrar si no hay botes
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between px-2 mb-6">
        <h3 className="text-2xl font-bold italic uppercase tracking-tighter">
          {emoji} {title}
        </h3>
        <Link
          href={`/catalogo?collection=${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`}
          className="text-secondary text-xs font-bold uppercase tracking-widest border-b border-secondary/30 pb-1 hover:border-secondary transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x px-2">
        {collectionBoats.map((boat) => (
          <FleetCard
            key={boat.id}
            id={boat.id}
            slug={boat.slug}
            name={boat.name}
            type={`${boat.length} ${boat.category}`}
            price={boat.price}
            image={boat.mainImage || '/images/placeholder.jpg'}
            isHotDeal={false}
            opacity={1}
          />
        ))}
      </div>
    </section>
  );
}
