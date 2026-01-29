# TLSY Handicrafts Website

Modern, bilingual (English & Tagalog) e-commerce website for TLSY Handicrafts - The Little Shop Year 2020.

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Analytics**: Vercel Analytics + Custom Supabase tracking
- **Deployment**: Vercel

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the `supabase-schema.sql` file
3. Get your project URL and anon key from Settings > API

### 3. Configure Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_vercel_analytics_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  /[locale]           # Bilingual pages (en/tl)
    /about
    /products
    /contact
    /shopee
  /api                # API routes
/components           # React components
/hooks                # Custom hooks
/lib                  # Utilities
/messages             # i18n translations
/public               # Static assets
/styles               # Global styles
```

## Features

- ✅ Bilingual support (English & Tagalog)
- ✅ Product catalog with categories
- ✅ Contact form
- ✅ Analytics tracking
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Admin dashboard (coming soon)

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## Admin Dashboard

Admin features will be added in the next phase:
- Product management
- Profile editing
- Contact message inbox
- Analytics dashboard
- Social links management

## Sample Products

Add sample products via Supabase dashboard or create an admin interface.

## Support

For questions or issues, contact the development team.
