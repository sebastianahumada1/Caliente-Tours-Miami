import { notFound } from 'next/navigation';
import { getBoatById, getAllBoats } from '@/lib/boats';
import SunsetBlur from '@/components/SunsetBlur';
import BottomNav from '@/components/BottomNav';
import BoatHero from '@/components/catalogo/[id]/BoatHero';
import BoatTitle from '@/components/catalogo/[id]/BoatTitle';
import BoatGallery from '@/components/catalogo/[id]/BoatGallery';
import BoatCapacity from '@/components/catalogo/[id]/BoatCapacity';
import BoatPricing from '@/components/catalogo/[id]/BoatPricing';
import BoatIncluded from '@/components/catalogo/[id]/BoatIncluded';
import BoatExperience from '@/components/catalogo/[id]/BoatExperience';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const boats = await getAllBoats();
  return boats.map((boat) => ({
    id: boat.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const boat = await getBoatById(resolvedParams.id);
  
  if (!boat) {
    return {
      title: 'Bote no encontrado - Caliente Tours',
    };
  }

  return {
    title: `${boat.name} - Caliente Tours`,
    description: boat.description,
  };
}

export default async function BoatDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const boat = await getBoatById(resolvedParams.id);

  if (!boat) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <SunsetBlur />
      <BoatHero image={boat.images[0] || '/images/placeholder.jpg'} alt={boat.name} />
      <BoatTitle name={boat.name} />
      <BoatGallery images={boat.images} name={boat.name} />
      <main className="px-6 mt-10 space-y-6 pb-32 relative z-10">
        <BoatCapacity capacity={boat.capacity} />
        <BoatPricing basePrice={boat.price} />
        <BoatIncluded />
        <BoatExperience description={boat.description} />
      </main>
      <BottomNav />
    </div>
  );
}
