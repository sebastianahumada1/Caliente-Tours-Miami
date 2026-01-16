-- ============================================
-- INSERT: 26' 🩷 PINK BAYLINER
-- ============================================
-- NOTA: Actualiza las rutas de imágenes después de subirlas al Storage
-- Ruta sugerida en Storage: 26-pink-bayliner/

INSERT INTO boats (
  title,
  main_image,
  max_capacity,
  price_per_hour,
  pricing,  -- Campo JSONB para precios flexibles
  images,
  catalog_link,
  category,
  length,
  description,
  features
) VALUES (
  '26'' 🩷 PINK BAYLINER',
  'boat-images/26-pink-bayliner/main.jpg',  -- Ruta con carpeta extra boat-images/
  11,
  210.00,  -- Precio base (mantener para compatibilidad)
  '{
    "type": "hourly",
    "weekday": 180,
    "weekend": 210,
    "minimum_hours": 2
  }'::jsonb,  -- Formato tipo "hourly": precios por hora que varían por día
  ARRAY['boat-images/26-pink-bayliner/1.jpg', 'boat-images/26-pink-bayliner/2.jpg', 'boat-images/26-pink-bayliner/3.jpg'],  -- Rutas con carpeta extra boat-images/
  'https://calientetoursmiami.smugmug.com/26--PINK-BOAT',
  'Bayliner',
  '26ft',
  'Pink Bayliner de 26 pies con capacidad para 11 personas. Perfecto para tours y eventos en Miami. Precios desde $180/hora (lunes a jueves) y $210/hora (fines de semana). Mínimo 2 horas.',
  ARRAY[
    'Velocidad',
    'Comodidad',
    'Sistema de sonido',
    'Perfecto para tours'
  ]
);

-- ============================================
-- INSTRUCCIONES:
-- ============================================
-- 1. Sube las imágenes al Storage en la carpeta: boat-images/26-pink-bayliner/
-- 2. Nombra la imagen principal como: main.jpg
-- 3. Nombra las imágenes adicionales como: 1.jpg, 2.jpg, etc.
-- 4. Actualiza las rutas en el INSERT arriba si usas nombres diferentes
-- 5. Ejecuta este SQL en Supabase SQL Editor
