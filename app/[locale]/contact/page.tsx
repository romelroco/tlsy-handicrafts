'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function ContactPage() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const { logEvent } = useAnalytics(locale);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language_preference: locale }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        logEvent('contact_form_submit');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-center mb-12">
          {t('title')}
        </h1>

        <div className="crafty-border mb-8">
          <h2 className="text-2xl font-serif font-bold mb-6">{t('form_title')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">{t('name')}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">{t('email')}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">{t('phone')}</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">{t('subject')}</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary rounded"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">{t('message')}</label>
              <textarea
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary rounded"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full"
            >
              {status === 'loading' ? 'Sending...' : t('submit')}
            </button>

            {status === 'success' && (
              <p className="text-green-600 text-center">{t('success')}</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-center">{t('error')}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
