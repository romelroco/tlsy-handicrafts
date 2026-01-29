'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function HomePage() {
  const t = useTranslations('home');
  const tCat = useTranslations('categories');
  const locale = useLocale();
  const { logEvent } = useAnalytics(locale);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .eq('availability', true)
        .limit(4);
      if (data) setFeaturedProducts(data);
    };
    fetchFeatured();
  }, []);

  const categories = [
    { key: 'printing', name: tCat('printing'), icon: '🖨️', color: 'from-terracotta to-accent' },
    { key: 'souvenirs', name: tCat('souvenirs'), icon: '🎁', color: 'from-sage to-craft' },
    { key: 'invitations', name: tCat('invitations'), icon: '💌', color: 'from-accent to-warm' },
    { key: 'digital', name: tCat('digital'), icon: '💻', color: 'from-craft to-terracotta' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section py-24 relative">
        <div className="decorative-corner top-left"></div>
        <div className="decorative-corner top-right"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-terracotta/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-4">
            <span className="text-accent text-sm uppercase tracking-widest font-semibold">✦ Handcrafted with Love ✦</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4 text-primary">
            {t('hero_title')}
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-accent"></div>
            <p className="text-2xl text-craft font-hand italic">{t('hero_subtitle')}</p>
            <div className="h-px w-16 bg-accent"></div>
          </div>
          
          <p className="text-lg text-text/80 max-w-2xl mx-auto mb-10">
            {locale === 'tl' 
              ? 'Mga personalized na produkto para sa bawat okasyon. Mula sa printing services hanggang sa mga digital products.'
              : 'Personalized products for every occasion. From printing services to digital products.'}
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={`/${locale}/products`} className="btn-primary">
              ✨ {t('hero_cta_browse')}
            </Link>
            <Link href={`/${locale}/contact`} className="btn-secondary">
              💬 {t('hero_cta_contact')}
            </Link>
          </div>
        </div>
        
        <div className="decorative-corner bottom-left"></div>
        <div className="decorative-corner bottom-right"></div>
      </section>

      {/* Categories */}
      <section className="py-20 container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 inline-block relative">
            {t('categories_title')}
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          </h2>
          <p className="text-craft mt-6">
            {locale === 'tl' ? 'Piliin ang kategorya na gusto mo' : 'Choose the category you need'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/${locale}/products?category=${cat.key}`}
              className={`group relative overflow-hidden rounded-2xl p-8 text-center bg-gradient-to-br ${cat.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
              onClick={() => logEvent('category_click', undefined, { category: cat.key })}
            >
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-primary">{cat.name}</h3>
                <div className="mt-4 w-12 h-1 bg-primary/30 mx-auto group-hover:w-20 transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-warm/30 to-cream/50 relative">
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block">
                <span className="text-accent text-sm uppercase tracking-widest font-semibold mb-2 block">✦ Bestsellers ✦</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold relative inline-block">
                  {t('featured_title')}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary to-craft text-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            {locale === 'tl' ? 'Handa na ba kayong mag-order?' : 'Ready to Create Something Special?'}
          </h2>
          <p className="text-xl mb-8 text-cream/90 max-w-2xl mx-auto">
            {locale === 'tl' 
              ? 'Makipag-ugnayan sa amin ngayon at gawing totoo ang iyong mga ideya!'
              : 'Get in touch with us today and bring your ideas to life!'}
          </p>
          <Link href={`/${locale}/contact`} className="inline-block bg-cream text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-warm hover:scale-105 transition-all duration-300 shadow-xl">
            💌 {locale === 'tl' ? 'Makipag-ugnayan' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </div>
  );
}
