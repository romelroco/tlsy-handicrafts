'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2 bg-warm/50 rounded-full p-1 border border-accent/30">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          locale === 'en' 
            ? 'bg-gradient-to-r from-accent to-craft text-cream shadow-md' 
            : 'text-text hover:text-craft'
        }`}
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => switchLanguage('tl')}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          locale === 'tl' 
            ? 'bg-gradient-to-r from-accent to-craft text-cream shadow-md' 
            : 'text-text hover:text-craft'
        }`}
      >
        🇵🇭 TL
      </button>
    </div>
  );
}
