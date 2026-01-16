-- ============================================
-- FIX: POLÍTICAS RLS PARA STORAGE (INSERT, UPDATE, DELETE)
-- ============================================
-- Este script actualiza las políticas de Storage para permitir
-- subir, actualizar y eliminar imágenes en el bucket boat-images
--
-- EJECUTA ESTE SCRIPT EN EL SQL EDITOR DE SUPABASE

-- ============================================
-- POLÍTICAS DE INSERT (Subir imágenes)
-- ============================================

-- Eliminar política si ya existe
DROP POLICY IF EXISTS "Allow upload images to boat-images" ON storage.objects;

-- Permitir a todos subir imágenes al bucket boat-images
-- (Para una app pública, puedes hacer que sea abierto)
-- Si quieres restringirlo solo a usuarios autenticados, usa la versión comentada abajo
CREATE POLICY "Allow upload images to boat-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'boat-images');

-- Versión alternativa si quieres solo usuarios autenticados:
-- CREATE POLICY "Allow upload images to boat-images"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'boat-images' AND
--   auth.role() = 'authenticated'
-- );

-- ============================================
-- POLÍTICAS DE UPDATE (Actualizar imágenes)
-- ============================================

-- Eliminar política si ya existe
DROP POLICY IF EXISTS "Allow update images in boat-images" ON storage.objects;

-- Permitir a todos actualizar imágenes en el bucket boat-images
CREATE POLICY "Allow update images in boat-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'boat-images')
WITH CHECK (bucket_id = 'boat-images');

-- ============================================
-- POLÍTICAS DE DELETE (Eliminar imágenes)
-- ============================================

-- Eliminar política si ya existe
DROP POLICY IF EXISTS "Allow delete images from boat-images" ON storage.objects;

-- Permitir a todos eliminar imágenes del bucket boat-images
CREATE POLICY "Allow delete images from boat-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'boat-images');
