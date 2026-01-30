'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase, Product } from '@/lib/supabase';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('product');
  const locale = useLocale();
  useAnalytics(locale);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (data) {
        setProduct(data);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (!product) return <div className="container mx-auto px-4 py-16">Loading...</div>;

  const name = locale === 'tl' ? product.product_name_tl : product.product_name;
  const description = locale === 'tl' ? product.description_tl : product.description;
  const turnaround = locale === 'tl' ? product.turnaround_time_tl : product.turnaround_time;
  const priceNotes = locale === 'tl' ? product.price_notes_tl : product.price_notes;

  return (
    <div className="container mx-auto px-4 py-16">
      <button
        onClick={() => router.back()}
        className="mb-8 text-accent hover:text-primary"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="relative h-[500px] mb-4 rounded-2xl overflow-hidden shadow-2xl border-4 border-warm">
            <Image
              src={product.images[selectedImage] || '/images/placeholder.jpg'}
              alt={name}
              fill
              className="object-cover hover:scale-110 transition-transform duration-500"
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(selectedImage === 0 ? product.images.length - 1 : selectedImage - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-cream/90 hover:bg-accent text-primary hover:text-cream w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-sm"
                >
                  ←
                </button>
                <button
                  onClick={() => setSelectedImage(selectedImage === product.images.length - 1 ? 0 : selectedImage + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-cream/90 hover:bg-accent text-primary hover:text-cream w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-sm"
                >
                  →
                </button>
              </>
            )}
            
            {/* Image Counter */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-primary/80 text-cream px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {selectedImage + 1} / {product.images.length}
              </div>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImage === idx 
                      ? 'ring-4 ring-accent shadow-lg scale-105' 
                      : 'ring-2 ring-warm hover:ring-craft opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image 
                    src={img} 
                    alt={`${name} ${idx + 1}`} 
                    fill 
                    className="object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <span className="text-sm text-accent uppercase">{product.category}</span>
          {product.featured && (
            <span className="ml-2 bg-highlight text-primary px-2 py-1 rounded text-xs font-bold">
              {t('featured')}
            </span>
          )}
          
          <h1 className="text-4xl font-serif font-bold mt-2 mb-4">{name}</h1>
          
          <div className="text-3xl font-bold text-primary mb-6">
            ₱{product.price.toFixed(2)}
            {priceNotes && <span className="text-sm text-gray-600 ml-2">{priceNotes}</span>}
          </div>

          <div className="crafty-border mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">{t('turnaround')}:</span>
                <p>{turnaround}</p>
              </div>
              <div>
                <span className="font-semibold">{t('customization')}:</span>
                <p>{product.customization_available ? t('yes') : t('no')}</p>
              </div>
              <div>
                <span className="font-semibold">{t('availability')}:</span>
                <p className={product.availability ? 'text-green-600' : 'text-red-600'}>
                  {product.availability ? t('available') : t('unavailable')}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-serif font-bold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
          </div>

          {Object.keys(product.specifications).length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-serif font-bold mb-3">{t('specifications')}</h2>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-semibold">{key}:</span> {String(value)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={`/${locale}/contact?product=${product.id}`}
            className="btn-primary w-full block text-center"
          >
            {t('inquire')}
          </Link>
        </div>
      </div>
    </div>
  );
}
