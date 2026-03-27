'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { newsData } from '@/data/mockData';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...Array.from(new Set(newsData.map((n) => n.category)))];
  const years = ['all', ...Array.from(new Set(newsData.map((n) => new Date(n.date).getFullYear().toString())))];

  const filteredNews = newsData.filter((news) => {
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || new Date(news.date).getFullYear().toString() === selectedYear;
    const matchesSearch = searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesYear && matchesSearch;
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month.toLowerCase()} ${year}`;
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container-custom">
          <nav className="text-sm mb-6 opacity-80" aria-label="Хлебные крошки">
            <ol className="flex items-center gap-2 list-none">
              <li><Link href="/" className="hover:underline">Главная</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">Новости</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Новости и события</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Актуальная информация о деятельности фонда «Филантроп»
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <label htmlFor="search" className="visually-hidden">Поиск новостей</label>
              <input
                id="search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск новостей..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px]"
              />
              <button className="w-11 h-11 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors min-h-[44px]" aria-label="Найти">
                <Search size={20} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <label htmlFor="category-filter" className="visually-hidden">Фильтр по категории</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px] bg-white"
              >
                <option value="all">Все категории</option>
                {categories.filter(c => c !== 'all').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <label htmlFor="year-filter" className="visually-hidden">Фильтр по году</label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px] bg-white"
              >
                <option value="all">Все годы</option>
                {years.filter(y => y !== 'all').map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              {(selectedCategory !== 'all' || selectedYear !== 'all' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedYear('all');
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

      {/* News list */}
      <section className="py-12">
        <div className="container-custom">
          {filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📰</div>
              <h2 className="text-2xl font-semibold text-text-primary mb-2">Ничего не найдено</h2>
              <p className="text-text-secondary">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Featured article */}
              {filteredNews[0] && (
                <article className="lg:col-span-2 bg-white rounded-xl overflow-hidden shadow-lg border border-border">
                  <Link href={`/news/${filteredNews[0].id}`} className="block group">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-8xl">📰</span>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        {filteredNews[0].category && (
                          <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-md uppercase tracking-wide mb-3 w-fit">
                            {filteredNews[0].category}
                          </span>
                        )}
                        <time dateTime={filteredNews[0].date} className="text-sm text-text-muted mb-2 flex items-center gap-2">
                          <Calendar size={14} aria-hidden="true" />
                          {formatDate(filteredNews[0].date)}
                        </time>
                        <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                          {filteredNews[0].title}
                        </h2>
                        <p className="text-text-secondary mb-4 line-clamp-3">
                          {filteredNews[0].excerpt}
                        </p>
                        <span className="inline-flex items-center gap-2 text-primary font-semibold">
                          Читать далее <ArrowRight size={16} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              {/* Other articles */}
              {filteredNews.slice(1).map((item) => (
                <article 
                  key={item.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-border transition-all hover:-translate-y-1 hover:shadow-lg group"
                >
                  <Link href={`/news/${item.id}`} className="block">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-6xl">📰</span>
                    </div>
                    <div className="p-6">
                      {item.category && (
                        <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-semibold rounded-md uppercase tracking-wide mb-3 w-fit">
                          {item.category}
                        </span>
                      )}
                      <time dateTime={item.date} className="text-sm text-text-muted mb-2 flex items-center gap-2">
                        <Calendar size={14} aria-hidden="true" />
                        {formatDate(item.date)}
                      </time>
                      <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary line-clamp-2 mb-4">
                        {item.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                        Читать далее <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      <section className="py-8">
        <div className="container-custom">
          <nav className="flex items-center justify-center gap-2" aria-label="Пагинация">
            <button className="w-11 h-11 flex items-center justify-center border border-border rounded-lg text-text-secondary hover:bg-bg-primary hover:text-primary transition-colors min-h-[44px]" aria-label="Предыдущая страница">
              ←
            </button>
            <button className="w-11 h-11 flex items-center justify-center bg-primary text-white rounded-lg font-semibold min-h-[44px]" aria-current="page">1</button>
            <button className="w-11 h-11 flex items-center justify-center border border-border rounded-lg text-text-secondary hover:bg-bg-primary hover:text-primary transition-colors min-h-[44px]">2</button>
            <button className="w-11 h-11 flex items-center justify-center border border-border rounded-lg text-text-secondary hover:bg-bg-primary hover:text-primary transition-colors min-h-[44px]">3</button>
            <span className="px-2 text-text-muted">...</span>
            <button className="w-11 h-11 flex items-center justify-center border border-border rounded-lg text-text-secondary hover:bg-bg-primary hover:text-primary transition-colors min-h-[44px]">10</button>
            <button className="w-11 h-11 flex items-center justify-center border border-border rounded-lg text-text-secondary hover:bg-bg-primary hover:text-primary transition-colors min-h-[44px]" aria-label="Следующая страница">
              →
            </button>
          </nav>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-12 bg-bg-tertiary">
        <div className="container-custom">
          <div className="bg-white rounded-xl p-8 border border-border max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-3">📧 Подписка на новости</h2>
            <p className="text-text-secondary mb-6">Получайте важные новости фонда на email</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="visually-hidden">Ваш email</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Введите ваш email"
                required
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px]"
              />
              <button type="submit" className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors min-h-[44px]">
                Подписаться
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
