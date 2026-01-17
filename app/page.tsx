import SunsetBlur from '@/components/SunsetBlur';
import Header from '@/components/Header';
import LiveStatus from '@/components/LiveStatus';
import CollectionSection from '@/components/CollectionSection';
import GuestStories from '@/components/GuestStories';
import { getAllBoats, getBoatsByCollection } from '@/lib/boats';

// Forzar renderizado dinámico (no usar cache estático)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Obtener botes por colección desde la base de datos
  const [pinkCollection, flybridgeBoats, allBoats] = await Promise.all([
    getBoatsByCollection('PINK COLLECTION'),
    getBoatsByCollection('FLYBRIDGE'),
    getBoatsByCollection('BOATS'),
  ]);

  return (
    <>
      <SunsetBlur />
      <Header />
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <LiveStatus />
        <CollectionSection 
          title="PINK COLLECTION" 
          emoji="🩷" 
          boats={pinkCollection} 
        />
        <CollectionSection 
          title="FLYBRIDGE" 
          emoji="❤️" 
          boats={flybridgeBoats} 
        />
        <CollectionSection 
          title="BOATS" 
          emoji="💙" 
          boats={allBoats} 
        />
        <GuestStories />
      </main>
    </>
  );
}
