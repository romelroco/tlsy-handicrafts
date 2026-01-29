'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/upload';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    product_name: '',
    product_name_tl: '',
    description: '',
    description_tl: '',
    short_description: '',
    short_description_tl: '',
    category: 'Printing Services',
    price: 0,
    turnaround_time: '',
    turnaround_time_tl: '',
    customization_available: false,
    availability: true,
    featured: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) router.push('/admin');
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      if (url) urls.push(url);
    }

    setImages([...images, ...urls]);
    setLoading(false);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('products').insert({
        ...formData,
        images,
        currency: 'PHP',
        specifications: {},
      });

      if (error) throw error;

      alert('✅ Product added successfully!');
      router.push('/admin/products');
    } catch (error) {
      alert('❌ Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-r from-primary to-craft text-cream py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Add New Product</h1>
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
              {images.map((img, idx) => (
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
                  value={formData.product_name}
                  onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name (Tagalog)</label>
                <input
                  type="text"
                  required
                  value={formData.product_name_tl}
                  onChange={(e) => setFormData({...formData, product_name_tl: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
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
                  value={formData.turnaround_time}
                  onChange={(e) => setFormData({...formData, turnaround_time: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                  placeholder="e.g., 3-5 business days"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Turnaround Time (TL)</label>
                <input
                  type="text"
                  required
                  value={formData.turnaround_time_tl}
                  onChange={(e) => setFormData({...formData, turnaround_time_tl: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                  placeholder="e.g., 3-5 araw ng negosyo"
                />
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.customization_available}
                  onChange={(e) => setFormData({...formData, customization_available: e.target.checked})}
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold">Customization Available</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.checked})}
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold">Available</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
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
                  value={formData.short_description}
                  onChange={(e) => setFormData({...formData, short_description: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                  placeholder="100-150 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Short Description (TL)</label>
                <textarea
                  required
                  value={formData.short_description_tl}
                  onChange={(e) => setFormData({...formData, short_description_tl: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Description (EN)</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Full Description (TL)</label>
                <textarea
                  required
                  value={formData.description_tl}
                  onChange={(e) => setFormData({...formData, description_tl: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || images.length === 0}
            className="w-full bg-gradient-to-r from-accent to-craft text-cream py-4 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : '💾 Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
