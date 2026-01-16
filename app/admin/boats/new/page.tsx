'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { insertBoat, uploadBoatImages, NewBoatData } from '@/lib/admin';
import { Pricing } from '@/types/database';
import Header from '@/components/Header';

export default function NewBoatPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    max_capacity: '',
    price_per_hour: '',
    pricing_type: 'fixed' as 'fixed' | 'hourly',
    // Pricing fixed
    fixed_prices: {
      '2H': '',
      '3H': '',
      '4H': '',
      '5H': '',
      '6H': '',
      '7H': '',
      '8H': '',
    },
    // Pricing hourly
    weekday_price: '',
    weekend_price: '',
    minimum_hours: '',
    catalog_link: '',
    category: '',
    collection: '',
    length: '',
    description: '',
    features: '',
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('fixed_prices_')) {
      const priceKey = name.replace('fixed_prices_', '');
      setFormData({
        ...formData,
        fixed_prices: {
          ...formData.fixed_prices,
          [priceKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdditionalImages(Array.from(e.target.files));
    }
  };

  const buildPricing = (): Pricing | null => {
    if (formData.pricing_type === 'hourly') {
      if (!formData.weekday_price || !formData.weekend_price || !formData.minimum_hours) {
        return null;
      }
      return {
        type: 'hourly',
        weekday: parseFloat(formData.weekday_price),
        weekend: parseFloat(formData.weekend_price),
        minimum_hours: parseInt(formData.minimum_hours),
      };
    } else {
      const prices: Record<string, number> = {};
      Object.entries(formData.fixed_prices).forEach(([key, value]) => {
        if (value) {
          prices[key] = parseFloat(value);
        }
      });
      if (Object.keys(prices).length === 0) {
        return null;
      }
      return {
        type: 'fixed',
        prices,
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!mainImage) {
      setError('Por favor, sube una imagen principal');
      return;
    }

    if (!formData.title || !formData.max_capacity || !formData.price_per_hour) {
      setError('Por favor, completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      const pricing = buildPricing();
      const features = formData.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      // Paso 1: Subir imágenes a Storage primero
      const uploadResult = await uploadBoatImages(formData.title, mainImage, additionalImages);

      if (!uploadResult.success || !uploadResult.mainImagePath) {
        setError(uploadResult.error || 'Error al subir las imágenes');
        setIsSubmitting(false);
        return;
      }

      // Paso 2: Insertar bote en la base de datos con las rutas de las imágenes
      const insertResult = await insertBoat({
        title: formData.title,
        mainImagePath: uploadResult.mainImagePath,
        imagePaths: uploadResult.imagePaths || [uploadResult.mainImagePath],
        max_capacity: parseInt(formData.max_capacity),
        price_per_hour: parseFloat(formData.price_per_hour),
        pricing,
        catalog_link: formData.catalog_link || undefined,
        category: formData.category || undefined,
        collection: formData.collection || undefined,
        length: formData.length || undefined,
        description: formData.description || undefined,
        features,
      });

      if (!insertResult.success || !insertResult.boatId) {
        setError(insertResult.error || 'Error al insertar el bote');
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);
      
      // Redirigir al catálogo después de 2 segundos
      setTimeout(() => {
        router.push('/catalogo');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al crear el bote');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold italic uppercase tracking-tighter mb-2">
            Agregar Nuevo Bote
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Completa el formulario para agregar un nuevo bote al catálogo
          </p>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
            <p className="font-semibold">Error:</p>
            <p className="break-words">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-sm">
            <p className="font-semibold">¡Éxito!</p>
            <p>El bote se ha agregado correctamente. Redirigiendo al catálogo...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
          {/* Información Básica */}
          <section className="bg-surface/40 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-secondary">Información Básica</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Título del Bote * <span className="text-[10px] sm:text-xs text-gray-500">(ej: 26' 🩷 PINK BAYLINER)</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="26' 🩷 PINK BAYLINER"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="max_capacity" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Capacidad Máxima * <span className="text-[10px] sm:text-xs text-gray-500">(personas)</span>
                  </label>
                  <input
                    type="number"
                    id="max_capacity"
                    name="max_capacity"
                    required
                    min="1"
                    value={formData.max_capacity}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="length" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Longitud <span className="text-[10px] sm:text-xs text-gray-500">(ej: 26ft)</span>
                  </label>
                  <input
                    type="text"
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="26ft"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="category" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Categoría <span className="text-[10px] sm:text-xs text-gray-500">(ej: Bayliner)</span>
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Bayliner"
                  />
                </div>

                <div>
                  <label htmlFor="collection" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                    Colección *
                  </label>
                  <select
                    id="collection"
                    name="collection"
                    required
                    value={formData.collection}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Seleccionar colección</option>
                    <option value="PINK COLLECTION">🩷 PINK COLLECTION</option>
                    <option value="FLYBRIDGE">❤️ FLYBRIDGE</option>
                    <option value="BOATS">💙 BOATS</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="catalog_link" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Link del Catálogo <span className="text-[10px] sm:text-xs text-gray-500">(SmugMug)</span>
                </label>
                <input
                  type="url"
                  id="catalog_link"
                  name="catalog_link"
                  value={formData.catalog_link}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://calientetoursmiami.smugmug.com/..."
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                  placeholder="Descripción completa del bote..."
                />
              </div>

              <div>
                <label htmlFor="features" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Características <span className="text-[10px] sm:text-xs text-gray-500">(separadas por comas)</span>
                </label>
                <input
                  type="text"
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Velocidad, Comodidad, Sistema de sonido"
                />
              </div>
            </div>
          </section>

          {/* Precios */}
          <section className="bg-surface/40 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-secondary">Precios</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="price_per_hour" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Precio por Hora Base * <span className="text-[10px] sm:text-xs text-gray-500">(para compatibilidad)</span>
                </label>
                <input
                  type="number"
                  id="price_per_hour"
                  name="price_per_hour"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price_per_hour}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="pricing_type" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Tipo de Precio *
                </label>
                <select
                  id="pricing_type"
                  name="pricing_type"
                  required
                  value={formData.pricing_type}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="fixed">Precios Fijos por Horas</option>
                  <option value="hourly">Precio por Hora (Weekday/Weekend)</option>
                </select>
              </div>

              {formData.pricing_type === 'fixed' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {(['2H', '3H', '4H', '5H', '6H', '7H', '8H'] as const).map((hours) => (
                    <div key={hours}>
                      <label htmlFor={`fixed_prices_${hours}`} className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                        {hours}
                      </label>
                      <input
                        type="number"
                        id={`fixed_prices_${hours}`}
                        name={`fixed_prices_${hours}`}
                        min="0"
                        step="0.01"
                        value={formData.fixed_prices[hours]}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="weekday_price" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Precio Lunes-Jueves *
                    </label>
                    <input
                      type="number"
                      id="weekday_price"
                      name="weekday_price"
                      min="0"
                      step="0.01"
                      value={formData.weekday_price}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="weekend_price" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Precio Fines de Semana *
                    </label>
                    <input
                      type="number"
                      id="weekend_price"
                      name="weekend_price"
                      min="0"
                      step="0.01"
                      value={formData.weekend_price}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="minimum_hours" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                      Horas Mínimas *
                    </label>
                    <input
                      type="number"
                      id="minimum_hours"
                      name="minimum_hours"
                      min="1"
                      value={formData.minimum_hours}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-background-dark/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Imágenes */}
          <section className="bg-surface/40 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-secondary">Imágenes</h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="main_image" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Imagen Principal * <span className="text-[10px] sm:text-xs text-gray-500">(main.jpg)</span>
                </label>
                <input
                  type="file"
                  id="main_image"
                  name="main_image"
                  required
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-background-dark/50 border border-white/10 rounded-lg text-white file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                />
                {mainImage && (
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-400 break-words">Seleccionada: {mainImage.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="additional_images" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Imágenes Adicionales <span className="text-[10px] sm:text-xs text-gray-500">(múltiples)</span>
                </label>
                <input
                  type="file"
                  id="additional_images"
                  name="additional_images"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-background-dark/50 border border-white/10 rounded-lg text-white file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-secondary/90"
                />
                {additionalImages.length > 0 && (
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-400">
                    {additionalImages.length} imagen(es) seleccionada(s)
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg font-semibold hover:bg-primary/90 transition-colors neon-glow-pink disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Bote'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
