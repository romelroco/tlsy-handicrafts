'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, Product } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;

    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  const toggleFeatured = async (product: Product) => {
    await supabase.from('products').update({ featured: !product.featured }).eq('id', product.id);
    fetchProducts();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-r from-primary to-craft text-cream py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Manage Products</h1>
          <div className="flex gap-4">
            <Link href="/admin/products/new" className="bg-accent text-cream px-4 py-2 rounded-full font-semibold hover:bg-craft transition-colors">
              + Add Product
            </Link>
            <Link href="/admin/dashboard" className="bg-cream text-primary px-4 py-2 rounded-full font-semibold hover:bg-warm transition-colors">
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-secondary p-6 rounded-2xl shadow-lg flex gap-6">
              <div className="w-32 h-32 bg-warm rounded-lg overflow-hidden flex-shrink-0">
                {product.images[0] && (
                  <img src={product.images[0]} alt={product.product_name} className="w-full h-full object-cover" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-primary">{product.product_name}</h3>
                    <p className="text-sm text-craft">{product.category}</p>
                    <p className="text-lg font-bold text-accent mt-2">₱{product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFeatured(product)}
                      className={`px-4 py-2 rounded-lg font-semibold ${product.featured ? 'bg-highlight text-primary' : 'bg-warm text-craft'}`}
                    >
                      {product.featured ? '⭐ Featured' : 'Set Featured'}
                    </button>
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="bg-accent text-cream px-4 py-2 rounded-lg font-semibold hover:bg-craft transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
