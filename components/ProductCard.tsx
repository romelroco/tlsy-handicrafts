'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Product } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations('product');
  
  const name = locale === 'tl' ? product.product_name_tl : product.product_name;
  const shortDesc = locale === 'tl' ? product.short_description_tl : product.short_description;

  return (
    <div className="card group relative">
      {product.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gradient-to-r from-highlight to-accent text-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            ⭐ {t('featured')}
          </span>
        </div>
      )}
      
      <div className="relative h-64 overflow-hidden bg-warm/30">
        <Image
          src={product.images[0] || '/images/placeholder.jpg'}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-cream to-secondary">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-craft uppercase tracking-wider font-semibold px-2 py-1 bg-warm rounded-full">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-xl font-serif font-bold mt-2 mb-2 text-primary group-hover:text-craft transition-colors line-clamp-1">
          {name}
        </h3>
        
        <p className="text-sm text-text/70 mb-4 line-clamp-2 leading-relaxed">{shortDesc}</p>
        
        <div className="flex justify-between items-center pt-4 border-t border-accent/20">
          <div>
            <span className="text-xs text-craft block mb-1">{t('price')}</span>
            <span className="text-2xl font-bold text-primary">₱{product.price.toFixed(2)}</span>
          </div>
          <Link
            href={`/${locale}/products/${product.id}`}
            className="bg-gradient-to-r from-accent to-craft text-cream px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            {t('view_details')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
