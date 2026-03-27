import HeroSection from '@/components/HeroSection';
import NewsSection from '@/components/NewsSection';
import MuseumGallery from '@/components/MuseumGallery';
import ServicesSection from '@/components/ServicesSection';
import PrizePreviewSection from '@/components/PrizePreviewSection';
import ContactSection from '@/components/ContactSection';
import { newsData, artworksData, servicesData, prizeData, contactData } from '@/data/mockData';

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <NewsSection 
        news={newsData.slice(0, 6)} 
        onViewAll={() => window.location.href = '/news'}
      />
      
      <PrizePreviewSection prizeData={prizeData} />
      
      <MuseumGallery 
        artworks={artworksData.slice(0, 8)} 
        onViewAll={() => window.location.href = '/museum'}
      />
      
      <ServicesSection services={servicesData} />
      
      <ContactSection contactData={contactData} />
      
      {/* Partners section placeholder */}
      <section className="py-20 bg-bg-tertiary" aria-labelledby="partners-heading">
        <div className="container-custom">
          <h2 id="partners-heading" className="text-3xl font-bold text-text-primary text-center mb-10">
            🤝 Наши партнёры
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div 
                key={i}
                className="bg-white rounded-lg p-6 border border-border flex items-center justify-center min-h-[120px] hover:shadow-md transition-shadow"
              >
                <div className="text-center text-text-muted">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary font-bold text-lg">П{i}</span>
                  </div>
                  <span className="text-sm">Партнёр {i}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a 
              href="/partners" 
              className="inline-flex px-8 py-4 bg-primary text-white font-semibold rounded-full transition-all hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
            >
              Стать партнёром
            </a>
          </div>
        </div>
      </section>
      
      {/* Donate CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white" aria-labelledby="donate-heading">
        <div className="container-custom text-center">
          <h2 id="donate-heading" className="text-3xl md:text-4xl font-bold mb-6">
            Поддержите фонд «Филантроп»
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Ваше пожертвование поможет людям с инвалидностью раскрыть свой творческий потенциал и найти своё место в обществе
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="/donate" 
              className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
            >
              Пожертвовать сейчас
            </a>
            <a 
              href="/about" 
              className="inline-flex px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all hover:bg-white hover:text-primary min-h-[44px]"
            >
              Узнать о фонде
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
