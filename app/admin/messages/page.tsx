'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, ContactSubmission } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
      return;
    }

    fetchMessages();
  }, [router, filter]);

  const fetchMessages = async () => {
    let query = supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });

    if (filter === 'unread') query = query.eq('is_read', false);
    if (filter === 'read') query = query.eq('is_read', true);

    const { data } = await query;
    if (data) setMessages(data);
    setLoading(false);
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    await supabase.from('contact_submissions').update({ is_read: !currentStatus }).eq('id', id);
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contact_submissions').delete().eq('id', id);
    fetchMessages();
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-gradient-to-r from-primary to-craft text-cream py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-bold">Contact Messages</h1>
            <p className="text-sm text-cream/80">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
          </div>
          <Link href="/admin/dashboard" className="bg-cream text-primary px-4 py-2 rounded-full font-semibold">
            ← Back
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filter === 'all' ? 'bg-accent text-cream' : 'bg-secondary text-craft border-2 border-warm'
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filter === 'unread' ? 'bg-accent text-cream' : 'bg-secondary text-craft border-2 border-warm'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filter === 'read' ? 'bg-accent text-cream' : 'bg-secondary text-craft border-2 border-warm'
            }`}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="bg-secondary p-12 rounded-2xl text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-craft">No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`bg-secondary p-6 rounded-2xl shadow-lg transition-all ${
                  !msg.is_read ? 'border-2 border-accent' : 'border-2 border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {!msg.is_read && (
                        <span className="bg-accent text-cream px-3 py-1 rounded-full text-xs font-bold">
                          NEW
                        </span>
                      )}
                      <h3 className="text-xl font-serif font-bold text-primary">{msg.name}</h3>
                      <span className="text-sm text-craft">
                        {msg.language_preference === 'tl' ? '🇵🇭 TL' : '🇺🇸 EN'}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-craft">
                      <span>📧 {msg.email}</span>
                      {msg.phone && <span>📱 {msg.phone}</span>}
                      <span>🕐 {new Date(msg.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleRead(msg.id, msg.is_read)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        msg.is_read
                          ? 'bg-warm text-craft hover:bg-accent hover:text-cream'
                          : 'bg-accent text-cream hover:bg-craft'
                      }`}
                    >
                      {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="bg-warm/30 p-4 rounded-lg">
                  <p className="font-semibold text-primary mb-2">Subject: {msg.subject}</p>
                  <p className="text-text whitespace-pre-line">{msg.message}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                    className="bg-gradient-to-r from-accent to-craft text-cream px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all"
                  >
                    📧 Reply via Email
                  </a>
                  {msg.phone && (
                    <a
                      href={`tel:${msg.phone}`}
                      className="bg-secondary border-2 border-accent text-primary px-6 py-2 rounded-full font-semibold hover:bg-accent hover:text-cream transition-all"
                    >
                      📱 Call
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
