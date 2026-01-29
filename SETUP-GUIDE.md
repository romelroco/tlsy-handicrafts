# TLSY Handicrafts - Complete Setup Guide

## 🚀 Quick Start (5 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Supabase Database

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Create a new organization and project

2. **Run Database Schema**
   - In your Supabase dashboard, go to SQL Editor
   - Click "New Query"
   - Copy and paste the entire contents of `supabase-schema.sql`
   - Click "Run" to create all tables

3. **Add Sample Products (Optional)**
   - In SQL Editor, create another new query
   - Copy and paste contents of `sample-products.sql`
   - Click "Run" to add 15 sample products

4. **Get API Credentials**
   - Go to Settings > API
   - Copy your Project URL
   - Copy your `anon` `public` key
   - Copy your `service_role` `secret` key (keep this secure!)

### Step 3: Configure Environment Variables

Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Test the Site

- ✅ Switch between English and Tagalog
- ✅ Browse products
- ✅ View product details
- ✅ Submit contact form
- ✅ Check all pages load correctly

---

## 📦 Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)
- Completed Steps 1-3 above

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TLSY Handicrafts"
   git branch -M main
   git remote add origin https://github.com/yourusername/tlsy-handicrafts.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add all variables from your `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_SITE_URL` (use your Vercel URL)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

5. **Enable Vercel Analytics**
   - In Vercel dashboard, go to Analytics tab
   - Click "Enable Analytics"
   - Copy the Analytics ID
   - Add to environment variables: `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`
   - Redeploy

### Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

---

## 🎨 Customization Guide

### Update Shop Information

1. **Edit Crafter Profile**
   - Go to Supabase dashboard
   - Open Table Editor > `crafter_profile`
   - Edit the single row with your information
   - Update both English and Tagalog fields

2. **Add Social Media Links**
   - Table Editor > `social_links`
   - Add rows for each platform
   - Set `is_active` to true
   - Use platform names: Facebook, Instagram, TikTok, Shopee, etc.

### Add Products

**Option 1: Via Supabase Dashboard**
1. Go to Table Editor > `products`
2. Click "Insert row"
3. Fill in all fields (both English and Tagalog)
4. For images, use JSON array format: `["url1", "url2"]`
5. For specifications, use JSON object: `{"Size": "5x7", "Material": "Paper"}`

**Option 2: Via SQL**
- Use the format in `sample-products.sql` as a template
- Modify values for your products
- Run in SQL Editor

### Upload Product Images

**Option 1: Use Supabase Storage**
1. In Supabase, go to Storage
2. Create a new bucket called "products"
3. Make it public
4. Upload images
5. Copy public URLs
6. Use URLs in product `images` field

**Option 2: Use External Service**
- Upload to Cloudinary, Imgur, or similar
- Use direct image URLs

### Customize Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#000000",    // Main black
  secondary: "#FFFFFF",  // White
  accent: "#8B7355",     // Brown accent
  background: "#F5F5F5", // Off-white
  text: "#333333",       // Dark gray
  highlight: "#D4AF37",  // Gold
}
```

### Modify Translations

Edit `messages/en.json` and `messages/tl.json` to change any text on the site.

---

## 📊 Analytics Setup

### Vercel Analytics (Automatic)
- Enabled automatically when deployed to Vercel
- View in Vercel dashboard > Analytics tab
- Shows page views, performance metrics, device breakdown

### Custom Analytics (Supabase)
- Automatically tracks:
  - Page views
  - Product views
  - Category filters
  - Contact form submissions
  - Language preferences
- View data in Supabase > Table Editor:
  - `page_views` table
  - `analytics_events` table

### View Analytics Data

Run queries in Supabase SQL Editor:

```sql
-- Most viewed products
SELECT p.product_name, COUNT(*) as views
FROM analytics_events ae
JOIN products p ON ae.product_id = p.id
WHERE ae.event_name = 'product_view'
GROUP BY p.product_name
ORDER BY views DESC
LIMIT 10;

-- Language preference breakdown
SELECT user_language, COUNT(*) as count
FROM page_views
GROUP BY user_language;

-- Daily page views
SELECT DATE(timestamp) as date, COUNT(*) as views
FROM page_views
GROUP BY DATE(timestamp)
ORDER BY date DESC
LIMIT 30;
```

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to Supabase"
- Check `.env.local` file exists and has correct values
- Verify Supabase project is active
- Check API keys are correct (no extra spaces)

### Issue: "Products not showing"
- Verify products exist in Supabase `products` table
- Check `availability` is set to `true`
- Run sample-products.sql if needed

### Issue: "Images not loading"
- Verify image URLs are accessible
- Check Supabase Storage bucket is public
- Add domain to `next.config.js` under `images.domains`

### Issue: "Language switching not working"
- Clear browser cache
- Check middleware.ts is present
- Verify messages/en.json and messages/tl.json exist

### Issue: "Contact form not submitting"
- Check Supabase RLS policies allow public insert on `contact_submissions`
- Verify API route at `/api/contact/route.ts` exists
- Check browser console for errors

---

## 📱 Testing Checklist

### Functionality
- [ ] Home page loads
- [ ] Language switcher works (EN ↔ TL)
- [ ] Products page shows all products
- [ ] Category filter works
- [ ] Search works
- [ ] Product detail page loads
- [ ] Contact form submits successfully
- [ ] About page shows profile
- [ ] Footer social links work
- [ ] Mobile responsive on all pages

### Content
- [ ] All text appears in both languages
- [ ] Product prices display correctly (₱)
- [ ] Images load properly
- [ ] No broken links

### Performance
- [ ] Pages load quickly
- [ ] Images are optimized
- [ ] No console errors

---

## 🎯 Next Steps (Future Enhancements)

### Admin Dashboard
- Product management interface
- Contact message inbox
- Analytics dashboard
- Profile editing

### E-commerce Features
- Shopping cart
- Payment integration (PayMaya, GCash)
- Order management
- Inventory tracking

### Marketing
- Newsletter signup
- Blog section
- Customer reviews
- Discount codes

### Integrations
- Shopee API sync
- Email notifications
- SMS notifications
- Social media auto-posting

---

## 📞 Support

For technical issues or questions:
1. Check this guide first
2. Review Supabase documentation
3. Check Next.js documentation
4. Contact your developer

---

## 📄 File Structure Reference

```
tlsy/
├── app/
│   ├── [locale]/          # Bilingual pages
│   │   ├── about/
│   │   ├── products/
│   │   │   └── [id]/     # Product detail
│   │   ├── contact/
│   │   └── shopee/
│   ├── api/              # API routes
│   │   └── contact/
│   └── layout.tsx
├── components/           # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── LanguageSwitcher.tsx
├── hooks/               # Custom hooks
│   └── useAnalytics.ts
├── lib/                 # Utilities
│   ├── supabase.ts
│   └── analytics.ts
├── messages/            # Translations
│   ├── en.json
│   └── tl.json
├── public/              # Static files
├── styles/
│   └── globals.css
├── supabase-schema.sql  # Database setup
├── sample-products.sql  # Sample data
└── .env.local          # Environment variables
```

---

## 🎉 Congratulations!

Your TLSY Handicrafts website is now ready. Start adding your products and sharing your shop with the world!
