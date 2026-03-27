import React from 'react';
import Link from 'next/link';
import { Music, Palette, BookOpen, Award, Download, ArrowRight } from 'lucide-react';

interface PrizeData {
  organizers: { name: string; logo: string }[];
  leadership: {
    trustees: { name: string; position: string };
    jury: { name: string; position: string };
    committee: { name: string; position: string };
  };
  nominations: {
    id: string;
    title: string;
    icon: string;
    description: string;
    subcategories: string[];
  }[];
  specialPrizes: string[];
  documents: { name: string; type: string; size: string; url: string }[];
}

interface PrizePreviewSectionProps {
  prizeData: PrizeData;
}

const iconMap: Record<string, React.ReactNode> = {
  music: <Music size={40} />,
  palette: <Palette size={40} />,
  book: <BookOpen size={40} />,
};

const PrizePreviewSection: React.FC<PrizePreviewSectionProps> = ({ prizeData }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-bg-tertiary to-bg-primary" aria-labelledby="prize-heading">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 id="prize-heading" className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            🏆 Премия «Филантроп»
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Всероссийская премия для людей с инвалидностью в сфере культуры и искусства
          </p>
        </div>

        {/* Organizers */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">Организаторы премии</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {prizeData.organizers.map((organizer, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 border border-border flex items-center justify-center min-h-[100px]"
              >
                <div className="text-center text-sm font-medium text-text-secondary">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award size={24} className="text-primary" />
                  </div>
                  {organizer.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">Руководство премии</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-border text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-primary" />
              </div>
              <div className="text-sm text-text-muted mb-1">{prizeData.leadership.trustees.position}</div>
              <div className="font-semibold text-text-primary">{prizeData.leadership.trustees.name}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-accent" />
              </div>
              <div className="text-sm text-text-muted mb-1">{prizeData.leadership.jury.position}</div>
              <div className="font-semibold text-text-primary">{prizeData.leadership.jury.name}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-primary" />
              </div>
              <div className="text-sm text-text-muted mb-1">{prizeData.leadership.committee.position}</div>
              <div className="font-semibold text-text-primary">{prizeData.leadership.committee.name}</div>
            </div>
          </div>
        </div>

        {/* Nominations */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">Номинации</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prizeData.nominations.map((nomination) => (
              <div 
                key={nomination.id}
                className="bg-white rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[nomination.icon]}
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">{nomination.title}</h4>
                <p className="text-text-secondary text-sm mb-4">{nomination.description}</p>
                <ul className="space-y-1">
                  {nomination.subcategories.map((sub, index) => (
                    <li key={index} className="text-sm text-text-secondary flex items-start gap-2">
                      <span className="text-accent mt-0.5" aria-hidden="true">•</span>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Special prizes */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">Специальные премии</h3>
          <div className="bg-white rounded-xl p-6 border border-border max-w-3xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prizeData.specialPrizes.map((prize, index) => (
                <li key={index} className="flex items-center gap-3 text-text-secondary">
                  <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" aria-hidden="true"></span>
                  {prize}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documents */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">Документы</h3>
          <div className="bg-white rounded-xl border border-border max-w-3xl mx-auto overflow-hidden">
            {prizeData.documents.map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-bg-tertiary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Download size={20} className="text-primary" />
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

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/prize/apply" 
            className="inline-flex px-8 py-4 bg-primary text-white font-semibold rounded-full transition-all hover:bg-primary-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
          >
            Подать заявку
          </Link>
          <Link 
            href="/prize" 
            className="inline-flex px-8 py-4 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-1 hover:shadow-lg min-h-[44px]"
          >
            Узнать о премии
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrizePreviewSection;
