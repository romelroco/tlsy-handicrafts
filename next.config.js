const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['zizrxnvjrgdtlvvdogas.supabase.co', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = withNextIntl(nextConfig);
