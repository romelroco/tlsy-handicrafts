import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

let sessionId: string | null = null;

export const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  if (!sessionId) {
    sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('session_id', sessionId);
    }
  }
  return sessionId;
};

export const trackPageView = async (pagePath: string, language: string) => {
  const session = getSessionId();
  const referrer = typeof window !== 'undefined' ? document.referrer : '';
  
  await supabase.from('page_views').insert({
    page_path: pagePath,
    session_id: session,
    user_language: language,
    referrer: referrer || null,
    timestamp: new Date().toISOString(),
  });
};


