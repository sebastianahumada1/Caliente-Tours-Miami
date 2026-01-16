import { notFound } from 'next/navigation';
import { getBoatBySlug, getAllBoats } from '@/lib/boats';
import SunsetBlur from '@/components/SunsetBlur';
import BoatHero from '@/components/catalogo/[slug]/BoatHero';
import BoatTitle from '@/components/catalogo/[slug]/BoatTitle';
import BoatGallery from '@/components/catalogo/[slug]/BoatGallery';
import BoatCapacity from '@/components/catalogo/[slug]/BoatCapacity';
import BoatPricing from '@/components/catalogo/[slug]/BoatPricing';
import BoatIncluded from '@/components/catalogo/[slug]/BoatIncluded';
import BoatExperience from '@/components/catalogo/[slug]/BoatExperience';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const boats = await getAllBoats();
  return boats.map((boat) => ({
    slug: boat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const boat = await getBoatBySlug(resolvedParams.slug);
  
  if (!boat) {
    return {
      title: 'Bote no encontrado - Caliente Tours',
    };
  }

  // Obtener la imagen principal (main.jpg)
  const mainImage = boat.mainImage || '/images/placeholder.jpg';
  
  // Crear URL absoluta para la imagen
  // Las imágenes de Supabase Storage ya son URLs absolutas
  const imageUrl = mainImage.startsWith('http')
    ? mainImage
    : mainImage.startsWith('/')
    ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}${mainImage}`
    : mainImage;

  // URL canónica de la página (usar la URL del sitio si está disponible)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const pageUrl = `${siteUrl}/catalogo/${boat.slug}/`;

  return {
    title: `${boat.name} - Caliente Tours`,
    description: boat.description || `Alquila el ${boat.name} en Caliente Tours. Capacidad para ${boat.capacity} personas.`,
    openGraph: {
      title: `${boat.name} - Caliente Tours`,
      description: boat.description || `Alquila el ${boat.name} en Caliente Tours. Capacidad para ${boat.capacity} personas.`,
      url: pageUrl,
      siteName: 'Caliente Tours',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: boat.name,
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${boat.name} - Caliente Tours`,
      description: boat.description || `Alquila el ${boat.name} en Caliente Tours. Capacidad para ${boat.capacity} personas.`,
      images: [imageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function BoatDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const boat = await getBoatBySlug(resolvedParams.slug);

  if (!boat) {
    notFound();
  }

  return (
    <div className="relative min-h-screen">
      <SunsetBlur />
      <BoatHero image={boat.mainImage || '/images/placeholder.jpg'} alt={boat.name} />
      <BoatTitle name={boat.name} />
      <BoatGallery images={boat.images} name={boat.name} catalogLink={boat.catalogLink} />
      <main className="px-6 mt-10 space-y-6 pb-32 relative z-10">
        <BoatCapacity capacity={boat.capacity} />
        <BoatPricing pricing={boat.pricing} basePrice={boat.price} />
        <BoatIncluded />
        <BoatExperience description={boat.description} />
      </main>
    </div>
  );
}
