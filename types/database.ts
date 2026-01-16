import { getStorageImageUrl, getStorageImageUrls } from '@/lib/storage';
import { generateSlug } from '@/lib/utils';

// Tipos para el campo pricing (JSONB)
export type PricingHourly = {
  type: 'hourly';
  weekday: number;
  weekend: number;
  minimum_hours: number;
};

export type PricingFixed = {
  type: 'fixed';
  prices: Record<string, number>; // Ejemplo: { "3H": 900, "4H": 1050 }
};

export type Pricing = PricingHourly | PricingFixed;

// Tipos de la base de datos de Supabase
export interface DatabaseBoat {
  id: string;
  title: string;
  main_image: string; // Ruta en Storage o URL completa
  max_capacity: number;
  price_per_hour: number; // Mantener para compatibilidad
  pricing: Pricing | null; // Campo JSONB flexible para precios
  images: string[]; // Array de rutas en Storage o URLs completas
  catalog_link: string | null;
  category: string | null;
  collection: string | null; // Colección/catálogo del bote (ej: "PINK COLLECTION", "FLYBRIDGE", "BOATS")
  length: string | null;
  description: string | null;
  features: string[];
  created_at: string;
  updated_at: string;
}

// Tipo compatible con la interfaz Boat existente
export interface Boat {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // Mantener para compatibilidad con componentes existentes
  pricing: Pricing | null; // Campo flexible para precios
  capacity: number;
  length: string;
  mainImage: string; // Imagen principal (main_image convertida a URL completa)
  images: string[]; // Array de URLs completas (convertidas desde Storage)
  features: string[];
  category: string;
  collection: string | null; // Colección/catálogo del bote
  catalogLink?: string;
}

// Función helper para convertir DatabaseBoat a Boat
// Convierte rutas de Storage a URLs completas automáticamente
export function mapDatabaseBoatToBoat(dbBoat: DatabaseBoat): Boat {
  // Convertir main_image a URL completa si es una ruta de Storage
  const mainImageUrl = getStorageImageUrl(dbBoat.main_image);
  
  // Convertir array de imágenes a URLs completas
  const imageUrls = dbBoat.images.length > 0 
    ? getStorageImageUrls(dbBoat.images)
    : [mainImageUrl];

  // Validar y convertir pricing si existe
  let pricing: Pricing | null = null;
  if (dbBoat.pricing) {
    try {
      // Si es un string JSON, parsearlo
      const pricingData = typeof dbBoat.pricing === 'string' 
        ? JSON.parse(dbBoat.pricing) 
        : dbBoat.pricing;
      
      // Validar que tenga el tipo correcto
      if (pricingData.type === 'hourly' || pricingData.type === 'fixed') {
        pricing = pricingData as Pricing;
      }
    } catch (error) {
      console.error('Error parsing pricing:', error);
    }
  }

  return {
    id: dbBoat.id,
    slug: generateSlug(dbBoat.title),
    name: dbBoat.title,
    description: dbBoat.description || '',
    price: Number(dbBoat.price_per_hour), // Mantener para compatibilidad
    pricing: pricing, // Campo flexible para precios
    capacity: dbBoat.max_capacity,
    length: dbBoat.length || '',
    mainImage: mainImageUrl, // Imagen principal
    images: imageUrls, // URLs completas de Supabase Storage
    features: dbBoat.features || [],
    category: dbBoat.category || '',
    collection: dbBoat.collection || null,
    catalogLink: dbBoat.catalog_link || undefined,
  };
}
