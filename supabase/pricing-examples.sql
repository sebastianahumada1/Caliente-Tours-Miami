-- ============================================
-- EJEMPLOS DE FORMATOS DE PRICING
-- ============================================

-- ============================================
-- TIPO 1: "hourly" - Precios por hora que varían por día
-- ============================================
-- Formato:
-- {
--   "type": "hourly",
--   "weekday": 180,        -- Precio por hora (lunes a jueves)
--   "weekend": 210,        -- Precio por hora (fines de semana)
--   "minimum_hours": 2     -- Mínimo de horas requeridas
-- }

-- Ejemplo: Actualizar un bote existente con pricing tipo "hourly"
UPDATE boats
SET pricing = '{
  "type": "hourly",
  "weekday": 180,
  "weekend": 210,
  "minimum_hours": 2
}'::jsonb
WHERE title = '26'' 🩷 PINK BAYLINER';

-- ============================================
-- TIPO 2: "fixed" - Precios fijos por cantidad de horas
-- ============================================
-- Formato:
-- {
--   "type": "fixed",
--   "prices": {
--     "3H": 900,    -- 3 horas = $900
--     "4H": 1050,   -- 4 horas = $1,050
--     "5H": 1250,   -- 5 horas = $1,250
--     "6H": 1500    -- 6 horas = $1,500
--   }
-- }

-- Ejemplo: Insertar un bote nuevo con pricing tipo "fixed"
INSERT INTO boats (
  title,
  main_image,
  max_capacity,
  price_per_hour,
  pricing,
  images,
  category,
  length,
  description,
  features
) VALUES (
  'Ejemplo Fixed Pricing',
  'boat-images/ejemplo/main.jpg',
  12,
  300.00,
  '{
    "type": "fixed",
    "prices": {
      "3H": 900,
      "4H": 1050,
      "5H": 1250,
      "6H": 1500
    }
  }'::jsonb,
  ARRAY['boat-images/ejemplo/1.jpg'],
  'Luxury',
  '50ft',
  'Ejemplo de bote con precios fijos por horas.',
  ARRAY['Ejemplo 1', 'Ejemplo 2']
);

-- ============================================
-- NOTAS:
-- ============================================
-- 1. El campo pricing es opcional (puede ser NULL)
-- 2. Si pricing es NULL, el componente usará price_per_hour como fallback
-- 3. Las claves en "prices" pueden ser cualquier formato (ej: "3H", "4H", "3 hours", etc.)
-- 4. Los precios en "prices" deben ser números enteros (no decimales)
-- 5. Para tipo "hourly", weekday y weekend pueden ser decimales (ej: 180.50)
