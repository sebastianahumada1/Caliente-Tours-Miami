'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BoatGalleryProps {
  images: string[];
  name: string;
}

export default function BoatGallery({ images, name }: BoatGalleryProps) {
  // Si solo hay una imagen, usar la misma para todas en la galería
  const galleryImages = images.length > 1 ? images : [images[0], images[0], images[0]];
  const displayedImages = galleryImages.slice(0, 3);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex]);

  // Manejar tecla ESC para cerrar el modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImageIndex !== null) {
        setSelectedImageIndex(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedImageIndex]);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex < displayedImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const currentImage = selectedImageIndex !== null ? displayedImages[selectedImageIndex] : null;

  return (
    <>
    <section className="mt-4">
      <div className="px-6 mb-3 flex justify-between items-end">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Gallery</h2>
        <button className="text-secondary text-[10px] font-black uppercase tracking-widest underline decoration-1 underline-offset-4 hover:text-secondary/80 transition-colors">
          VIEW MORE PHOTOS
        </button>
      </div>
      <div className="flex overflow-x-auto gap-3 px-6 hide-scrollbar pb-2 snap-x snap-mandatory">
          {displayedImages.map((image, index) => (
          <div 
            key={index} 
              onClick={() => openModal(index)}
              className="relative flex-none w-64 h-40 rounded-xl overflow-hidden border border-white/10 shadow-lg snap-center cursor-pointer hover:scale-[1.02] transition-transform group"
          >
            <Image
              src={image || '/images/placeholder.jpg'}
              alt={`${name} - Gallery ${index + 1}`}
              fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 256px, 256px"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        ))}
      </div>
    </section>

      {/* Modal */}
      {selectedImageIndex !== null && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Botón cerrar */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-10 size-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-white"
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Navegación anterior */}
          {selectedImageIndex > 0 && (
            <button
              onClick={prevImage}
              className="absolute left-6 z-10 size-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-white"
              aria-label="Imagen anterior"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
          )}

          {/* Navegación siguiente */}
          {selectedImageIndex < displayedImages.length - 1 && (
            <button
              onClick={nextImage}
              className="absolute right-6 z-10 size-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors text-white"
              aria-label="Imagen siguiente"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>
          )}

          {/* Imagen ampliada */}
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImage}
                alt={`${name} - Gallery ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={95}
                priority
              />
            </div>
          </div>

          {/* Indicador de imagen */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-white text-xs font-medium">
              {selectedImageIndex + 1} / {displayedImages.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
