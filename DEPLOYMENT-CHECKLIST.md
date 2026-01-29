# 🚀 TLSY Handicrafts - Deployment Checklist

## Pre-Launch Checklist

### ☐ Supabase Setup
- [ ] Created Supabase account
- [ ] Created new project
- [ ] Ran `supabase-schema.sql` in SQL Editor
- [ ] Ran `sample-products.sql` (or added own products)
- [ ] Created Storage bucket named "products"
- [ ] Made Storage bucket public
- [ ] Copied Project URL
- [ ] Copied anon key
- [ ] Copied service_role key

### ☐ Environment Configuration
- [ ] Updated `.env.local` with real Supabase credentials
- [ ] Verified all environment variables are correct
- [ ] Tested locally with `npm run dev`

### ☐ Content Setup
- [ ] Updated crafter_profile with shop information (both EN & TL)
- [ ] Uploaded profile image
- [ ] Added social media links to social_links table
- [ ] Added at least 5 products with images
- [ ] Set 3-4 products as featured
- [ ] Verified all product images load correctly

### ☐ Testing
- [ ] Tested language switching (EN ↔ TL)
- [ ] Browsed all pages (Home, About, Products, Contact, Shopee)
- [ ] Filtered products by category
- [ ] Searched for products
- [ ] Viewed product detail pages
- [ ] Submitted test contact form
- [ ] Verified contact submission in Supabase
- [ ] Tested on mobile device/responsive view
- [ ] Checked all links work
- [ ] Verified social media links open correctly

### ☐ GitHub Setup
- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
```bash
git init
git add .
git commit -m "Initial commit - TLSY Handicrafts"
git branch -M main
git remote add origin https://github.com/yourusername/tlsy-handicrafts.git
git push -u origin main
```

### ☐ Vercel Deployment
- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Added environment variables in Vercel:
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] SUPABASE_SERVICE_ROLE_KEY
  - [ ] NEXT_PUBLIC_SITE_URL (use Vercel URL)
- [ ] Deployed successfully
- [ ] Visited live site and tested

### ☐ Post-Deployment
- [ ] Enabled Vercel Analytics
- [ ] Added NEXT_PUBLIC_VERCEL_ANALYTICS_ID to environment variables
- [ ] Redeployed
- [ ] Tested all features on live site
- [ ] Submitted test contact form on live site
- [ ] Verified analytics tracking works

### ☐ Optional: Custom Domain
- [ ] Purchased domain
- [ ] Added domain in Vercel settings
- [ ] Configured DNS records
- [ ] Updated NEXT_PUBLIC_SITE_URL
- [ ] Verified SSL certificate active
- [ ] Tested site on custom domain

---

## Launch Day Checklist

### ☐ Final Verification
- [ ] All products have correct pricing
- [ ] All images load properly
- [ ] Contact form works
- [ ] Both languages display correctly
- [ ] Mobile version looks good
- [ ] No console errors

### ☐ Marketing Preparation
- [ ] Prepared social media announcement posts
- [ ] Created graphics for launch
- [ ] Listed all social media platforms to post on
- [ ] Prepared email to existing customers (if any)

### ☐ Monitoring Setup
- [ ] Bookmarked Vercel dashboard
- [ ] Bookmarked Supabase dashboard
- [ ] Set up daily reminder to check contact messages
- [ ] Set up weekly reminder to review analytics

---

## Week 1 Post-Launch Checklist

### ☐ Daily Tasks
- [ ] Check contact_submissions table for new messages
- [ ] Respond to all inquiries within 24 hours
- [ ] Monitor Vercel Analytics for traffic

### ☐ Weekly Tasks
- [ ] Review analytics_events for popular products
- [ ] Check page_views for traffic patterns
- [ ] Update featured products if needed
- [ ] Add new products (if available)
- [ ] Share on social media

### ☐ Issues to Watch For
- [ ] Slow page loads (check Vercel Analytics)
- [ ] Broken images (check Storage bucket)
- [ ] Contact form not working (check Supabase logs)
- [ ] Translation errors (review both languages)

---

## Monthly Maintenance Checklist

### ☐ Content Updates
- [ ] Review and update product pricing
- [ ] Add new products
- [ ] Update featured products
- [ ] Refresh profile/bio if needed
- [ ] Check all product images still load

### ☐ Analytics Review
- [ ] Review most viewed products
- [ ] Check language preference trends
- [ ] Analyze traffic sources
- [ ] Identify popular categories
- [ ] Review contact form conversion rate

### ☐ Technical Maintenance
- [ ] Check for Next.js updates
- [ ] Update dependencies if needed
- [ ] Review Supabase usage/limits
- [ ] Backup database
- [ ] Test all features still work

### ☐ Marketing
- [ ] Plan social media content
- [ ] Create new product photos
- [ ] Collect customer testimonials
- [ ] Plan seasonal promotions
- [ ] Update Shopee shop (if applicable)

---

## Emergency Contacts

### Technical Issues
- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/support
- **Developer:** [Your contact info]

### Quick Fixes

**Site is down:**
1. Check Vercel dashboard for deployment status
2. Check Supabase dashboard for project status
3. Verify environment variables are set

**Images not loading:**
1. Check Supabase Storage bucket is public
2. Verify image URLs are correct
3. Check Storage usage limits

**Contact form not working:**
1. Check Supabase is online
2. Verify RLS policies allow inserts
3. Check browser console for errors

**Products not showing:**
1. Verify products exist in database
2. Check `availability` is true
3. Clear browser cache

---

## Success Metrics to Track

### Traffic
- [ ] Daily visitors
- [ ] Page views per session
- [ ] Bounce rate
- [ ] Average session duration

### Engagement
- [ ] Product views
- [ ] Category clicks
- [ ] Contact form submissions
- [ ] Language preference (EN vs TL)

### Business
- [ ] Inquiries per week
- [ ] Conversion rate (views to inquiries)
- [ ] Popular products
- [ ] Popular categories

---

## Notes

**Deployment Date:** _______________

**Live URL:** _______________

**Custom Domain:** _______________

**Supabase Project:** _______________

**Vercel Project:** _______________

---

## 🎉 Congratulations!

Once all items are checked, your TLSY Handicrafts website is live and ready for customers!

**Next Steps:**
1. Share your website on social media
2. Add link to your Shopee shop
3. Tell your existing customers
4. Start taking orders!

**Good luck! 🚀**
