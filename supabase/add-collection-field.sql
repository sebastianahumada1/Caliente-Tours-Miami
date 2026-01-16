-- ============================================
-- AGREGAR CAMPO DE COLLECTION (COlección)
-- ============================================
-- Este campo permite categorizar botes en colecciones específicas:
-- - "PINK COLLECTION" para botes rosas
-- - "FLYBRIDGE" para botes con flybridge
-- - "BOATS" para todos los demás botes

-- Agregar columna collection (TEXT) para almacenar el nombre de la colección
ALTER TABLE boats 
ADD COLUMN IF NOT EXISTS collection TEXT;

-- Crear índice para búsquedas rápidas por colección
CREATE INDEX IF NOT EXISTS idx_boats_collection ON boats(collection);

-- Ejemplo de actualización de botes existentes:
-- UPDATE boats SET collection = 'PINK COLLECTION' WHERE title ILIKE '%pink%';
-- UPDATE boats SET collection = 'FLYBRIDGE' WHERE title ILIKE '%flybridge%' OR category ILIKE '%flybridge%';
-- UPDATE boats SET collection = 'BOATS' WHERE collection IS NULL;
