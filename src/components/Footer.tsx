import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Vk, Send, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: 'О фонде', href: '/about' },
      { label: 'Документы', href: '/about/documents' },
      { label: 'Программы', href: '/about/programs' },
      { label: 'Команда', href: '/about/team' },
      { label: 'Награды', href: '/about/awards' },
    ],
    prize: [
      { label: 'О премии', href: '/prize' },
      { label: 'Подать заявку', href: '/prize/apply' },
      { label: 'Жюри', href: '/prize/jury' },
      { label: 'Номинации', href: '/prize/nominations' },
      { label: 'Лауреаты', href: '/prize/laureates' },
    ],
    services: [
      { label: 'Трудоустройство', href: '/services/employment' },
      { label: 'Полиграфия', href: '/services/printing' },
      { label: 'Дизайн', href: '/services/design' },
      { label: 'Транспорт', href: '/services/transport' },
      { label: 'Мероприятия', href: '/services/events' },
    ],
    media: [
      { label: 'Фотогалерея', href: '/media/photos' },
      { label: 'Видео', href: '/media/videos' },
      { label: 'Пресс-центр', href: '/media/press' },
    ],
  };

  return (
    <footer className="bg-bg-tertiary border-t border-border" role="contentinfo">
      <div className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Logo and contact info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Ф</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-primary">ФИЛАНТРОП</div>
                  <div className="text-xs text-text-muted">Благотворительный фонд</div>
                </div>
              </Link>
              
              <div className="space-y-3 mb-6">
                <a href="tel:+79175576990" className="flex items-center gap-2 text-text-primary hover:text-primary transition-colors">
                  <Phone size={18} aria-hidden="true" />
                  <span>+7 (917) 557-69-90</span>
                </a>
                <a href="mailto:info@filantrop.ru" className="flex items-center gap-2 text-text-primary hover:text-primary transition-colors">
                  <Mail size={18} aria-hidden="true" />
                  <span>info@filantrop.ru</span>
                </a>
                <div className="flex items-start gap-2 text-text-primary">
                  <MapPin size={18} aria-hidden="true" className="mt-0.5 flex-shrink-0" />
                  <span>101000, Москва, ул. Маросейка, д. 4</span>
                </div>
                <div className="flex items-center gap-2 text-text-primary">
                  <Clock size={18} aria-hidden="true" />
                  <div>
                    <div>Пн-Пт: 10:00 - 18:00 (МСК)</div>
                    <div className="text-text-muted">Сб-Вс: Выходной</div>
                  </div>
                </div>
              </div>

              {/* Social media */}
              <div className="flex items-center gap-3">
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors" aria-label="ВКонтакте">
                  <Vk size={20} />
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors" aria-label="Telegram">
                  <Send size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* About links */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">О фонде</h3>
              <ul className="space-y-2 list-none">
                {footerLinks.about.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-text-secondary hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prize links */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Премия</h3>
              <ul className="space-y-2 list-none">
                {footerLinks.prize.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-text-secondary hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services links */}
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Услуги</h3>
              <ul className="space-y-2 list-none">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-text-secondary hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-text-muted text-sm">
              © {currentYear} БФ «Филантроп». Все права защищены.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-text-muted hover:text-primary transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/sitemap" className="text-text-muted hover:text-primary transition-colors">
                Карта сайта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
