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

export const trackEvent = async (
  eventName: string,
  page: string,
  language: string,
  productId?: string,
  additionalData?: Record<string, any>
) => {
  const session = getSessionId();
  
  await supabase.from('analytics_events').insert({
    event_name: eventName,
    page,
    product_id: productId || null,
    session_id: session,
    user_language: language,
    timestamp: new Date().toISOString(),
    additional_data: additionalData || null,
  });
};
