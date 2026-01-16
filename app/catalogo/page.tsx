import SunsetBlur from '@/components/SunsetBlur';
import Header from '@/components/Header';
import CatalogClient from './CatalogClient';
import { getAllBoats } from '@/lib/boats';

export const metadata = {
  title: 'Catálogo de Botes - Caliente Tours',
  description: 'Explora nuestra amplia selección de botes y yates disponibles para alquiler.',
};

// Forzar renderizado dinámico (no usar cache estático)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CatalogoPage() {
  const boats = await getAllBoats();

  return (
    <>
      <SunsetBlur />
      <Header />
      <CatalogClient boats={boats} />
    </>
  );
}
