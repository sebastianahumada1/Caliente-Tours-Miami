import SunsetBlur from '@/components/SunsetBlur';
import CatalogHeader from '@/components/catalogo/CatalogHeader';
import CatalogFilters from '@/components/catalogo/CatalogFilters';
import CatalogBoatCard from '@/components/catalogo/CatalogBoatCard';
import { getAllBoats } from '@/lib/boats';

export const metadata = {
  title: 'Catálogo de Botes - Caliente Tours',
  description: 'Explora nuestra amplia selección de botes y yates disponibles para alquiler.',
};

export default async function CatalogoPage() {
  const boats = await getAllBoats();

  return (
    <>
      <SunsetBlur />
      <CatalogHeader title="All Fleet" />
      <CatalogFilters />
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-8 mt-4">
        {boats.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No hay botes disponibles en este momento.</p>
          </div>
        ) : (
          boats.map((boat, index) => (
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
          ))
        )}
      </main>
    </>
  );
}
