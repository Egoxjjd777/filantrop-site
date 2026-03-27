import React from 'react';
import Link from 'next/link';
import { Award, Building, Radio, Heart, ArrowRight, Mail, Phone } from 'lucide-react';
import { partnersData } from '@/data/mockData';

export default function PartnersPage() {
  const governmentPartners = partnersData.filter(p => p.type === 'government');
  const mediaPartners = partnersData.filter(p => p.type === 'media');
  const corporatePartners = partnersData.filter(p => p.type === 'corporate');

  const partnerTypes = [
    {
      title: 'Государственные партнёры',
      icon: <Building size={32} />,
      partners: governmentPartners,
      description: 'Органы государственной власти и учреждения',
    },
    {
      title: 'Информационные партнёры',
      icon: <Radio size={32} />,
      partners: mediaPartners,
      description: 'СМИ и информационные платформы',
    },
    {
      title: 'Корпоративные партнёры',
      icon: <Award size={32} />,
      partners: corporatePartners,
      description: 'Компании и организации',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16">
        <div className="container-custom">
          <nav className="text-sm mb-6 opacity-80" aria-label="Хлебные крошки">
            <ol className="flex items-center gap-2 list-none">
              <li><Link href="/" className="hover:underline">Главная</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">Партнёрам</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🤝 Партнёрам</h1>
          <p className="text-xl opacity-90 max-w-3xl mb-8">
            Приглашаем организации и частных лиц к сотрудничеству в поддержке 
            людей с инвалидностью в сфере культуры и искусства
          </p>
          <Link 
            href="/partners/become" 
            className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
          >
            Стать партнёром
          </Link>
        </div>
      </section>

      {/* Why become a partner */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Почему стоит стать партнёром?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Heart size={40} />,
                title: 'Социальная ответственность',
                description: 'Вклад в развитие инклюзивного общества и поддержку людей с инвалидностью',
              },
              {
                icon: <Award size={40} />,
                title: 'Репутация',
                description: 'Укрепление имиджа социально ответственной организации',
              },
              {
                icon: <Building size={40} />,
                title: 'Нетворкинг',
                description: 'Вхождение в сообщество ведущих российских компаний и организаций',
              },
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-bg-tertiary rounded-xl p-8 border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership types */}
      <section className="py-16 bg-bg-tertiary">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Формы партнёрства
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Генеральный партнёр',
                description: 'Крупная финансовая поддержка программ фонда',
                benefits: ['Размещение логотипа на всех материалах', 'Упоминание в СМИ', 'Приглашения на события'],
              },
              {
                title: 'Партнёр программы',
                description: 'Поддержка конкретного направления работы',
                benefits: ['Логотип на материалах программы', 'Отчётность о результатах', 'Участие в событиях'],
              },
              {
                title: 'Информационный партнёр',
                description: 'Информационная поддержка мероприятий',
                benefits: ['Обмен новостями', 'Совместные публикации', 'Кросс-промо'],
              },
              {
                title: 'Волонтёрский партнёр',
                description: 'Предоставление волонтёров для мероприятий',
                benefits: ['Корпоративное волонтёрство', 'Тимбилдинг', 'Социальный эффект'],
              },
            ].map((type, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-2">{type.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-accent mt-0.5" aria-hidden="true">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current partners */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Наши партнёры
          </h2>
          
          {partnerTypes.map((type, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center">
                  {type.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">{type.title}</h3>
                  <p className="text-text-secondary text-sm">{type.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {type.partners.map((partner) => (
                  <div 
                    key={partner.id}
                    className="bg-bg-tertiary rounded-lg p-6 border border-border flex items-center justify-center min-h-[120px] hover:shadow-md transition-shadow"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Building size={24} className="text-primary" />
                      </div>
                      <div className="text-sm font-medium text-text-primary">{partner.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Готовы стать партнёром?</h2>
              <p className="text-xl opacity-90 mb-8">
                Свяжитесь с нами для обсуждения возможностей сотрудничества
              </p>
              <div className="space-y-4">
                <a href="tel:+79175576990" className="flex items-center gap-3 text-lg hover:text-accent transition-colors">
                  <Phone size={20} aria-hidden="true" />
                  <span>+7 (917) 557-69-90</span>
                </a>
                <a href="mailto:partners@filantrop.ru" className="flex items-center gap-3 text-lg hover:text-accent transition-colors">
                  <Mail size={20} aria-hidden="true" />
                  <span>partners@filantrop.ru</span>
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">Заполните заявку</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="org-name" className="block text-sm mb-2">Название организации</label>
                  <input
                    type="text"
                    id="org-name"
                    className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px]"
                    placeholder="ООО «Пример»"
                  />
                </div>
                <div>
                  <label htmlFor="contact-name" className="block text-sm mb-2">Контактное лицо</label>
                  <input
                    type="text"
                    id="contact-name"
                    className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px]"
                    placeholder="Иванов Иван"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent min-h-[44px]"
                    placeholder="email@company.ru"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-accent text-text-primary font-semibold rounded-lg hover:bg-accent-dark transition-colors min-h-[44px]"
                >
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
