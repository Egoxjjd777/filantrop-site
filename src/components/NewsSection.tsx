'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  category?: string;
}

interface NewsSectionProps {
  news: NewsItem[];
  onViewAll?: () => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, onViewAll }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month.toLowerCase()} ${year}`;
  };

  return (
    <section className="py-20 bg-bg-secondary" aria-labelledby="news-heading">
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <h2 id="news-heading" className="text-3xl font-bold text-text-primary">
            📰 Новости и события
          </h2>
          <Link 
            href="/news" 
            className="inline-flex items-center gap-2 px-4 py-3 bg-transparent border border-border rounded-full text-primary font-medium transition-all hover:bg-primary hover:border-primary hover:text-white min-h-[44px]"
          >
            Все новости <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <article 
              key={item.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:-translate-y-1 hover:shadow-xl group"
              itemScope 
              itemType="https://schema.org/NewsArticle"
            >
              <Link href={`/news/${item.id}`} className="block" aria-label={`Читать новость: ${item.title}`}>
                <div className="relative aspect-video overflow-hidden bg-bg-primary">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-6xl">📰</span>
                  </div>
                  {item.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-md uppercase tracking-wide">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3 text-sm text-text-muted">
                    <time dateTime={item.date} className="flex items-center gap-2" itemProp="datePublished">
                      <Calendar size={14} aria-hidden="true" />
                      {formatDate(item.date)}
                    </time>
                  </div>

                  <h3 className="text-xl font-semibold text-text-primary mb-3 line-clamp-2 group-hover:text-primary transition-colors" itemProp="headline">
                    {item.title}
                  </h3>

                  <p className="text-text-secondary line-clamp-3 mb-4" itemProp="description">
                    {item.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm">
                    Читать далее <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
