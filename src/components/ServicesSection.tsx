import React from 'react';
import Link from 'next/link';
import { Users, Printer, Palette, Truck, Calendar, ArrowRight } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  link: string;
}

interface ServicesSectionProps {
  services: Service[];
}

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={32} />,
  printer: <Printer size={32} />,
  palette: <Palette size={32} />,
  truck: <Truck size={32} />,
  calendar: <Calendar size={32} />,
};

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  return (
    <section className="py-20 bg-bg-secondary" aria-labelledby="services-heading">
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <h2 id="services-heading" className="text-3xl font-bold text-text-primary">
            🛎️ Услуги фонда
          </h2>
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 px-4 py-3 bg-transparent border border-border rounded-full text-primary font-medium transition-all hover:bg-primary hover:border-primary hover:text-white min-h-[44px]"
          >
            Все услуги <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <article 
              key={service.id} 
              className="bg-bg-tertiary rounded-xl p-6 border border-border transition-all hover:shadow-lg hover:border-primary/30 group"
            >
              <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {iconMap[service.icon] || <Users size={32} />}
              </div>
              
              <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-text-secondary mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-accent mt-0.5" aria-hidden="true">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={service.link}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                Подробнее <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
