import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

interface ContactData {
  address: string;
  phone: string;
  email: string;
  hours: {
    weekday: string;
    weekend: string;
  };
}

interface ContactSectionProps {
  contactData: ContactData;
}

const ContactSection: React.FC<ContactSectionProps> = ({ contactData }) => {
  return (
    <section className="py-20 bg-bg-secondary" aria-labelledby="contact-heading">
      <div className="container-custom">
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">
          <h2 id="contact-heading" className="text-3xl font-bold text-text-primary">
            📍 Контакты
          </h2>
          <Link 
            href="/contacts" 
            className="inline-flex items-center gap-2 px-4 py-3 bg-transparent border border-border rounded-full text-primary font-medium transition-all hover:bg-primary hover:border-primary hover:text-white min-h-[44px]"
          >
            Все контакты <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="bg-bg-tertiary rounded-xl p-8 border border-border">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Контактная информация</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-medium text-text-primary mb-1">Адрес</div>
                  <div className="text-text-secondary">{contactData.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-medium text-text-primary mb-1">График работы</div>
                  <div className="text-text-secondary">{contactData.hours.weekday}</div>
                  <div className="text-text-muted">{contactData.hours.weekend}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-medium text-text-primary mb-1">Телефон</div>
                  <a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="text-text-secondary hover:text-primary transition-colors">
                    {contactData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-medium text-text-primary mb-1">Email</div>
                  <a href={`mailto:${contactData.email}`} className="text-text-secondary hover:text-primary transition-colors">
                    {contactData.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                <span className="w-2 h-2 bg-success rounded-full" aria-hidden="true"></span>
                <span>Доступная среда: пандус, лифт</span>
              </div>
              <div className="text-sm text-text-muted">
                🚇 Метро: Китай-город (5 мин пешком)
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-bg-tertiary rounded-xl border border-border overflow-hidden min-h-[400px]">
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin size={48} className="text-primary mx-auto mb-4" aria-hidden="true" />
                <div className="text-text-secondary mb-4">Интерактивная карта</div>
                <a 
                  href="https://yandex.ru/maps" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-dark transition-colors min-h-[44px]"
                >
                  Открыть в Яндекс.Картах
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
