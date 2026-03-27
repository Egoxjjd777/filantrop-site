import React from 'react';
import Link from 'next/link';
import { Award, FileText, Users, Heart, ArrowRight, Calendar, Star } from 'lucide-react';
import { aboutData, teamData } from '@/data/mockData';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container-custom">
          <nav className="text-sm mb-6 opacity-80" aria-label="Хлебные крошки">
            <ol className="flex items-center gap-2 list-none">
              <li><Link href="/" className="hover:underline">Главная</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">О фонде</li>
            </ol>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">О фонде «Филантроп»</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              {aboutData.mission}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/about/programs" 
                className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
              >
                Наши программы
              </Link>
              <Link 
                href="/about/team" 
                className="inline-flex px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all hover:bg-white hover:text-primary min-h-[44px]"
              >
                Команда фонда
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '25+', label: 'Лет работы', icon: <Calendar size={32} /> },
              { value: '200+', label: 'Реализованных программ', icon: <FileText size={32} /> },
              { value: '10 000+', label: 'Помогли людям', icon: <Users size={32} /> },
              { value: '50+', label: 'Наград и признаний', icon: <Award size={32} /> },
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-bg-tertiary rounded-xl p-6 border border-border text-center hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-bg-tertiary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">📜 История фонда</h2>
            <div className="bg-white rounded-xl p-8 border border-border">
              <p className="text-text-secondary leading-relaxed mb-6">
                {aboutData.history}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { year: '1995', event: 'Основание фонда' },
                  { year: '2000', event: 'Запуск первых программ реабилитации' },
                  { year: '2008', event: 'Открытие музея «Равновесие»' },
                  { year: '2012', event: 'Первая премия «Филантроп»' },
                  { year: '2018', event: 'Запуск службы доступного транспорта' },
                  { year: '2023', event: 'Расширение программ трудоустройства' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-bg-tertiary rounded-lg">
                    <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                      {item.year.slice(-2)}
                    </div>
                    <div className="text-text-primary font-medium">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs preview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">🎯 Программы и проекты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.programs.map((program, index) => (
              <article 
                key={index}
                className="bg-bg-tertiary rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart size={24} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {program.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {program.description}
                </p>
                <Link href="/about/programs" className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                  Подробнее <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link 
              href="/about/programs" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Все программы <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="py-16 bg-bg-tertiary">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">👥 Команда фонда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member) => (
              <article 
                key={member.id}
                className="bg-white rounded-xl p-6 border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={40} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  {member.position}
                </p>
                <a href={`mailto:${member.email}`} className="text-primary text-sm hover:underline">
                  {member.email}
                </a>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link 
              href="/about/team" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Вся команда <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">🏆 Награды и признание</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {aboutData.awards.map((award, index) => (
              <div 
                key={index}
                className="bg-bg-tertiary rounded-xl p-6 border border-border text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star size={32} className="text-accent" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{award.year}</div>
                <div className="text-sm text-text-secondary">{award.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-bg-tertiary">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">📄 Документы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { name: 'Устав фонда', type: 'PDF', size: '1.2 MB' },
              { name: 'Свидетельство о регистрации', type: 'PDF', size: '456 KB' },
              { name: 'Реквизиты фонда', type: 'PDF', size: '234 KB' },
              { name: 'Отчёт за 2025 год', type: 'PDF', size: '3.4 MB' },
            ].map((doc, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{doc.name}</div>
                    <div className="text-sm text-text-muted">{doc.type}, {doc.size}</div>
                  </div>
                </div>
                <ArrowRight size={20} className="text-text-muted" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Хотите помочь фонду?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ваше пожертвование поможет людям с инвалидностью раскрыть свой творческий потенциал
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/donate" 
              className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
            >
              Пожертвовать
            </Link>
            <Link 
              href="/partners" 
              className="inline-flex px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all hover:bg-white hover:text-primary min-h-[44px]"
            >
              Стать партнёром
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
