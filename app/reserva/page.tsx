'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function ReservaPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    boat: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('Reserva enviada con éxito. Nos pondremos en contacto contigo pronto.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen py-8 sm:py-12 pb-32">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white italic uppercase tracking-tighter">
              Reserva tu Bote
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Completa el formulario a continuación y nos pondremos en contacto contigo para confirmar tu reserva.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-surface/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Juan Pérez"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="juan@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div>
              <label htmlFor="boat" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                Bote de interés
              </label>
              <select
                id="boat"
                name="boat"
                value={formData.boat}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Seleccionar bote</option>
                <option value="1">Midnight Pearl</option>
                <option value="2">Neon Wave</option>
                <option value="3">Lancha Rápida</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                Fecha deseada *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                Mensaje adicional
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Cuéntanos sobre tu evento o necesidades especiales..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors neon-glow-pink"
              >
                Enviar Reserva
              </button>
              <Link
                href="/catalogo"
                className="flex-1 text-center border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Ver Catálogo
              </Link>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              ¿Necesitas ayuda? Contáctanos directamente en{' '}
              <a href="tel:+1234567890" className="text-secondary hover:underline">
                +1 (234) 567-8900
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
