'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Zoom, ChevronLeft, ChevronRight, Download, X, Search, Filter } from 'lucide-react';
import { artworksData } from '@/data/mockData';

export default function MuseumPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworksData[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('all');
  const [selectedTechnique, setSelectedTechnique] = useState('all');

  const artists = ['all', ...Array.from(new Set(artworksData.map((a) => a.artist)))];
  const techniques = ['all', ...Array.from(new Set(artworksData.map((a) => a.technique.split(',')[0])))];

  const filteredArtworks = artworksData.filter((artwork) => {
    const matchesSearch = searchQuery === '' || 
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArtist = selectedArtist === 'all' || artwork.artist === selectedArtist;
    const matchesTechnique = selectedTechnique === 'all' || artwork.technique.startsWith(selectedTechnique);
    return matchesSearch && matchesArtist && matchesTechnique;
  });

  const openLightbox = useCallback((artwork: typeof artworksData[0], index: number) => {
    setSelectedArtwork(artwork);
    setCurrentIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    const visibleArtworks = filteredArtworks;
    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? visibleArtworks.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === visibleArtworks.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedArtwork(visibleArtworks[newIndex]);
  }, [currentIndex, filteredArtworks]);

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container-custom">
          <nav className="text-sm mb-6 opacity-80" aria-label="Хлебные крошки">
            <ol className="flex items-center gap-2 list-none">
              <li><Link href="/" className="hover:underline">Главная</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/about/programs" className="hover:underline">Программы</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">Музей «Равновесие»</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">🖼️ Музей «Равновесие»</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mb-8">
            Уникальная коллекция произведений искусства, созданных людьми с инвалидностью. 
            Каждая картина — это история преодоления, таланта и вдохновения.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/museum/about" 
              className="inline-flex px-6 py-3 bg-white text-primary font-semibold rounded-full transition-all hover:bg-bg-tertiary min-h-[44px]"
            >
              О музее
            </Link>
            <Link 
              href="/museum/excursions" 
              className="inline-flex px-6 py-3 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all hover:bg-white hover:text-primary min-h-[44px]"
            >
              Экскурсии
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <label htmlFor="artwork-search" className="visually-hidden">Поиск работ</label>
              <input
                id="artwork-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск работ..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px]"
              />
              <button className="w-11 h-11 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors min-h-[44px]" aria-label="Найти">
                <Search size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary rounded-lg border border-border">
                <Filter size={18} className="text-text-muted" aria-hidden="true" />
                <span className="text-text-secondary text-sm">Фильтры:</span>
              </div>

              <label htmlFor="artist-filter" className="visually-hidden">Фильтр по художнику</label>
              <select
                id="artist-filter"
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px] bg-white"
              >
                <option value="all">Все художники</option>
                {artists.filter(a => a !== 'all').map((artist) => (
                  <option key={artist} value={artist}>{artist}</option>
                ))}
              </select>

              <label htmlFor="technique-filter" className="visually-hidden">Фильтр по технике</label>
              <select
                id="technique-filter"
                value={selectedTechnique}
                onChange={(e) => setSelectedTechnique(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px] bg-white"
              >
                <option value="all">Все техники</option>
                {techniques.filter(t => t !== 'all').map((technique) => (
                  <option key={technique} value={technique}>{technique}</option>
                ))}
              </select>

              {(selectedArtist !== 'all' || selectedTechnique !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedArtist('all');
                    setSelectedTechnique('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-3 text-primary hover:text-primary-dark font-medium min-h-[44px]"
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="container-custom">
          {filteredArtworks.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎨</div>
              <h2 className="text-2xl font-semibold text-text-primary mb-2">Ничего не найдено</h2>
              <p className="text-text-secondary">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredArtworks.map((artwork, index) => (
                  <article 
                    key={artwork.id} 
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-border transition-all hover:-translate-y-2 hover:shadow-xl group cursor-pointer"
                    role="listitem"
                  >
                    <button
                      onClick={() => openLightbox(artwork, index)}
                      className="w-full text-left bg-transparent border-none p-0 cursor-pointer"
                      aria-label={`Открыть картину: ${artwork.title}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-bg-primary">
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <span className="text-6xl">🎨</span>
                        </div>
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                          <Zoom size={28} aria-hidden="true" />
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

              {/* Load more */}
              <div className="text-center mt-12">
                <button className="px-8 py-4 bg-bg-tertiary border border-border text-text-primary font-semibold rounded-full hover:bg-primary hover:border-primary hover:text-white transition-all min-h-[44px]">
                  Показать ещё работы
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Visit info */}
      <section className="py-16 bg-bg-tertiary">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">📍 Посетить музей</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-border">
              <h3 className="text-xl font-semibold text-text-primary mb-6">Часы работы и контакты</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🕐</span>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary mb-1">Часы работы:</div>
                    <div className="text-text-secondary">Пн-Пт: 10:00 - 18:00</div>
                    <div className="text-text-secondary">Сб-Вс: по записи</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary mb-1">Адрес:</div>
                    <div className="text-text-secondary">Москва, ул. Маросейка, д. 4</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <div className="font-medium text-text-primary mb-1">Телефон:</div>
                    <a href="tel:+79175576990" className="text-primary hover:text-primary-dark transition-colors">+7 (917) 557-69-90</a>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <Link 
                  href="/museum/excursions" 
                  className="inline-flex px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors min-h-[44px]"
                >
                  Записаться на экскурсию
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border overflow-hidden min-h-[300px]">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-5xl mb-4 block">🗺️</span>
                  <div className="text-text-secondary mb-4">Карта проезда</div>
                  <a 
                    href="https://yandex.ru/maps" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors min-h-[44px]"
                  >
                    Открыть в Яндекс.Картах
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </div>
  );
}
