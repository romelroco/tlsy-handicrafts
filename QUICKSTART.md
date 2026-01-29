# ⚡ Quick Start - TLSY Handicrafts

## 🎯 Get Your Site Running in 5 Minutes

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Set Up Supabase (2 min)
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. Go to SQL Editor → New Query
4. Copy/paste contents of `supabase-schema.sql` → Run
5. Copy/paste contents of `sample-products.sql` → Run
6. Go to Settings → API → Copy your credentials

### Step 3: Configure Environment (1 min)
Edit `.env.local` and replace with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_key
```

### Step 4: Run Development Server (1 min)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📖 Full Documentation

- **SETUP-GUIDE.md** - Complete setup & deployment
- **ADMIN-GUIDE.md** - How to manage content
- **PROJECT-SUMMARY.md** - What's been built
- **DEPLOYMENT-CHECKLIST.md** - Pre-launch checklist

---

## 🚀 Deploy to Vercel (10 min)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# Then:
# 1. Go to vercel.com
# 2. Import your GitHub repo
# 3. Add environment variables
# 4. Deploy!
```

---

## ✅ What You Get

- ✅ Bilingual website (English & Tagalog)
- ✅ Product catalog with 15 sample products
- ✅ Contact form
- ✅ Analytics tracking
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Production ready

---

## 🎨 Customize Your Content

### Update Shop Info
1. Go to Supabase → Table Editor → `crafter_profile`
2. Edit the row with your information

### Add Products
1. Go to Supabase → Table Editor → `products`
2. Click "Insert row"
3. Fill in both English and Tagalog fields

### Add Social Links
1. Go to Supabase → Table Editor → `social_links`
2. Add your social media URLs

---

## 🆘 Need Help?

Check the documentation files or common issues:

**Site not loading?**
- Check `.env.local` has correct Supabase credentials

**Products not showing?**
- Run `sample-products.sql` in Supabase SQL Editor

**Images not loading?**
- Create Storage bucket named "products" in Supabase
- Make it public

---

## 📞 Support

Read the guides:
1. SETUP-GUIDE.md (technical)
2. ADMIN-GUIDE.md (non-technical)
3. PROJECT-SUMMARY.md (overview)

---

**That's it! Your TLSY Handicrafts website is ready! 🎉**
