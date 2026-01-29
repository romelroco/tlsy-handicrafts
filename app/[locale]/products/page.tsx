'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function ProductsPage() {
  const t = useTranslations('product');
  const tCommon = useTranslations('common');
  const tCat = useTranslations('categories');
  const locale = useLocale();
  const { logEvent } = useAnalytics(locale);
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('availability', true)
        .order('created_at', { ascending: false });
      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category.toLowerCase().includes(selectedCategory));
      logEvent('category_filter', undefined, { category: selectedCategory });
    }

    if (searchQuery) {
      filtered = filtered.filter((p) => {
        const name = locale === 'tl' ? p.product_name_tl : p.product_name;
        const desc = locale === 'tl' ? p.description_tl : p.description;
        return (
          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products, locale, logEvent]);

  const categories = [
    { key: 'all', name: tCommon('all') },
    { key: 'printing', name: tCat('printing') },
    { key: 'souvenirs', name: tCat('souvenirs') },
    { key: 'invitations', name: tCat('invitations') },
    { key: 'digital', name: tCat('digital') },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-serif font-bold text-center mb-12">
        {tCommon('filter')}
      </h1>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder={tCommon('search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border-2 border-primary rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border-2 border-primary rounded"
        >
          {categories.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-16">No products found.</p>
      )}
    </div>
  );
}
