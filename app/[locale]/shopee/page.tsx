'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { useAnalytics } from '@/hooks/useAnalytics';
import { supabase } from '@/lib/supabase';

export default function ShopeePage() {
  const locale = useLocale();
  useAnalytics(locale);
  const [shopeeUrl, setShopeeUrl] = useState('https://shopee.ph/tlsyhandicrafts');

  useEffect(() => {
    const fetchShopeeLink = async () => {
      const { data } = await supabase
        .from('social_links')
        .select('url')
        .eq('platform', 'Shopee')
        .single();
      if (data?.url) setShopeeUrl(data.url);
    };
    fetchShopeeLink();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold mb-8">
          Shopee Integration
        </h1>
        <div className="crafty-border">
          <p className="text-lg mb-6">
            {locale === 'tl' 
              ? 'Ang Shopee integration ay paparating na! Samantala, bisitahin ang aming Shopee shop:'
              : 'Shopee integration coming soon! Meanwhile, visit our Shopee shop:'}
          </p>
          <a
            href={shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            {locale === 'tl' ? 'Bisitahin ang Shopee Shop' : 'Visit Shopee Shop'}
          </a>
        </div>
      </div>
    </div>
  );
}
