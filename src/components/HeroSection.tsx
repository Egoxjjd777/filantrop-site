import React from 'react';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="hero relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
      {/* Decorative pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
          Благотворительный фонд «Филантроп»
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Поддерживаем людей с инвалидностью в сфере культуры и искусства
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link 
            href="/prize/apply" 
            className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-1 hover:shadow-lg text-lg min-h-[44px]"
          >
            Подать заявку на премию
          </Link>
          <Link 
            href="/partners" 
            className="inline-flex px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all hover:bg-white hover:text-primary text-lg min-h-[44px]"
          >
            Стать партнёром
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
