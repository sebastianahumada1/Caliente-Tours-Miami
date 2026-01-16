-- ============================================
-- CREAR USUARIO ADMINISTRADOR
-- ============================================
-- Este script crea un usuario administrador en Supabase Auth
-- 
-- IMPORTANTE: Este script debe ejecutarse desde el Dashboard de Supabase
-- Ve a: Authentication > Users > Add User (o ejecuta desde SQL Editor)
--
-- O puedes crear el usuario manualmente desde el Dashboard:
-- 1. Ve a Authentication > Users
-- 2. Haz clic en "Add User"
-- 3. Selecciona "Create new user"
-- 4. Email: calientetours.miami
-- 5. Password: milo1974
-- 6. Auto Confirm User: ✅ (activado)
-- 7. Haz clic en "Create User"

-- ============================================
-- MÉTODO 1: Crear usuario con SQL (recomendado desde Dashboard)
-- ============================================
-- Ejecuta esto en el SQL Editor de Supabase:
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  confirmation_token,
  recovery_sent_at,
  recovery_token,
  email_change_sent_at,
  email_change,
  email_change_token_new,
  email_change_token,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'calientetours.miami',
  crypt('milo1974', gen_salt('bf')), -- La contraseña se hashea automáticamente
  NOW(),
  NOW(),
  '',
  NULL,
  '',
  NULL,
  '',
  '',
  '',
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{}',
  NULL,
  NOW(),
  NOW(),
  NULL,
  NULL,
  '',
  '',
  NULL,
  0,
  NULL,
  '',
  NULL
);

-- ============================================
-- MÉTODO 2: Crear usuario usando la función de Supabase (más simple)
-- ============================================
-- NOTA: Esta función puede no estar disponible en todas las versiones
-- Si no funciona, usa el Método 1 o crea el usuario desde el Dashboard

-- ============================================
-- MÉTODO 3: Usar Dashboard (RECOMENDADO)
-- ============================================
-- 1. Ve a Supabase Dashboard > Authentication > Users
-- 2. Haz clic en "Add User"
-- 3. Selecciona "Create new user"
-- 4. Completa:
--    - Email: calientetours.miami
--    - Password: milo1974
--    - Auto Confirm User: ✅ (marca esta opción)
-- 5. Haz clic en "Create User"

-- ============================================
-- VERIFICAR QUE EL USUARIO SE CREÓ
-- ============================================
-- Ejecuta esto para verificar:
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
WHERE email = 'calientetours.miami';
