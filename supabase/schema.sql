-- ============================================
-- CONFIGURACIÓN DE STORAGE
-- ============================================
-- El Storage de Supabase se configura desde el Dashboard
-- Ve a: Storage > Create bucket > Nombre: "boat-images"
-- Configuración recomendada:
--   - Public bucket: ✅ Habilitado (para que las imágenes sean accesibles públicamente)
--   - File size limit: 10MB (ajusta según necesites)
--   - Allowed MIME types: image/jpeg, image/png, image/webp

-- ============================================
-- TABLA DE BOTES
-- ============================================
-- Campos de imágenes:
--   - main_image: Ruta en Storage (ej: "boat-images/sunset-seeker/main.jpg")
--   - images: Array de rutas en Storage (ej: ["boat-images/sunset-seeker/1.jpg", ...])
-- 
-- Las URLs completas se generan con: supabase.storage.from('boat-images').getPublicUrl(path)
CREATE TABLE IF NOT EXISTS boats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  main_image TEXT NOT NULL, -- Ruta en Storage: "boat-images/nombre-bote/main.jpg"
  max_capacity INTEGER NOT NULL,
  price_per_hour DECIMAL(10, 2) NOT NULL,
  images TEXT[] DEFAULT '{}', -- Array de rutas en Storage
  catalog_link TEXT,
  category TEXT,
  length TEXT,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_boats_category ON boats(category);
CREATE INDEX IF NOT EXISTS idx_boats_price ON boats(price_per_hour);
CREATE INDEX IF NOT EXISTS idx_boats_created_at ON boats(created_at DESC);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
-- Eliminamos el trigger si ya existe antes de crearlo
DROP TRIGGER IF EXISTS update_boats_updated_at ON boats;
CREATE TRIGGER update_boats_updated_at BEFORE UPDATE ON boats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE boats ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (todos pueden leer)
-- Eliminamos la política si ya existe antes de crearla
DROP POLICY IF EXISTS "Public can read boats" ON boats;
CREATE POLICY "Public can read boats" ON boats
    FOR SELECT USING (true);

-- Política para insertar solo usuarios autenticados (opcional, ajustar según necesidades)
-- CREATE POLICY "Authenticated users can insert boats" ON boats
--     FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para actualizar solo usuarios autenticados (opcional)
-- CREATE POLICY "Authenticated users can update boats" ON boats
--     FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para eliminar solo usuarios autenticados (opcional)
-- CREATE POLICY "Authenticated users can delete boats" ON boats
--     FOR DELETE USING (auth.role() = 'authenticated');

-- Datos de ejemplo (opcional - puedes eliminarlos después)
INSERT INTO boats (title, main_image, max_capacity, price_per_hour, images, category, length, description, features) VALUES
(
  'Sunset Seeker',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYRsE1-o0ifsrSskuTVUD3mTvsw3123ldun2BWN3LdNdWruH_0TH2dr9EnwQtLwQRnTY8uSVxcZtoWqN1i56MG99yC63i3okc_HcvRXheqnW-9plc1v63xiWy1KJ76xQ2CHem4TmDHMEfetz6dWdfD03d8iFBcQ2BHoYEDSfyeh1z5Ah4gGbKpIn_aNPbvGKR7rFSwkcw9CT4TGtJBGmNUVM4rGzLms-n2pTPJL3_3vALNFSW8F-gXBr2zlHp5JR28YYQzDoQopA',
  12,
  1200.00,
  ARRAY[
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYRsE1-o0ifsrSskuTVUD3mTvsw3123ldun2BWN3LdNdWruH_0TH2dr9EnwQtLwQRnTY8uSVxcZtoWqN1i56MG99yC63i3okc_HcvRXheqnW-9plc1v63xiWy1KJ76xQ2CHem4TmDHMEfetz6dWdfD03d8iFBcQ2BHoYEDSfyeh1z5Ah4gGbKpIn_aNPbvGKR7rFSwkcw9CT4TGtJBGmNUVM4rGzLms-n2pTPJL3_3vALNFSW8F-gXBr2zlHp5JR28YYQzDoQopA'
  ],
  'Van Dutch Premium',
  '80ft',
  'Yate espacioso y elegante perfecto para eventos especiales y cruceros relajantes.',
  ARRAY['Cocina completa', 'Sala de estar', 'Baños privados', 'Sistema de sonido']
),
(
  'Ocean Oasis',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCXYHTKPuaOWQmuZn7oPKy0cN8nAHlPzhn8lyClP5q8QdzFE3a4au05d_1YWx_mCDgb1aOtHrS7nWKLpA6NqlqIWu8t6wYfPnC_gn3yhrMP_1t3QnPJLTqLf5BX2yekJBx4tg6P5snor9LCYpe5uK8JH7GSqOlW6eSrXiOEzjO0Ve71_hi7Be6SLFbesRHwGZAI5Vbmx1uuRgeHgbUqalj0i5Qk0qllzZMpC_BmpXfTPCEWBHS6aDLZTFanBNEEAeTgLdneJSRm4g',
  10,
  850.00,
  ARRAY[
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCXYHTKPuaOWQmuZn7oPKy0cN8nAHlPzhn8lyClP5q8QdzFE3a4au05d_1YWx_mCDgb1aOtHrS7nWKLpA6NqlqIWu8t6wYfPnC_gn3yhrMP_1t3QnPJLTqLf5BX2yekJBx4tg6P5snor9LCYpe5uK8JH7GSqOlW6eSrXiOEzjO0Ve71_hi7Be6SLFbesRHwGZAI5Vbmx1uuRgeHgbUqalj0i5Qk0qllzZMpC_BmpXfTPCEWBHS6aDLZTFanBNEEAeTgLdneJSRm4g'
  ],
  'Lagoon Luxury',
  '65ft',
  'Catamarán moderno ideal para grupos grandes con todas las comodidades.',
  ARRAY['Deck superior', 'Bar', 'Jacuzzi', 'Zona de descanso']
),
(
  'Neon Wave',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDuEclvVnvKZGz-QjuI4C22JAPFtd7Z1NXH0_eOVGKcSG4iiexXWyRMRFqIB7aB9GYaTL7kBWspQd9COILmZ6cmEUWRhnDPuGoEkTNe0CCS8H_l2EbmS-ODFR14bLLdnr8QlfkcOIO84BqmPOnrPCU_rT25XGnB-UzBD1_LOzaMAWET5lx3GxU3fhv1m_Rayunus8bSNLJx_GvIhHBBGDTeII2un1RH2eqyALUS127bDs_WNlu04wwjVVtGSN5E2X6e3qkRsjIDyg',
  8,
  950.00,
  ARRAY[
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDuEclvVnvKZGz-QjuI4C22JAPFtd7Z1NXH0_eOVGKcSG4iiexXWyRMRFqIB7aB9GYaTL7kBWspQd9COILmZ6cmEUWRhnDPuGoEkTNe0CCS8H_l2EbmS-ODFR14bLLdnr8QlfkcOIO84BqmPOnrPCU_rT25XGnB-UzBD1_LOzaMAWET5lx3GxU3fhv1m_Rayunus8bSNLJx_GvIhHBBGDTeII2un1RH2eqyALUS127bDs_WNlu04wwjVVtGSN5E2X6e3qkRsjIDyg'
  ],
  'Sport Cruiser',
  '55ft',
  'Lancha veloz perfecta para aventuras acuáticas y deportes náuticos.',
  ARRAY['Motor potente', 'Equipo de snorkel', 'Velocidad', 'Zona de almacenamiento']
);
