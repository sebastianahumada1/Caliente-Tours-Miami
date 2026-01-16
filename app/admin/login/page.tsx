'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, getSession } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log('[Login] Intentando iniciar sesión con:', email);
      const result = await signIn(email, password);
      console.log('[Login] Resultado:', result);

      if (result.success) {
        console.log('[Login] Login exitoso, redirigiendo...');
        setSuccess(true);
        setError(null);
        // Mostrar mensaje de éxito y esperar antes de redirigir
        setTimeout(() => {
          console.log('[Login] Redirigiendo a /admin...');
          // Usar replace para evitar que el usuario pueda volver atrás
          window.location.replace('/admin');
        }, 2000);
      } else {
        console.error('[Login] Error en login:', result.error);
        setError(result.error || 'Error al iniciar sesión. Verifica tus credenciales.');
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('[Login] Excepción:', err);
      setError(err.message || 'Error al iniciar sesión. Por favor intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 flex items-center justify-center py-12 sm:py-16">
      <main className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-surface/60 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 neon-glow-card">
          {success && (
            <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-sm animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-green-400 flex-shrink-0 mt-0.5">check_circle</span>
                <p className="flex-1 font-medium">¡Login exitoso! Redirigiendo...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-red-400 flex-shrink-0 mt-0.5">error</span>
                <p className="flex-1 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="calientetours.miami"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors neon-glow-pink disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </main>
    </div>
  );
}
