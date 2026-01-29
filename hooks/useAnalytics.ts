'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackEvent } from '@/lib/analytics';

export const useAnalytics = (language: string) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, language);
    }
  }, [pathname, language]);

  const logEvent = (
    eventName: string,
    productId?: string,
    additionalData?: Record<string, any>
  ) => {
    trackEvent(eventName, pathname || '', language, productId, additionalData);
  };

  return { logEvent };
};
