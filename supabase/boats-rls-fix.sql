-- ============================================
-- FIX: POLÍTICAS RLS PARA LA TABLA BOATS
-- ============================================
-- Este script agrega las políticas necesarias para permitir
-- INSERT, UPDATE y DELETE en la tabla boats
--
-- EJECUTA ESTE SCRIPT EN EL SQL EDITOR DE SUPABASE

-- ============================================
-- POLÍTICA DE INSERT (Agregar botes)
-- ============================================

-- Eliminar política si ya existe
DROP POLICY IF EXISTS "Allow insert boats" ON boats;

-- Permitir a todos insertar botes (para uso público de la app de admin)
-- Si quieres restringirlo solo a usuarios autenticados, usa la versión comentada abajo
CREATE POLICY "Allow insert boats" ON boats
FOR INSERT
WITH CHECK (true);

-- Versión alternativa si quieres solo usuarios autenticados:
-- CREATE POLICY "Allow insert boats" ON boats
-- FOR INSERT
-- WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- POLÍTICA DE UPDATE (Actualizar botes)
-- ============================================

-- Eliminar política si ya existe
DROP POLICY IF EXISTS "Allow update boats" ON boats;

-- Permitir a todos actualizar botes
CREATE POLICY "Allow update boats" ON boats
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Versión alternativa si quieres solo usuarios autenticados:
-- CREATE POLICY "Allow update boats" ON boats
-- FOR UPDATE
-- USING (auth.role() = 'authenticated')
-- WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- POLÍTICA DE DELETE (Eliminar botes)
-- ============================================

-- Eliminar política si ya existe
DROP POLICY IF EXISTS "Allow delete boats" ON boats;

-- Permitir a todos eliminar botes
CREATE POLICY "Allow delete boats" ON boats
FOR DELETE
USING (true);

-- Versión alternativa si quieres solo usuarios autenticados:
-- CREATE POLICY "Allow delete boats" ON boats
-- FOR DELETE
-- USING (auth.role() = 'authenticated');
