'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Zoom, ChevronLeft, ChevronRight, Download, X } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  technique: string;
  size: string;
  description: string;
  previewImage: string;
  fullImage: string;
  alt: string;
}

interface MuseumGalleryProps {
  artworks: Artwork[];
  onViewAll?: () => void;
}

const MuseumGallery: React.FC<MuseumGalleryProps> = ({ artworks, onViewAll }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((artwork: Artwork, index: number) => {
    setSelectedArtwork(artwork);
    setCurrentIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === artworks.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedArtwork(artworks[newIndex]);
  }, [currentIndex, artworks]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedArtwork) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtwork, closeLightbox, navigateLightbox]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedArtwork) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedArtwork]);

  return (
    <section className="py-20 bg-bg-primary" aria-labelledby="museum-heading">
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <h2 id="museum-heading" className="text-3xl font-bold text-text-primary">
            🖼️ Музей «Равновесие»
          </h2>
          <button 
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-4 py-3 bg-transparent border border-border rounded-full text-primary font-medium transition-all hover:bg-primary hover:border-primary hover:text-white min-h-[44px]"
            aria-label="Вся галерея"
          >
            Вся галерея <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        <p className="text-lg text-text-secondary mb-10 max-w-3xl leading-relaxed">
          Уникальная коллекция произведений искусства, созданных людьми с инвалидностью. 
          Каждая картина — это история преодоления, таланта и вдохновения.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Галерея картин">
          {artworks.map((artwork, index) => (
            <article 
              key={artwork.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:-translate-y-1 hover:shadow-xl group"
              role="listitem"
            >
              <button
                onClick={() => openLightbox(artwork, index)}
                className="w-full text-left bg-transparent border-none p-0 cursor-pointer"
                aria-label={`Открыть картину: ${artwork.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-primary">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="text-5xl">🎨</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                    <Zoom size={24} aria-hidden="true" />
                    <span className="text-sm font-medium">Увеличить</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1">
                    {artwork.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-2">
                    {artwork.artist}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <span>{artwork.year}</span>
                    <span aria-hidden="true">•</span>
                    <span className="line-clamp-1">{artwork.technique}</span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
          role="dialog" 
          aria-modal="true"
          aria-label={`Просмотр картины: ${selectedArtwork.title}`}
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute -top-12 right-0 w-11 h-11 bg-white/20 border-none rounded-full text-white cursor-pointer transition-colors hover:bg-white/30 flex items-center justify-center z-10"
              onClick={closeLightbox}
              aria-label="Закрыть"
            >
              <X size={24} />
            </button>

            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 border-none rounded-full text-white cursor-pointer transition-colors hover:bg-white/30 flex items-center justify-center hidden lg:flex"
              onClick={() => navigateLightbox('prev')}
              aria-label="Предыдущая картина"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="bg-white rounded-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <span className="text-8xl">🎨</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-text-primary mb-2">{selectedArtwork.title}</h3>
                <p className="text-lg text-text-secondary mb-4">{selectedArtwork.artist}</p>
                
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <dt className="text-sm text-text-muted">Год создания:</dt>
                    <dd className="font-medium text-text-primary">{selectedArtwork.year}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-text-muted">Техника:</dt>
                    <dd className="font-medium text-text-primary">{selectedArtwork.technique}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-text-muted">Размер:</dt>
                    <dd className="font-medium text-text-primary">{selectedArtwork.size}</dd>
                  </div>
                </dl>
                
                {selectedArtwork.description && (
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {selectedArtwork.description}
                  </p>
                )}
                
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full transition-colors hover:bg-primary-dark min-h-[44px]">
                  <Download size={18} aria-hidden="true" />
                  Скачать изображение
                </button>
              </div>
            </div>

            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 border-none rounded-full text-white cursor-pointer transition-colors hover:bg-white/30 flex items-center justify-center hidden lg:flex"
              onClick={() => navigateLightbox('next')}
              aria-label="Следующая картина"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MuseumGallery;
