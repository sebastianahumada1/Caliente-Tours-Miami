-- ============================================
-- TABLA DE RESERVAS
-- ============================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  boat_id UUID REFERENCES boats(id) ON DELETE SET NULL,
  boat_title TEXT, -- Guardamos el título del bote por si se elimina
  collection TEXT, -- Colección seleccionada
  desired_date DATE NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);
CREATE INDEX IF NOT EXISTS idx_reservations_desired_date ON reservations(desired_date);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción pública (cualquiera puede crear reservas)
DROP POLICY IF EXISTS "Public can insert reservations" ON reservations;
CREATE POLICY "Public can insert reservations" ON reservations
    FOR INSERT WITH CHECK (true);

-- Política para permitir lectura solo a usuarios autenticados (opcional)
DROP POLICY IF EXISTS "Authenticated users can read reservations" ON reservations;
CREATE POLICY "Authenticated users can read reservations" ON reservations
    FOR SELECT USING (true);
