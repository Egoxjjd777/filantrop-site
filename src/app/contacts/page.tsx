'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Vk, Send, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import { contactData } from '@/data/mockData';

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    consent: false,
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    setFormData({ name: '', email: '', phone: '', topic: '', message: '', consent: false });
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }));
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
              <li className="text-white" aria-current="page">Контакты</li>
            </ol>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">📍 Контакты</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>
      </section>

      {/* Contact info and map */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Contact info */}
            <div className="bg-bg-tertiary rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Контактная информация</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary mb-1">Адрес</div>
                    <div className="text-text-secondary mb-2">{contactData.address}</div>
                    <a href="https://yandex.ru/maps" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark font-medium text-sm">
                      Показать на карте →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock size={24} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary mb-1">График работы</div>
                    <div className="text-text-secondary">{contactData.hours.weekday}</div>
                    <div className="text-text-muted">{contactData.hours.weekend}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary mb-1">Телефоны</div>
                    <a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="block text-primary hover:text-primary-dark font-medium">
                      {contactData.phone} <span className="text-text-muted font-normal">(основной)</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary mb-1">Email</div>
                    <a href={`mailto:${contactData.emails.general}`} className="block text-primary hover:text-primary-dark">
                      {contactData.emails.general} <span className="text-text-muted font-normal text-sm">(общие вопросы)</span>
                    </a>
                    <a href={`mailto:${contactData.emails.prize}`} className="block text-primary hover:text-primary-dark">
                      {contactData.emails.prize} <span className="text-text-muted font-normal text-sm">(премия)</span>
                    </a>
                    <a href={`mailto:${contactData.emails.press}`} className="block text-primary hover:text-primary-dark">
                      {contactData.emails.press} <span className="text-text-muted font-normal text-sm">(пресс-служба)</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🌐</span>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary mb-1">Социальные сети</div>
                    <div className="flex items-center gap-3 mt-2">
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
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-text-primary mb-2">
                  <span className="w-2 h-2 bg-success rounded-full" aria-hidden="true"></span>
                  <span>♿ Доступная среда: пандус, лифт</span>
                </div>
                <div className="text-sm text-text-muted">
                  🚇 Метро: Китай-город (5 мин пешком)
                </div>
                <div className="text-sm text-text-muted">
                  🅿️ Парковка: есть места для маломобильных
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-bg-tertiary rounded-xl border border-border overflow-hidden min-h-[500px]">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin size={64} className="text-primary mx-auto mb-4" aria-hidden="true" />
                  <div className="text-text-secondary text-lg mb-4">Интерактивная карта</div>
                  <div className="text-text-muted mb-6">Москва, ул. Маросейка, д. 4</div>
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

          {/* Contact form */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-2">📝 Напишите нам</h2>
              <p className="text-text-secondary">Заполните форму, и мы ответим вам в ближайшее время</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-border">
              {formStatus === 'success' && (
                <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg flex items-center gap-3 text-success">
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-6 p-4 bg-error/10 border border-error rounded-lg flex items-center gap-3 text-error">
                  <AlertCircle size={20} aria-hidden="true" />
                  <span>Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    ФИО <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px]"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px]"
                    placeholder="example@email.ru"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px]"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-text-primary mb-2">
                    Тема обращения <span className="text-error" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none min-h-[44px] bg-white"
                  >
                    <option value="">Выберите тему</option>
                    <option value="prize">Вопрос по премии</option>
                    <option value="services">Услуги фонда</option>
                    <option value="partners">Партнёрство</option>
                    <option value="volunteer">Волонтёрство</option>
                    <option value="museum">Музей «Равновесие»</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                  Сообщение <span className="text-error" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:border-primary focus:outline-none resize-none"
                  placeholder="Ваше сообщение..."
                />
              </div>

              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">
                    Я согласен на обработку <a href="/privacy" className="text-primary hover:underline">персональных данных</a> <span className="text-error" aria-hidden="true">*</span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors min-h-[44px]"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-bg-tertiary">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">❓ Частые вопросы</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Как подать заявку на премию?',
                a: 'Для подачи заявки необходимо заполнить анкету на сайте в разделе «Подать заявку» или скачать бланк в разделе «Документы» и отправить его на email prize@filantrop.ru',
              },
              {
                q: 'Как стать партнёром фонда?',
                a: 'Вы можете стать партнёром фонда, заполнив форму в разделе «Партнёрам» или связавшись с нами по телефону +7 (917) 557-69-90',
              },
              {
                q: 'Какие услуги доступны людям с инвалидностью?',
                a: 'Фонд предоставляет услуги по трудоустройству, полиграфии, дизайну, доступному транспорту и организации мероприятий. Подробнее в разделе «Услуги»',
              },
              {
                q: 'Как записаться на экскурсию в музей?',
                a: 'Записаться на экскурсию в музей «Равновесие» можно по телефону +7 (917) 557-69-90 или через форму на странице музея',
              },
            ].map((item, index) => (
              <details 
                key={index} 
                className="bg-white rounded-xl border border-border group"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-text-primary pr-4">{item.q}</span>
                  <span className="text-primary text-2xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-text-secondary">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
