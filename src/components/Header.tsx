'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Phone, Mail, Eye, Menu, X, ChevronDown } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

const Header: React.FC = () => {
  const { isAccessibilityMode, toggleAccessibility } = useAccessibility();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    {
      label: 'О фонде',
      href: '/about',
      dropdown: [
        { label: 'О фонде', href: '/about' },
        { label: 'Документы', href: '/about/documents' },
        { label: 'Программы и проекты', href: '/about/programs' },
        { label: 'Команда фонда', href: '/about/team' },
        { label: 'Награды', href: '/about/awards' },
      ],
    },
    {
      label: 'Премия',
      href: '/prize',
      dropdown: [
        { label: 'О премии', href: '/prize' },
        { label: 'Положение и документы', href: '/prize/documents' },
        { label: 'Подать заявку', href: '/prize/apply' },
        { label: 'Жюри и попечительский совет', href: '/prize/jury' },
        { label: 'Номинации', href: '/prize/nominations' },
        { label: 'Лауреаты', href: '/prize/laureates' },
        { label: 'Номинанты', href: '/prize/nominees' },
      ],
    },
    { label: 'Новости', href: '/news' },
    {
      label: 'Услуги',
      href: '/services',
      dropdown: [
        { label: 'Трудоустройство', href: '/services/employment' },
        { label: 'Полиграфия', href: '/services/printing' },
        { label: 'Дизайн', href: '/services/design' },
        { label: 'Транспорт', href: '/services/transport' },
        { label: 'Мероприятия', href: '/services/events' },
      ],
    },
    {
      label: 'Медиа',
      href: '/media',
      dropdown: [
        { label: 'Фотогалерея', href: '/media/photos' },
        { label: 'Видео', href: '/media/videos' },
        { label: 'Публикации в СМИ', href: '/media/press' },
      ],
    },
    { label: 'Партнёрам', href: '/partners' },
    { label: 'Контакты', href: '/contacts' },
  ];

  return (
    <header className="header bg-white border-b border-border" role="banner">
      {/* Top bar with accessibility and search */}
      <div className="top-bar bg-bg-tertiary border-b border-border py-2" role="navigation" aria-label="Верхняя панель">
        <div className="container-custom flex items-center justify-between gap-4 flex-wrap">
          <button
            onClick={toggleAccessibility}
            className={`flex items-center gap-2 px-3 py-2 bg-transparent border border-border rounded-md text-text-secondary cursor-pointer transition-all text-sm min-h-[44px] hover:bg-bg-primary hover:border-primary hover:text-primary ${
              isAccessibilityMode ? 'bg-primary border-primary text-white' : ''
            }`}
            aria-pressed={isAccessibilityMode}
            aria-label="Версия для слабовидящих"
          >
            <Eye size={18} />
            <span className="hidden sm:inline">Версия для слабовидящих</span>
          </button>
          
          <div className="flex items-center gap-2">
            <label htmlFor="site-search" className="visually-hidden">
              Поиск по сайту
            </label>
            <input
              id="site-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск..."
              className="px-3 py-2 border border-border rounded-md text-sm min-w-[200px] min-h-[44px] focus:border-primary focus:outline-none"
              aria-label="Поиск по сайту"
            />
            <button type="submit" className="w-11 h-11 bg-primary text-white border-none rounded-md cursor-pointer transition-colors hover:bg-primary-dark flex items-center justify-center min-h-[44px]" aria-label="Найти">
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-text-muted" role="group" aria-label="Языки">
            <button className="text-primary font-semibold px-2 py-1 min-h-[44px]" aria-current="true">RU</button>
            <span aria-hidden="true">|</span>
            <button className="px-2 py-1 min-h-[44px] hover:text-primary">EN</button>
          </div>
        </div>
      </div>

      {/* Contact bar */}
      <div className="contact-bar bg-white py-3" role="complementary" aria-label="Контактная информация">
        <div className="container-custom flex items-center gap-6 flex-wrap">
          <a href="tel:+79175576990" className="flex items-center gap-2 text-text-primary font-medium hover:text-primary transition-colors min-h-[44px] py-2">
            <Phone size={18} aria-hidden="true" />
            <span>+7 (917) 557-69-90</span>
          </a>
          <a href="mailto:info@filantrop.ru" className="flex items-center gap-2 text-text-primary font-medium hover:text-primary transition-colors min-h-[44px] py-2">
            <Mail size={18} aria-hidden="true" />
            <span>info@filantrop.ru</span>
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="main-nav py-4" role="navigation" aria-label="Главное меню">
        <div className="container-custom flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center" aria-label="БФ Филантроп — на главную">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Ф</span>
              </div>
              <div>
                <div className="font-bold text-lg text-primary">ФИЛАНТРОП</div>
                <div className="text-xs text-text-muted">Благотворительный фонд</div>
              </div>
            </div>
          </Link>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-1 list-none">
            {navItems.map((item) => (
              <li 
                key={item.label} 
                className={`relative ${item.dropdown ? 'has-dropdown' : ''}`}
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                <Link 
                  href={item.href} 
                  className="flex items-center gap-1 px-4 py-3 text-text-primary font-medium rounded-md transition-all min-h-[44px] hover:bg-bg-primary hover:text-primary"
                  aria-haspopup={item.dropdown ? 'true' : undefined}
                  aria-expanded={activeDropdown === item.label ? 'true' : 'false'}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={14} aria-hidden="true" />}
                </Link>
                
                {item.dropdown && activeDropdown === item.label && (
                  <ul className="absolute top-full left-0 min-w-[280px] bg-white border border-border rounded-lg shadow-xl list-none p-2 z-50" role="menu">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.label} role="none">
                        <Link href={subItem.href} role="menuitem" className="block px-4 py-3 text-text-primary rounded-md transition-all min-h-[44px] hover:bg-bg-primary hover:text-primary">
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <Link href="/donate" className="hidden lg:inline-flex px-6 py-3 bg-accent text-text-primary font-semibold rounded-full transition-all hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-md min-h-[44px]">
            Пожертвовать
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex items-center justify-center p-2 bg-transparent border-none cursor-pointer text-text-primary min-w-[44px] min-h-[44px]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto animate-slide-in" role="dialog" aria-label="Мобильное меню">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-xl text-primary">МЕНЮ</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-transparent border-none cursor-pointer text-text-primary min-w-[44px] min-h-[44px]"
                  aria-label="Закрыть меню"
                >
                  <X size={24} />
                </button>
              </div>
              <ul className="list-none">
                {navItems.map((item) => (
                  <li key={item.label} className="border-b border-border">
                    <Link 
                      href={item.href} 
                      className="block py-4 text-lg font-medium text-text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <ul className="pl-4 pb-4 list-none">
                        {item.dropdown.map((subItem) => (
                          <li key={subItem.label}>
                            <Link 
                              href={subItem.href} 
                              className="block py-2 text-text-secondary"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="pt-6">
                  <Link href="/donate" className="inline-flex px-6 py-3 bg-accent text-text-primary font-semibold rounded-full" onClick={() => setIsMobileMenuOpen(false)}>
                    Пожертвовать
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
