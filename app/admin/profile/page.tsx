'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, CrafterProfile } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<CrafterProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    const fetchProfile = async () => {
      const { data } = await supabase.from('crafter_profile').select('*').single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('crafter_profile')
        .update(profile)
        .eq('id', profile.id);

      if (error) throw error;

      setMessage('✅ Profile updated successfully!');
    } catch (error) {
      setMessage('❌ Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-r from-primary to-craft text-cream py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">Edit Profile</h1>
          <Link href="/admin/dashboard" className="bg-cream text-primary px-4 py-2 rounded-full font-semibold hover:bg-warm transition-colors">
            ← Back
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="bg-secondary p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-serif font-bold text-primary mb-4">Profile Picture</h2>
            <div className="space-y-4">
              {profile.profile_image_url && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                  <img src={profile.profile_image_url} alt="Profile" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  setLoading(true);
                  const { uploadImage } = await import('@/lib/upload');
                  const url = await uploadImage(file);
                  if (url) {
                    setProfile({...profile, profile_image_url: url});
                    setMessage('✅ Image uploaded! Click Save to apply.');
                  } else {
                    setMessage('❌ Failed to upload image');
                  }
                  setLoading(false);
                }}
                className="block w-full text-sm text-craft file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-accent file:text-cream hover:file:bg-craft cursor-pointer"
              />
              <p className="text-sm text-craft">Or paste image URL:</p>
              <input
                type="text"
                value={profile.profile_image_url}
                onChange={(e) => setProfile({...profile, profile_image_url: e.target.value})}
                className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                placeholder="Image URL"
              />
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-serif font-bold text-primary mb-4">Basic Info</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Shop Name (English)</label>
                <input
                  type="text"
                  value={profile.crafter_name}
                  onChange={(e) => setProfile({...profile, crafter_name: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Shop Name (Tagalog)</label>
                <input
                  type="text"
                  value={profile.crafter_name_tl}
                  onChange={(e) => setProfile({...profile, crafter_name_tl: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold mb-2">Years of Experience</label>
              <input
                type="number"
                value={profile.years_experience}
                onChange={(e) => setProfile({...profile, years_experience: parseInt(e.target.value)})}
                className="w-full px-4 py-2 border-2 border-warm rounded-lg"
              />
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-serif font-bold text-primary mb-4">Bio</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Bio (English)</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Bio (Tagalog)</label>
                <textarea
                  value={profile.bio_tl}
                  onChange={(e) => setProfile({...profile, bio_tl: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-serif font-bold text-primary mb-4">Story</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Background Story (English)</label>
                <textarea
                  value={profile.background_story}
                  onChange={(e) => setProfile({...profile, background_story: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Background Story (Tagalog)</label>
                <textarea
                  value={profile.background_story_tl}
                  onChange={(e) => setProfile({...profile, background_story_tl: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-warm rounded-lg"
                />
              </div>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-accent to-craft text-cream py-4 rounded-lg font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Saving...' : '💾 Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
