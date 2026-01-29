'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase, Product } from '@/lib/supabase';
import { uploadImage } from '@/lib/upload';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    const fetchProduct = async () => {
      const { data } = await supabase.from('products').select('*').eq('id', params.id).single();
      if (data) setProduct(data);
    };
    fetchProduct();
  }, [router, params.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      if (url) urls.push(url);
    }

    setProduct({...product, images: [...product.images, ...urls]});
    setLoading(false);
  };

  const removeImage = (index: number) => {
    if (!product) return;
    setProduct({...product, images: product.images.filter((_, i) => i !== index)});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setLoading(true);

    try {
      const { error } = await supabase.from('products').update(product).eq('id', product.id);

      if (error) throw error;

      alert('✅ Product updated successfully!');
      router.push('/admin/products');
    } catch (error) {
      alert('❌ Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-r from-primary to-craft text-cream py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Edit Product</h1>
          <Link href="/admin/products" className="bg-cream text-primary px-4 py-2 rounded-full font-semibold">
            ← Back
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="bg-secondary p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-serif font-bold mb-4">Product Images</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-accent file:text-cream hover:file:bg-craft cursor-pointer"
            />
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img src={img} alt="Product" className="w-full h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-serif font-bold mb-4">Basic Info</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name (English)</label>
                <input
                  type="text"
                  required
                  value={product.product_name}
                  onChange={(e) => setProduct({...product, product_name: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name (Tagalog)</label>
                <input
                  type="text"
                  required
                  value={product.product_name_tl}
                  onChange={(e) => setProduct({...product, product_name_tl: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={product.category}
                  onChange={(e) => setProduct({...product, category: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                >
                  <option>Printing Services</option>
                  <option>Souvenirs</option>
                  <option>Invitations</option>
                  <option>Digital Products</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Price (PHP)</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={product.price}
                  onChange={(e) => setProduct({...product, price: parseFloat(e.target.value)})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Turnaround Time (EN)</label>
                <input
                  type="text"
                  required
                  value={product.turnaround_time}
                  onChange={(e) => setProduct({...product, turnaround_time: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Turnaround Time (TL)</label>
                <input
                  type="text"
                  required
                  value={product.turnaround_time_tl}
                  onChange={(e) => setProduct({...product, turnaround_time_tl: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={product.customization_available}
                  onChange={(e) => setProduct({...product, customization_available: e.target.checked})}
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold">Customization Available</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={product.availability}
                  onChange={(e) => setProduct({...product, availability: e.target.checked})}
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold">Available</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={product.featured}
                  onChange={(e) => setProduct({...product, featured: e.target.checked})}
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold">Featured</span>
              </label>
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-serif font-bold mb-4">Descriptions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Short Description (EN)</label>
                <textarea
                  required
                  value={product.short_description}
                  onChange={(e) => setProduct({...product, short_description: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Short Description (TL)</label>
                <textarea
                  required
                  value={product.short_description_tl}
                  onChange={(e) => setProduct({...product, short_description_tl: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Description (EN)</label>
                <textarea
                  required
                  value={product.description}
                  onChange={(e) => setProduct({...product, description: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Description (TL)</label>
                <textarea
                  required
                  value={product.description_tl}
                  onChange={(e) => setProduct({...product, description_tl: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-accent to-craft text-cream py-4 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : '💾 Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
