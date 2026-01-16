// Función para generar un slug desde un título
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    // Reemplazar emojis y caracteres especiales
    .replace(/[^\w\s-]/g, '')
    // Reemplazar espacios y guiones múltiples por un solo guion
    .replace(/[\s_]+/g, '-')
    // Remover guiones al inicio y final
    .replace(/^-+|-+$/g, '')
    // Limitar longitud
    .substring(0, 100);
}
