import { supabase } from './supabase';
import { DatabaseBoat, Boat, mapDatabaseBoatToBoat } from '@/types/database';

// Obtener todos los botes desde Supabase (sin límite)
export async function getAllBoats(): Promise<Boat[]> {
  try {
    console.log('[Boats] Fetching all boats from Supabase...');
    
    // Supabase tiene un límite por defecto de 1000 registros
    // Usamos range() para obtener todos los registros en lotes si es necesario
    let allData: DatabaseBoat[] = [];
    let from = 0;
    const batchSize = 1000;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await supabase
        .from('boats')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, from + batchSize - 1);

      if (error) {
        console.error('[Boats] Error fetching boats:', error);
        break;
      }

      if (!data || data.length === 0) {
        hasMore = false;
      } else {
        allData = [...allData, ...data];
        
        // Si obtenemos menos de batchSize, significa que no hay más registros
        if (data.length < batchSize) {
          hasMore = false;
        } else {
          from += batchSize;
        }
      }
    }

    const boats = allData.map(mapDatabaseBoatToBoat);
    console.log(`[Boats] Fetched ${boats.length} boats (all records)`);
    return boats;
  } catch (error) {
    console.error('[Boats] Error in getAllBoats:', error);
    return [];
  }
}

// Obtener un bote por ID desde Supabase
export async function getBoatById(id: string): Promise<Boat | null> {
  try {
    const { data, error } = await supabase
      .from('boats')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching boat by id:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    return mapDatabaseBoatToBoat(data);
  } catch (error) {
    console.error('Error in getBoatById:', error);
    return null;
  }
}

// Obtener un bote por slug desde Supabase
export async function getBoatBySlug(slug: string): Promise<Boat | null> {
  try {
    const { data, error } = await supabase
      .from('boats')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching boats for slug search:', error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    // Buscar el bote cuyo slug coincida
    const boats = data.map(mapDatabaseBoatToBoat);
    const boat = boats.find(b => b.slug === slug);

    return boat || null;
  } catch (error) {
    console.error('Error in getBoatBySlug:', error);
    return null;
  }
}

// Obtener botes por categoría
export async function getBoatsByCategory(category: string): Promise<Boat[]> {
  try {
    const { data, error } = await supabase
      .from('boats')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching boats by category:', error);
      return [];
    }

    return (data || []).map(mapDatabaseBoatToBoat);
  } catch (error) {
    console.error('Error in getBoatsByCategory:', error);
    return [];
  }
}

// Obtener botes por colección
export async function getBoatsByCollection(collection: string): Promise<Boat[]> {
  try {
    console.log(`[Boats] Fetching boats for collection: ${collection}`);
    const { data, error } = await supabase
      .from('boats')
      .select('*')
      .eq('collection', collection)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`[Boats] Error fetching boats by collection (${collection}):`, error);
      return [];
    }

    const boats = (data || []).map(mapDatabaseBoatToBoat);
    console.log(`[Boats] Found ${boats.length} boats in collection: ${collection}`);
    return boats;
  } catch (error) {
    console.error(`[Boats] Error in getBoatsByCollection (${collection}):`, error);
    return [];
  }
}
