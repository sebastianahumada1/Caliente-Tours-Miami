import { supabase } from './supabase';

const STORAGE_BUCKET = 'boat-images';

/**
 * Obtiene la URL pública de una imagen en Storage de Supabase
 * @param path - Ruta de la imagen en Storage (ej: "sunset-seeker/main.jpg")
 * @returns URL completa de la imagen
 */
export function getStorageImageUrl(path: string): string {
  if (!path) return '/images/placeholder.jpg';
  
  // Si ya es una URL completa (http/https), devolverla tal cual
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Si es una ruta de Storage, generar la URL pública
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Obtiene URLs públicas de múltiples imágenes en Storage
 * @param paths - Array de rutas de imágenes en Storage
 * @returns Array de URLs completas
 */
export function getStorageImageUrls(paths: string[]): string[] {
  if (!paths || paths.length === 0) return ['/images/placeholder.jpg'];
  
  return paths.map(path => getStorageImageUrl(path));
}

/**
 * Sube una imagen al Storage de Supabase
 * @param file - Archivo a subir
 * @param path - Ruta donde guardar (ej: "sunset-seeker/main.jpg")
 * @returns URL pública de la imagen subida o null si hay error
 */
export async function uploadImageToStorage(
  file: File,
  path: string
): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    return getStorageImageUrl(data.path);
  } catch (error) {
    console.error('Error in uploadImageToStorage:', error);
    return null;
  }
}

/**
 * Elimina una imagen del Storage de Supabase
 * @param path - Ruta de la imagen a eliminar
 * @returns true si se eliminó correctamente, false si hubo error
 */
export async function deleteImageFromStorage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteImageFromStorage:', error);
    return false;
  }
}
