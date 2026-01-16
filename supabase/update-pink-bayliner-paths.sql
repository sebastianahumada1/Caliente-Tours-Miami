-- ============================================
-- UPDATE: Corregir rutas del bote 26' PINK BAYLINER
-- ============================================
-- Este SQL actualiza las rutas de imágenes para usar la estructura actual
-- que incluye la carpeta extra "boat-images/" dentro del bucket

UPDATE boats 
SET 
  main_image = 'boat-images/26-pink-bayliner/main.jpg',
  images = ARRAY[
    'boat-images/26-pink-bayliner/1.jpg',
    'boat-images/26-pink-bayliner/2.jpg',
    'boat-images/26-pink-bayliner/3.jpg'
  ],
  updated_at = NOW()
WHERE title LIKE '%PINK BAYLINER%';

-- Verificar el cambio
SELECT id, title, main_image, images 
FROM boats 
WHERE title LIKE '%PINK BAYLINER%';
