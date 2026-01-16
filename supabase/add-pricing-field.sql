-- ============================================
-- AGREGAR CAMPO DE PRICING FLEXIBLE
-- ============================================
-- Este campo JSONB permite dos formatos de precios:
-- 1. Tipo "hourly": Precios por hora que varían por día de la semana
-- 2. Tipo "fixed": Precios fijos por cantidad de horas

-- Agregar columna pricing (JSONB) para almacenar información flexible de precios
ALTER TABLE boats 
ADD COLUMN IF NOT EXISTS pricing JSONB;

-- Ejemplo de formato tipo "hourly":
-- {
--   "type": "hourly",
--   "weekday": 180,
--   "weekend": 210,
--   "minimum_hours": 2
-- }

-- Ejemplo de formato tipo "fixed":
-- {
--   "type": "fixed",
--   "prices": {
--     "3H": 900,
--     "4H": 1050,
--     "5H": 1250,
--     "6H": 1500
--   }
-- }

-- Crear índice GIN para búsquedas rápidas en el campo JSONB
CREATE INDEX IF NOT EXISTS idx_boats_pricing ON boats USING GIN (pricing);

-- Migración: Actualizar botes existentes que no tengan pricing
-- Mantener price_per_hour como referencia, pero el componente usará pricing
-- NOTA: Deberás actualizar manualmente el campo pricing para cada bote según su tipo
