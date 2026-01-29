import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'tl'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)']
};
