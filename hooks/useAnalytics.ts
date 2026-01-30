'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export const useAnalytics = (language: string) => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname, language);
    }
  }, [pathname, language]);
};
