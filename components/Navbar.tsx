'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();

  return (
    <nav className="bg-cream/95 backdrop-blur-sm border-b-2 border-accent/20 sticky top-0 z-[100] shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href={`/${locale}`} className="group flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-craft rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-primary group-hover:text-craft transition-colors">
                TLSY Handicrafts
              </div>
              <div className="text-xs text-accent font-hand italic">The Little Shop Year 2020</div>
            </div>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href={`/${locale}`} className="text-text hover:text-craft transition-colors font-medium relative group">
              {t('home')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-craft group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href={`/${locale}/about`} className="text-text hover:text-craft transition-colors font-medium relative group">
              {t('about')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-craft group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href={`/${locale}/products`} className="text-text hover:text-craft transition-colors font-medium relative group">
              {t('products')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-craft group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href={`/${locale}/contact`} className="text-text hover:text-craft transition-colors font-medium relative group">
              {t('contact')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-craft group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href={`/${locale}/shopee`} className="text-text hover:text-craft transition-colors font-medium relative group">
              {t('shopee')}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-craft group-hover:w-full transition-all duration-300"></span>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
