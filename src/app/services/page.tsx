import React from 'react';
import Link from 'next/link';
import { Users, Printer, Palette, Truck, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { servicesData } from '@/data/mockData';

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    users: <Users size={40} />,
    printer: <Printer size={40} />,
    palette: <Palette size={40} />,
    truck: <Truck size={40} />,
    calendar: <Calendar size={40} />,
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
              <li className="text-white" aria-current="page">Услуги</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🛎️ Услуги фонда</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Благотворительный фонд «Филантроп» предоставляет широкий спектр услуг 
            для людей с инвалидностью и организаций
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {servicesData.map((service, index) => (
              <article 
                key={service.id}
                className="bg-white rounded-xl p-8 border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {iconMap[service.icon]}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-text-secondary">
                          <CheckCircle size={18} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={service.link}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      Подробнее <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-bg-tertiary">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Нужна помощь в выборе услуги?
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами, и мы поможем подобрать оптимальное решение для вашей ситуации
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contacts" 
              className="inline-flex px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors min-h-[44px]"
            >
              Связаться с нами
            </Link>
            <a 
              href="tel:+79175576990" 
              className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full hover:bg-accent-dark transition-colors min-h-[44px]"
            >
              📞 +7 (917) 557-69-90
            </a>
          </div>
        </div>
      </section>

      {/* Accessibility info */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-4">♿</div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Доступная среда</h2>
            <p className="text-text-secondary leading-relaxed">
              Все услуги фонда доступны для людей с различными формами инвалидности. 
              Мы создали комфортные условия для посещения нашего офиса и получения услуг.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-bg-tertiary rounded-lg p-4">
                <div className="text-2xl mb-2">🚗</div>
                <div className="font-medium text-text-primary">Парковка</div>
                <div className="text-sm text-text-muted">Места для маломобильных</div>
              </div>
              <div className="bg-bg-tertiary rounded-lg p-4">
                <div className="text-2xl mb-2">🛗</div>
                <div className="font-medium text-text-primary">Лифт и пандус</div>
                <div className="text-sm text-text-muted">Доступ на все этажи</div>
              </div>
              <div className="bg-bg-tertiary rounded-lg p-4">
                <div className="text-2xl mb-2">🦮</div>
                <div className="font-medium text-text-primary">Сопровождение</div>
                <div className="text-sm text-text-muted">Помощь сотрудников</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
