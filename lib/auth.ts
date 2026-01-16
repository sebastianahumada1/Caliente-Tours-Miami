import { supabase } from './supabase';

/**
 * Inicia sesión con email y contraseña
 */
export async function signIn(email: string, password: string) {
  try {
    console.log('[Auth] Iniciando sesión para:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      console.error('[Auth] Sign in error:', error);
      console.error('[Auth] Error code:', error.status);
      console.error('[Auth] Error message:', error.message);
      return { 
        success: false, 
        error: error.message || 'Credenciales inválidas. Verifica tu email y contraseña.' 
      };
    }

    if (!data.user) {
      console.error('[Auth] No user data returned');
      return { success: false, error: 'No se pudo obtener la información del usuario.' };
    }

    console.log('[Auth] Login exitoso para usuario:', data.user.email);
    return { success: true, user: data.user };
  } catch (error: any) {
    console.error('[Auth] Exception in signIn:', error);
    console.error('[Auth] Exception stack:', error.stack);
    return { success: false, error: error.message || 'Error al iniciar sesión' };
  }
}

/**
 * Cierra la sesión del usuario
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('[Auth] Sign out error:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error: any) {
    console.error('[Auth] Exception in signOut:', error);
    return { success: false, error: error.message || 'Error al cerrar sesión' };
  }
}

/**
 * Obtiene el usuario actual autenticado
 */
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      return null;
    }
    return user;
  } catch (error) {
    console.error('[Auth] Error getting current user:', error);
    return null;
  }
}

/**
 * Obtiene la sesión actual
 */
export async function getSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      return null;
    }
    return session;
  } catch (error) {
    console.error('[Auth] Error getting session:', error);
    return null;
  }
}
