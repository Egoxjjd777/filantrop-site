import React from 'react';
import Link from 'next/link';
import { Music, Palette, BookOpen, Award, Download, ArrowRight, Users, FileText } from 'lucide-react';
import { prizeData, teamData } from '@/data/mockData';

export default function PrizePage() {
  const iconMap: Record<string, React.ReactNode> = {
    music: <Music size={48} />,
    palette: <Palette size={48} />,
    book: <BookOpen size={48} />,
  };

  const years = ['2025', '2023', '2020', '2018', '2016', '2014', '2012'];

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="container-custom">
          <nav className="text-sm mb-6 opacity-80" aria-label="Хлебные крошки">
            <ol className="flex items-center gap-2 list-none">
              <li><Link href="/" className="hover:underline">Главная</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">Премия</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Премия «Филантроп»</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mb-8">
            Всероссийская премия для людей с инвалидностью в сфере культуры и искусства
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/prize/apply" 
              className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
            >
              Подать заявку
            </Link>
            <Link 
              href="/prize/documents" 
              className="inline-flex px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all hover:bg-white hover:text-primary min-h-[44px]"
            >
              Документы
            </Link>
          </div>
        </div>
      </section>

      {/* Organizers */}
      <section className="py-16 bg-white" aria-labelledby="organizers-heading">
        <div className="container-custom">
          <h2 id="organizers-heading" className="text-2xl font-bold text-text-primary mb-8 text-center">Организаторы премии</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {prizeData.organizers.map((organizer, index) => (
              <div 
                key={index}
                className="bg-bg-tertiary rounded-xl p-6 border border-border flex items-center justify-center min-h-[140px] hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award size={32} className="text-primary" />
                  </div>
                  <div className="text-sm font-medium text-text-primary">{organizer.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-bg-tertiary" aria-labelledby="leadership-heading">
        <div className="container-custom">
          <h2 id="leadership-heading" className="text-2xl font-bold text-text-primary mb-8 text-center">Руководство премии</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-border text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={40} className="text-primary" />
              </div>
              <div className="text-sm text-text-muted mb-2">{prizeData.leadership.trustees.position}</div>
              <div className="font-semibold text-lg text-text-primary">{prizeData.leadership.trustees.name}</div>
            </div>
            <div className="bg-white rounded-xl p-8 border border-accent/30 text-center shadow-md">
              <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={40} className="text-accent" />
              </div>
              <div className="text-sm text-text-muted mb-2">{prizeData.leadership.jury.position}</div>
              <div className="font-semibold text-lg text-text-primary">{prizeData.leadership.jury.name}</div>
            </div>
            <div className="bg-white rounded-xl p-8 border border-border text-center hover:shadow-lg transition-shadow">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={40} className="text-primary" />
              </div>
              <div className="text-sm text-text-muted mb-2">{prizeData.leadership.committee.position}</div>
              <div className="font-semibold text-lg text-text-primary">{prizeData.leadership.committee.name}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Nominations */}
      <section className="py-16 bg-white" aria-labelledby="nominations-heading">
        <div className="container-custom">
          <h2 id="nominations-heading" className="text-2xl font-bold text-text-primary mb-8 text-center">Номинации</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {prizeData.nominations.map((nomination) => (
              <div 
                key={nomination.id}
                className="bg-bg-tertiary rounded-xl p-8 border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="w-20 h-20 bg-primary text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {iconMap[nomination.icon]}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{nomination.title}</h3>
                <p className="text-text-secondary mb-4">{nomination.description}</p>
                <ul className="space-y-2 mb-6">
                  {nomination.subcategories.map((sub, index) => (
                    <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-accent mt-1" aria-hidden="true">✓</span>
                      {sub}
                    </li>
                  ))}
                </ul>
                <Link href={`/prize/nominations/${nomination.id}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                  Подробнее <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special prizes */}
      <section className="py-16 bg-bg-tertiary" aria-labelledby="special-heading">
        <div className="container-custom">
          <h2 id="special-heading" className="text-2xl font-bold text-text-primary mb-8 text-center">Специальные премии</h2>
          <div className="bg-white rounded-xl p-8 border border-border max-w-3xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prizeData.specialPrizes.map((prize, index) => (
                <li key={index} className="flex items-center gap-4 p-4 bg-bg-tertiary rounded-lg">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award size={20} className="text-accent" />
                  </div>
                  <span className="text-text-primary font-medium">{prize}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Nominees by year */}
      <section className="py-16 bg-white" aria-labelledby="nominees-heading">
        <div className="container-custom">
          <h2 id="nominees-heading" className="text-2xl font-bold text-text-primary mb-8 text-center">Номинанты по годам</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {years.map((year) => (
              <Link
                key={year}
                href={`/prize/nominees/${year}`}
                className="px-6 py-3 bg-bg-tertiary border border-border rounded-full text-text-primary font-medium hover:bg-primary hover:border-primary hover:text-white transition-all min-h-[44px]"
              >
                {year}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/prize/nominees" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Все номинанты <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-bg-tertiary" aria-labelledby="documents-heading">
        <div className="container-custom">
          <h2 id="documents-heading" className="text-2xl font-bold text-text-primary mb-8 text-center">Документы</h2>
          <div className="bg-white rounded-xl border border-border max-w-3xl mx-auto overflow-hidden">
            {prizeData.documents.map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                className="flex items-center justify-between p-6 border-b border-border last:border-b-0 hover:bg-bg-tertiary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{doc.name}</div>
                    <div className="text-sm text-text-muted">{doc.type}, {doc.size}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Download size={20} className="text-text-muted" aria-hidden="true" />
                  <ArrowRight size={20} className="text-text-muted" aria-hidden="true" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы подать заявку?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Принимайте участие в премии «Филантроп» и получите признание вашего таланта
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/prize/apply" 
              className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
            >
              Подать заявку
            </Link>
            <Link 
              href="/prize/jury" 
              className="inline-flex px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all hover:bg-white hover:text-primary min-h-[44px]"
            >
              О жюри
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
