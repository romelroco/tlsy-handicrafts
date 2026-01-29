'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { supabase, CrafterProfile } from '@/lib/supabase';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function AboutPage() {
  const t = useTranslations('about');
  const locale = useLocale();
  useAnalytics(locale);
  const [profile, setProfile] = useState<CrafterProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('crafter_profile')
        .select('*')
        .single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div className="container mx-auto px-4 py-16">Loading...</div>;

  const bio = locale === 'tl' ? profile.bio_tl : profile.bio;
  const story = locale === 'tl' ? profile.background_story_tl : profile.background_story;
  const process = locale === 'tl' ? profile.crafting_process_tl : profile.crafting_process;

  return (
    <div className="bg-gradient-to-b from-cream to-warm/30">
      {/* Hero Section with Floating Image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Creative Layout: Image integrated with text */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-accent rounded-full opacity-30"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-4 border-craft rounded-full opacity-20"></div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Floating Image with decorative frame */}
                <div className="relative order-2 md:order-1">
                  <div className="relative z-10">
                    {/* Main image with creative border */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-br from-accent via-craft to-terracotta rounded-3xl opacity-20 blur-xl"></div>
                      <div className="relative bg-gradient-to-br from-warm to-cream p-2 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                        <div className="relative h-96 rounded-2xl overflow-hidden">
                          <Image
                            src={profile.profile_image_url || '/images/placeholder.jpg'}
                            alt="TLSY Handicrafts"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating badge */}
                    <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-accent to-craft text-cream px-6 py-4 rounded-2xl shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{profile.years_experience}</div>
                        <div className="text-sm font-semibold">{t('years')}</div>
                        <div className="text-xs opacity-90">{t('experience')}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative craft elements */}
                  <div className="absolute top-0 left-0 text-6xl opacity-20 -z-10">✂️</div>
                  <div className="absolute bottom-0 right-0 text-6xl opacity-20 -z-10">🎨</div>
                </div>
                
                {/* Right: Text content */}
                <div className="order-1 md:order-2 space-y-6">
                  <div>
                    <span className="text-accent text-sm uppercase tracking-widest font-semibold">✦ {t('title')} ✦</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary leading-tight">
                    {locale === 'tl' ? profile.crafter_name_tl : profile.crafter_name}
                  </h1>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-16 bg-gradient-to-r from-accent to-craft rounded-full"></div>
                    <p className="text-xl text-craft font-hand italic">
                      {locale === 'tl' ? 'Ang Maliit na Tindahan Taon 2020' : 'The Little Shop Year 2020'}
                    </p>
                  </div>
                  
                  <p className="text-lg text-text/80 leading-relaxed">
                    {bio}
                  </p>
                  
                  {/* Quick stats */}
                  <div className="flex gap-4 pt-4">
                    <div className="bg-gradient-to-br from-warm to-cream px-6 py-3 rounded-xl border-2 border-accent/30">
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-xs text-craft">{locale === 'tl' ? 'Mga Proyekto' : 'Projects'}</div>
                    </div>
                    <div className="bg-gradient-to-br from-warm to-cream px-6 py-3 rounded-xl border-2 border-accent/30">
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-xs text-craft">{locale === 'tl' ? 'Handmade' : 'Handmade'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Creative Layout */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Story with decorative elements */}
            <div className="relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="text-6xl">✨</div>
              </div>
              
              <div className="crafty-border">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-serif font-bold text-primary mb-4 inline-block relative">
                    {t('story')}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                  </h2>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-text/90 leading-relaxed whitespace-pre-line text-center">
                    {story}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section with Icons */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-primary mb-4 inline-block relative">
                {t('why')}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-craft to-transparent"></div>
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-warm to-cream rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">💝</div>
                <h3 className="font-serif font-bold text-xl text-primary mb-2">
                  {locale === 'tl' ? 'May Puso' : 'With Heart'}
                </h3>
                <p className="text-sm text-text/70">
                  {locale === 'tl' ? 'Bawat produkto ay ginawa nang may pagmamahal' : 'Every product made with love'}
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-warm to-cream rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">🎨</div>
                <h3 className="font-serif font-bold text-xl text-primary mb-2">
                  {locale === 'tl' ? 'Personalized' : 'Personalized'}
                </h3>
                <p className="text-sm text-text/70">
                  {locale === 'tl' ? 'Naaayon sa iyong pangangailangan' : 'Tailored to your needs'}
                </p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-warm to-cream rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">⭐</div>
                <h3 className="font-serif font-bold text-xl text-primary mb-2">
                  {locale === 'tl' ? 'Kalidad' : 'Quality'}
                </h3>
                <p className="text-sm text-text/70">
                  {locale === 'tl' ? 'Pinakamataas na kalidad lamang' : 'Only the highest quality'}
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cream to-warm p-8 rounded-2xl shadow-lg">
              <p className="text-text/90 leading-relaxed whitespace-pre-line">
                {process}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-craft text-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-6xl mb-6">💌</div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {locale === 'tl' ? 'Makipag-ugnayan Tayo!' : "Let's Create Together!"}
          </h2>
          <p className="text-xl mb-8 text-cream/90 max-w-2xl mx-auto">
            {locale === 'tl' 
              ? 'Handa na ba kayong gawing totoo ang inyong mga ideya?'
              : 'Ready to bring your ideas to life?'}
          </p>
          <Link href={`/${locale}/contact`} className="inline-block bg-cream text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-warm hover:scale-105 transition-all duration-300 shadow-xl">
            {t('cta')} ✨
          </Link>
        </div>
      </section>
    </div>
  );
}
