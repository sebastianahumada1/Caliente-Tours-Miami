'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CatalogBoatCardProps {
  id: string;
  slug: string;
  name: string;
  type: string;
  price: number;
  image: string;
  length: string;
  capacity: number;
  badge?: string;
  features?: Array<{ icon: string; label: string }>;
  opacity?: number;
}

export default function CatalogBoatCard({
  id,
  slug,
  name,
  type,
  price,
  image,
  length,
  capacity,
  badge,
  features = [
    { icon: 'straighten', label: length },
    { icon: 'group', label: `${capacity} Guests` },
    { icon: 'anchor', label: 'Pro Crew' },
  ],
  opacity = 1,
}: CatalogBoatCardProps) {
  return (
    <Link href={`/catalogo/${slug}`} className="block w-full max-w-3xl mx-auto">
      <div
        className="group relative bg-surface/40 rounded-3xl overflow-hidden border border-white/10 neon-glow-card hover:border-secondary/30 transition-all"
        style={{ opacity }}
      >
        <div className="h-64 relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={badge === 'Trending'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
          {badge && (
            <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              {badge}
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight mb-1 text-white">{name}</h3>
              <p className="text-secondary text-[11px] font-bold uppercase tracking-widest">{type}</p>
            </div>
            <div className="text-right">
              <span className="text-primary text-2xl font-black italic">${price.toLocaleString()}</span>
              <span className="text-gray-400 text-[10px] block uppercase font-bold">Per Hour</span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6 border-t border-white/5 pt-4 flex-wrap">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                <span className="material-symbols-outlined text-secondary text-base sm:text-lg">{feature.icon}</span>
                <span className="text-[10px] sm:text-xs font-medium text-gray-300">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
