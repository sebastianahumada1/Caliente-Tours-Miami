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
 * @param folderName - Nombre de la carpeta (slug) donde guardar las imágenes
 * @param mainImage - Archivo de imagen principal (opcional para actualizaciones)
 * @param additionalImages - Array de imágenes adicionales
 */
export async function uploadBoatImages(
  folderName: string,
  mainImage?: File | null,
  additionalImages: File[] = []
): Promise<{ success: boolean; error?: string; mainImagePath?: string; imagePaths?: string[] }> {
  try {
    const bucket = 'boat-images';
    const mainImagePath = `${folderName}/main.jpg`;
    const imagePaths: string[] = [];

    // Subir imagen principal solo si se proporciona
    if (mainImage && mainImage.size > 0) {
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
    }

    // Subir imágenes adicionales
    for (let i = 0; i < additionalImages.length; i++) {
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
      imagePaths.push(imagePath);
    }

    // Si se subió una nueva imagen principal, usarla; si no, retornar la ruta existente
    const finalMainImagePath = mainImage && mainImage.size > 0 ? mainImagePath : undefined;
    
    // Si hay imágenes adicionales, usarlas; si no, usar solo la principal si existe
    const finalImagePaths = imagePaths.length > 0 
      ? imagePaths 
      : (finalMainImagePath ? [finalMainImagePath] : undefined);

    return {
      success: true,
      mainImagePath: finalMainImagePath,
      imagePaths: finalImagePaths,
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
    console.log('[Admin] Updating boat:', boatId, {
      title: boatData.title,
      hasMainImage: !!boatData.mainImagePath,
      hasImagePaths: !!boatData.imagePaths,
      mainImagePath: boatData.mainImagePath,
      imagePaths: boatData.imagePaths,
    });

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
      console.log('[Admin] Updating main_image to:', boatData.mainImagePath);
    }
    if (boatData.imagePaths && boatData.imagePaths.length > 0) {
      updateData.images = boatData.imagePaths;
      console.log('[Admin] Updating images to:', boatData.imagePaths);
    }

    const { error, data } = await supabase
      .from('boats')
      .update(updateData)
      .eq('id', boatId)
      .select();

    if (error) {
      console.error('[Admin] Error updating boat:', error);
      console.error('[Admin] Error details:', JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }

    console.log('[Admin] Boat updated successfully');
    return { success: true };
  } catch (error: any) {
    console.error('[Admin] Exception in updateBoat:', error);
    return { success: false, error: error.message || 'Unknown error' };
  }
}
