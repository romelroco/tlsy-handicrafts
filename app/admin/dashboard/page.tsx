'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-r from-primary to-craft text-cream py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold">TLSY Admin Dashboard</h1>
            <p className="text-cream/80 text-sm">Manage your handicrafts shop</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-cream text-primary px-6 py-2 rounded-full font-semibold hover:bg-warm transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <Link href="/admin/profile" className="group">
            <div className="bg-gradient-to-br from-warm to-secondary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-accent/20 group-hover:border-accent">
              <div className="text-5xl mb-4">👤</div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-2">Profile</h2>
              <p className="text-craft">Update shop info, bio, and profile picture</p>
              <div className="mt-4 text-accent font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Manage →
              </div>
            </div>
          </Link>

          <Link href="/admin/products" className="group">
            <div className="bg-gradient-to-br from-warm to-secondary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-accent/20 group-hover:border-accent">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-2">Products</h2>
              <p className="text-craft">Add, edit, delete products and images</p>
              <div className="mt-4 text-accent font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Manage →
              </div>
            </div>
          </Link>

          <Link href="/admin/messages" className="group">
            <div className="bg-gradient-to-br from-warm to-secondary p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-accent/20 group-hover:border-accent">
              <div className="text-5xl mb-4">💬</div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-2">Messages</h2>
              <p className="text-craft">View and manage contact inquiries</p>
              <div className="mt-4 text-accent font-semibold group-hover:translate-x-2 transition-transform inline-block">
                View →
              </div>
            </div>
          </Link>

          <Link href="/en" target="_blank" className="group">
            <div className="bg-gradient-to-br from-accent to-craft p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-cream">
              <div className="text-5xl mb-4">🌐</div>
              <h2 className="text-2xl font-serif font-bold mb-2">View Site</h2>
              <p className="text-cream/90">Open your live website</p>
              <div className="mt-4 font-semibold group-hover:translate-x-2 transition-transform inline-block">
                Open →
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
