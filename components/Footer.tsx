'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { supabase, SocialLink } from '@/lib/supabase';

export default function Footer() {
  const t = useTranslations('footer');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true);
      if (data) setSocialLinks(data);
    };
    fetchSocialLinks();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-primary to-craft text-cream py-12 mt-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold">TLSY Handicrafts</div>
              <div className="text-sm text-cream/80 font-hand italic">{t('tagline')}</div>
            </div>
          </div>
          
          {socialLinks.length > 0 && (
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors transform hover:scale-110 duration-300 text-lg"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
          
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          
          <p className="text-sm text-cream/70">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
