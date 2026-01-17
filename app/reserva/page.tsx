'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { getBoatsByCollection } from '@/lib/boats';
import { createReservation, createWhatsAppMessage, type ReservationData } from '@/lib/reservations';
import { Boat } from '@/types/database';

const COLLECTIONS = [
  { value: 'PINK COLLECTION', label: '🩷 PINK COLLECTION' },
  { value: 'FLYBRIDGE', label: '❤️ FLYBRIDGE' },
  { value: 'BOATS', label: '💙 BOATS' },
];

export default function ReservaPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    collection: '',
    boat: '',
    message: ''
  });

  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Cargar botes cuando se selecciona una colección
  useEffect(() => {
    const loadBoats = async () => {
      // Reset boat selection when collection changes
      if (formData.boat) {
        setFormData(prev => ({ ...prev, boat: '' }));
      }

      if (!formData.collection) {
        setBoats([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        console.log('[Reserva] Loading boats for collection:', formData.collection);
        const collectionBoats = await getBoatsByCollection(formData.collection);
        setBoats(collectionBoats);
        console.log(`[Reserva] Loaded ${collectionBoats.length} boats`);
      } catch (err) {
        console.error('[Reserva] Error loading boats:', err);
        setError('Error al cargar los botes. Por favor intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    loadBoats();
  }, [formData.collection]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const selectedBoat = boats.find(b => b.id === formData.boat);
      
      const reservationData: ReservationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        boatId: formData.boat || null,
        boatTitle: selectedBoat?.name || '',
        collection: formData.collection,
        desiredDate: formData.date,
        message: formData.message || undefined,
      };

      console.log('[Reserva] Submitting reservation:', reservationData);

      // Guardar en la base de datos
      const result = await createReservation(reservationData);
      
      if (!result.success) {
        throw new Error(result.error || 'Error al guardar la reserva');
      }

      console.log('[Reserva] Reservation saved successfully');

      // Crear mensaje de WhatsApp y redirigir
      const whatsappMessage = createWhatsAppMessage(reservationData);
      const whatsappNumber = '17868043744'; // +1 (786) 804-3744 sin formato
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      setSuccess(true);

      // Redirigir a WhatsApp después de un breve delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch (err) {
      console.error('[Reserva] Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Error al enviar la reserva. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
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

          {(error || success) && (
            <div className={`mb-6 p-4 rounded-lg ${
              success 
                ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                : 'bg-red-500/20 border border-red-500/50 text-red-300'
            }`}>
              {success 
                ? '¡Reserva enviada con éxito! Redirigiendo a WhatsApp...' 
                : error}
            </div>
          )}

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
              <label htmlFor="collection" className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wider">
                Colección *
              </label>
              <select
                id="collection"
                name="collection"
                required
                value={formData.collection}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Seleccionar colección</option>
                {COLLECTIONS.map((collection) => (
                  <option key={collection.value} value={collection.value}>
                    {collection.label}
                  </option>
                ))}
              </select>
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
                disabled={!formData.collection || loading || boats.length === 0}
                className="w-full px-4 py-3 bg-background-dark/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {loading 
                    ? 'Cargando botes...' 
                    : !formData.collection 
                    ? 'Primero selecciona una colección' 
                    : boats.length === 0 
                    ? 'No hay botes disponibles en esta colección'
                    : 'Seleccionar bote'}
                </option>
                {boats.map((boat) => (
                  <option key={boat.id} value={boat.id}>
                    {boat.name}
                  </option>
                ))}
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
                disabled={submitting}
                className="flex-1 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors neon-glow-pink disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Enviando...' : 'Enviar Reserva'}
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
              <a href="tel:+17868043744" className="text-secondary hover:underline">
                +1 (786) 804-3744
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
