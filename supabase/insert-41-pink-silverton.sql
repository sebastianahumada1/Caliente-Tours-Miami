-- ============================================
-- INSERT: 41' 🩷 PINK SILVERTON
-- ============================================
-- NOTA: Actualiza las rutas de imágenes después de subirlas al Storage
-- Ruta sugerida en Storage: 41-pink-silverton/

INSERT INTO boats (
  title,
  main_image,
  max_capacity,
  price_per_hour,
  pricing,  -- Campo JSONB para precios flexibles
  images,
  catalog_link,
  category,
  collection,  -- Colección a la que pertenece
  length,
  description,
  features
) VALUES (
  '41'' 🩷 PINK SILVERTON',
  'boat-images/41-pink-silverton/main.jpg',  -- Ruta con carpeta extra boat-images/
  13,  -- Max Capacity: 13 people
  300.00,  -- Precio base aproximado ($900 / 3H, mantener para compatibilidad)
  '{
    "type": "fixed",
    "prices": {
      "3H": 900,
      "4H": 1050,
      "5H": 1250,
      "6H": 1500
    }
  }'::jsonb,  -- Formato tipo "fixed": precios fijos por cantidad de horas
  ARRAY['boat-images/41-pink-silverton/1.jpg', 'boat-images/41-pink-silverton/2.jpg'],  -- Rutas con carpeta extra boat-images/
  'https://calientetoursmiami.smugmug.com/41--FLYBRIDGE-',
  'Silverton',
  'PINK COLLECTION',  -- Colección: PINK COLLECTION (por el emoji rosa 🩷)
  '41ft',
  'Pink Silverton de 41 pies con capacidad máxima de 13 personas por barco (se cuentan adultos y niños). Regulado bajo la Ley de Seguridad de Embarcaciones de Pasajeros de 1993. Perfecto para tours y eventos en Miami.',
  ARRAY[
    'Capacidad: 13 personas',
    'Regulado bajo Passenger Vessel Safety Act',
    'Flybridge',
    'Ideal para tours y eventos'
  ]
);

-- ============================================
-- INSTRUCCIONES:
-- ============================================
-- 1. Sube las imágenes al Storage en la carpeta: boat-images/41-pink-silverton/
-- 2. Nombra la imagen principal como: main.jpg
-- 3. Nombra las imágenes adicionales como: 1.jpg, 2.jpg, etc.
-- 4. Actualiza las rutas en el INSERT arriba si usas nombres diferentes
-- 5. Ejecuta este SQL en Supabase SQL Editor
