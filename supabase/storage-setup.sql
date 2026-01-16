-- ============================================
-- CONFIGURACIÓN DE STORAGE PARA IMÁGENES
-- ============================================
-- Este archivo contiene las políticas de Storage para el bucket de imágenes de botes
-- 
-- NOTA: El bucket debe crearse manualmente desde el Dashboard de Supabase:
-- 1. Ve a Storage en el menú lateral
-- 2. Haz clic en "Create bucket"
-- 3. Nombre: "boat-images"
-- 4. Marca "Public bucket" (para acceso público a las imágenes)
-- 5. File size limit: 10MB (o el límite que prefieras)
-- 6. Haz clic en "Create bucket"

-- ============================================
-- POLÍTICAS DE STORAGE (RLS)
-- ============================================

-- Política para permitir lectura pública (todos pueden ver las imágenes)
-- Eliminamos la política si ya existe antes de crearla
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'boat-images');

-- Política para permitir subir imágenes solo a usuarios autenticados
-- (Descomenta si quieres que solo usuarios autenticados puedan subir)
-- DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
-- CREATE POLICY "Authenticated users can upload images"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'boat-images' AND
--   auth.role() = 'authenticated'
-- );

-- Política para permitir actualizar imágenes solo a usuarios autenticados
-- (Descomenta si quieres que solo usuarios autenticados puedan actualizar)
-- DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
-- CREATE POLICY "Authenticated users can update images"
-- ON storage.objects FOR UPDATE
-- USING (
--   bucket_id = 'boat-images' AND
--   auth.role() = 'authenticated'
-- );

-- Política para permitir eliminar imágenes solo a usuarios autenticados
-- (Descomenta si quieres que solo usuarios autenticados puedan eliminar)
-- DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;
-- CREATE POLICY "Authenticated users can delete images"
-- ON storage.objects FOR DELETE
-- USING (
--   bucket_id = 'boat-images' AND
--   auth.role() = 'authenticated'
-- );

-- ============================================
-- ESTRUCTURA DE CARPETAS RECOMENDADA
-- ============================================
-- boat-images/
--   ├── sunset-seeker/
--   │   ├── main.jpg
--   │   ├── 1.jpg
--   │   ├── 2.jpg
--   │   └── 3.jpg
--   ├── ocean-oasis/
--   │   ├── main.jpg
--   │   ├── 1.jpg
--   │   └── 2.jpg
--   └── neon-wave/
--       ├── main.jpg
--       └── 1.jpg
