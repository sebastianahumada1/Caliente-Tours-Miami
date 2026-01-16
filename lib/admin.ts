import { supabase } from './supabase';
import { Pricing } from '@/types/database';
import { generateSlug } from './utils';

export interface NewBoatData {
  title: string;
  main_image: File;
  images: File[];
  max_capacity: number;
  price_per_hour: number;
  pricing: Pricing | null;
  catalog_link?: string;
  category?: string;
  collection?: string;
  length?: string;
  description?: string;
  features: string[];
}

/**
 * Inserta un nuevo bote en la base de datos con las rutas de imágenes ya subidas
 */
export async function insertBoat(
  boatData: Omit<NewBoatData, 'main_image' | 'images'> & { mainImagePath: string; imagePaths: string[] }
): Promise<{ success: boolean; error?: string; boatId?: string }> {
  try {
    console.log('[Admin] Inserting boat with data:', {
      title: boatData.title,
      mainImagePath: boatData.mainImagePath,
      imagePaths: boatData.imagePaths,
      max_capacity: boatData.max_capacity,
      price_per_hour: boatData.price_per_hour,
      pricing: boatData.pricing,
      collection: boatData.collection,
    });

    // Insertar en la base de datos con las rutas de Storage
    const { data, error } = await supabase
      .from('boats')
      .insert({
        title: boatData.title,
        main_image: boatData.mainImagePath,
        images: boatData.imagePaths,
        max_capacity: boatData.max_capacity,
        price_per_hour: boatData.price_per_hour,
        pricing: boatData.pricing,
        catalog_link: boatData.catalog_link || null,
        category: boatData.category || null,
        collection: boatData.collection || null,
        length: boatData.length || null,
        description: boatData.description || null,
        features: boatData.features || [],
      })
      .select('id')
      .single();

    if (error) {
      console.error('[Admin] Error inserting boat:', error);
      console.error('[Admin] Error details:', JSON.stringify(error, null, 2));
      return { 
        success: false, 
        error: error.message || `Error: ${error.code || 'Unknown error'}` 
      };
    }

    if (!data || !data.id) {
      console.error('[Admin] No data returned from insert');
      return { success: false, error: 'No se recibió respuesta del servidor' };
    }

    console.log('[Admin] Boat inserted successfully with ID:', data.id);
    return { success: true, boatId: data.id };
  } catch (error: any) {
    console.error('[Admin] Exception in insertBoat:', error);
    console.error('[Admin] Exception details:', JSON.stringify(error, null, 2));
    return { 
      success: false, 
      error: error.message || 'Error desconocido al insertar el bote' 
    };
  }
}

/**
 * Sube las imágenes de un bote a Storage y retorna las rutas
 * Las rutas retornadas son relativas al bucket (sin prefijo boat-images/)
 */
export async function uploadBoatImages(
  title: string,
  mainImage: File,
  additionalImages: File[]
): Promise<{ success: boolean; error?: string; mainImagePath?: string; imagePaths?: string[] }> {
  try {
    const folderName = generateSlug(title).toLowerCase().replace(/\s+/g, '-');
    const bucket = 'boat-images';

    // Subir imagen principal
    // La ruta es relativa al bucket: "26-pink-bayliner/main.jpg"
    const mainImagePath = `${folderName}/main.jpg`;
    const { error: mainError } = await supabase.storage
      .from(bucket)
      .upload(mainImagePath, mainImage, {
        cacheControl: '3600',
        upsert: true,
      });

    if (mainError) {
      console.error('[Admin] Error uploading main image:', mainError);
      return { success: false, error: `Error uploading main image: ${mainError.message}` };
    }

    console.log('[Admin] Main image uploaded to:', mainImagePath);

    // Subir imágenes adicionales
    const imagePaths: string[] = [];
    for (let i = 0; i < additionalImages.length; i++) {
      // La ruta es relativa al bucket: "26-pink-bayliner/1.jpg"
      const imagePath = `${folderName}/${i + 1}.jpg`;
      const { error: imageError } = await supabase.storage
        .from(bucket)
        .upload(imagePath, additionalImages[i], {
          cacheControl: '3600',
          upsert: true,
        });

      if (imageError) {
        console.error(`[Admin] Error uploading image ${i + 1}:`, imageError);
        continue;
      }

      console.log(`[Admin] Additional image ${i + 1} uploaded to:`, imagePath);
      // Guardar la ruta relativa (sin prefijo boat-images/)
      imagePaths.push(imagePath);
    }

    // Retornar rutas relativas al bucket (sin prefijo boat-images/)
    // Estas rutas se guardan así en la base de datos
    return {
      success: true,
      mainImagePath: mainImagePath, // "26-pink-bayliner/main.jpg"
      imagePaths: imagePaths.length > 0 ? imagePaths : [mainImagePath],
    };
  } catch (error: any) {
    console.error('[Admin] Error in uploadBoatImages:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}

/**
 * Actualiza un bote existente en la base de datos
 */
export async function updateBoat(
  boatId: string,
  boatData: Omit<NewBoatData, 'main_image' | 'images'> & { mainImagePath?: string; imagePaths?: string[] }
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: any = {
      title: boatData.title,
      max_capacity: boatData.max_capacity,
      price_per_hour: boatData.price_per_hour,
      pricing: boatData.pricing,
      catalog_link: boatData.catalog_link || null,
      category: boatData.category || null,
      collection: boatData.collection || null,
      length: boatData.length || null,
      description: boatData.description || null,
      features: boatData.features || [],
    };

    // Solo actualizar las imágenes si se proporcionaron nuevas rutas
    if (boatData.mainImagePath) {
      updateData.main_image = boatData.mainImagePath;
    }
    if (boatData.imagePaths) {
      updateData.images = boatData.imagePaths;
    }

    const { error } = await supabase
      .from('boats')
      .update(updateData)
      .eq('id', boatId);

    if (error) {
      console.error('Error updating boat:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error in updateBoat:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}
