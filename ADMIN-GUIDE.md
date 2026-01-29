# TLSY Handicrafts - Admin User Guide

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Managing Products](#managing-products)
3. [Managing Profile](#managing-profile)
4. [Viewing Contact Messages](#viewing-contact-messages)
5. [Understanding Analytics](#understanding-analytics)
6. [Managing Social Links](#managing-social-links)
7. [Tips & Best Practices](#tips--best-practices)

---

## Getting Started

### Accessing Your Dashboard

**Current Setup:** Direct database access via Supabase Dashboard
- Go to [supabase.com](https://supabase.com)
- Sign in to your account
- Select your TLSY Handicrafts project
- Click "Table Editor" in the left sidebar

**Note:** A dedicated admin dashboard with login will be added in Phase 2.

---

## Managing Products

### Adding a New Product

1. **Navigate to Products Table**
   - In Supabase, click "Table Editor"
   - Select "products" table
   - Click "Insert row" button

2. **Fill in Required Fields**

   **English Fields:**
   - `product_name`: Product name in English (e.g., "Custom Business Cards")
   - `description`: Full description (300-800 words)
   - `short_description`: Brief description (100-150 characters)
   
   **Tagalog Fields:**
   - `product_name_tl`: Product name in Tagalog
   - `description_tl`: Full description in Tagalog
   - `short_description_tl`: Brief description in Tagalog

   **Pricing:**
   - `price`: Enter number only (e.g., 500.00)
   - `currency`: Leave as "PHP"
   - `price_notes`: Optional (e.g., "Custom pricing available")
   - `price_notes_tl`: Tagalog version of price notes

   **Category:**
   - Choose from: "Printing Services", "Souvenirs", "Invitations", "Digital Products"

   **Images:**
   - Format: `["url1", "url2", "url3"]`
   - Example: `["https://example.com/image1.jpg"]`
   - Upload images to Supabase Storage first (see below)

   **Other Fields:**
   - `turnaround_time`: e.g., "3-5 business days"
   - `turnaround_time_tl`: Tagalog version
   - `customization_available`: Check if customizable
   - `availability`: Check if available for sale
   - `featured`: Check to show on homepage
   - `stock_quantity`: Optional, for physical items

   **Specifications:**
   - Format: `{"Size": "5x7 inches", "Material": "Paper"}`
   - Add any relevant product details

3. **Click "Save"**

### Uploading Product Images

1. **Go to Storage**
   - Click "Storage" in Supabase sidebar
   - Create bucket named "products" (if not exists)
   - Make bucket public

2. **Upload Images**
   - Click "Upload file"
   - Select your image
   - After upload, click the image
   - Click "Get public URL"
   - Copy the URL

3. **Use in Products**
   - Paste URL in product `images` field
   - Format: `["https://your-project.supabase.co/storage/v1/object/public/products/image.jpg"]`

### Editing a Product

1. Find product in products table
2. Click the row
3. Edit any field
4. Click "Save"

### Deleting a Product

1. Find product in products table
2. Click the row
3. Click "Delete row"
4. Confirm deletion

**Tip:** Instead of deleting, set `availability` to false to hide it.

### Making a Product Featured

1. Find product in products table
2. Check the `featured` box
3. Save
4. Product will appear on homepage

---

## Managing Profile

### Editing Your Shop Information

1. **Navigate to Profile**
   - Table Editor > "crafter_profile"
   - Click the single row (your profile)

2. **Editable Fields**

   **Basic Info:**
   - `crafter_name`: "TLSY Handicrafts"
   - `crafter_name_tl`: Tagalog version
   - `profile_image_url`: URL to your profile photo
   - `years_experience`: Number of years (e.g., 4)

   **Bio (Short):**
   - `short_bio`: 100-150 words in English
   - `short_bio_tl`: Tagalog version
   - Used for SEO and quick introductions

   **Bio (Full):**
   - `bio`: 300-500 words in English
   - `bio_tl`: Tagalog version
   - Main about section

   **Story:**
   - `background_story`: Your journey, inspiration
   - `background_story_tl`: Tagalog version

   **Process:**
   - `crafting_process`: How you work, what makes you special
   - `crafting_process_tl`: Tagalog version

   **Certifications:**
   - List any relevant certifications or awards

3. **Click "Save"**

### Updating Profile Photo

1. Upload image to Supabase Storage (products bucket)
2. Get public URL
3. Paste in `profile_image_url` field
4. Save

---

## Viewing Contact Messages

### Accessing Messages

1. **Navigate to Contact Submissions**
   - Table Editor > "contact_submissions"
   - View all submitted messages

2. **Message Information**
   - `name`: Customer name
   - `email`: Customer email
   - `phone`: Customer phone (if provided)
   - `subject`: Message subject
   - `message`: Full message
   - `language_preference`: Language used (en or tl)
   - `created_at`: When submitted
   - `is_read`: Mark as read/unread

### Managing Messages

**Mark as Read:**
1. Click the message row
2. Check `is_read` box
3. Save

**Filter Unread:**
- Click "Filters" button
- Add filter: `is_read` equals `false`
- Apply

**Responding to Messages:**
- Copy customer email
- Reply via your email client
- Mark message as read in Supabase

---

## Understanding Analytics

### Page Views

**Table:** `page_views`

**What it tracks:**
- Every page visit
- Language preference
- Referrer (where visitors came from)
- Session ID (to track user journey)

**Useful Queries:**

```sql
-- Total page views today
SELECT COUNT(*) FROM page_views 
WHERE DATE(timestamp) = CURRENT_DATE;

-- Most visited pages
SELECT page_path, COUNT(*) as visits
FROM page_views
GROUP BY page_path
ORDER BY visits DESC;

-- Language preference breakdown
SELECT user_language, COUNT(*) as count
FROM page_views
GROUP BY user_language;
```

### Analytics Events

**Table:** `analytics_events`

**What it tracks:**
- Product views
- Category filters
- Contact form submissions
- Inquire button clicks

**Useful Queries:**

```sql
-- Most viewed products
SELECT p.product_name, COUNT(*) as views
FROM analytics_events ae
JOIN products p ON ae.product_id = p.id
WHERE ae.event_name = 'product_view'
GROUP BY p.product_name
ORDER BY views DESC
LIMIT 10;

-- Popular categories
SELECT additional_data->>'category' as category, COUNT(*) as clicks
FROM analytics_events
WHERE event_name = 'category_click'
GROUP BY category
ORDER BY clicks DESC;
```

### Running Queries

1. Go to SQL Editor in Supabase
2. Paste query
3. Click "Run"
4. View results

---

## Managing Social Links

### Adding a Social Media Link

1. **Navigate to Social Links**
   - Table Editor > "social_links"
   - Click "Insert row"

2. **Fill in Fields**
   - `platform`: Name (e.g., "Facebook", "Instagram", "TikTok")
   - `url`: Full URL to your profile
   - `icon_name`: Same as platform (lowercase)
   - `is_active`: Check to show on website

3. **Save**

### Editing Social Links

1. Find link in social_links table
2. Click row
3. Edit URL or toggle `is_active`
4. Save

### Hiding a Social Link

1. Find link in table
2. Uncheck `is_active`
3. Save
4. Link will disappear from website

---

## Tips & Best Practices

### Product Management

**Pricing:**
- Always include price in PHP
- Use 2 decimal places (e.g., 250.00)
- Add price notes for custom pricing

**Images:**
- Use high-quality photos (1000x1000px minimum)
- Show product from multiple angles
- Use consistent lighting and backgrounds
- Optimize images before upload (compress to reduce file size)

**Descriptions:**
- Write in natural, conversational tone
- Highlight benefits, not just features
- Include dimensions and materials
- Mention turnaround time clearly
- Use bullet points for specifications

**Categories:**
- Be consistent with category names
- Use exact spelling: "Printing Services", "Souvenirs", "Invitations", "Digital Products"

**Featured Products:**
- Feature 3-4 best-selling items
- Update seasonally
- Choose products with great photos

### Bilingual Content

**Translation Tips:**
- Keep tone consistent across languages
- Adapt idioms, don't translate literally
- Use natural Tagalog, not direct translation
- Character counts should be similar

**Common Translations:**
- Printing Services = Serbisyo ng Printing
- Souvenirs = Mga Alaala
- Invitations = Mga Imbitasyon
- Digital Products = Mga Produktong Dijital
- Custom = Custom / Personalized
- Available = Available
- Out of Stock = Walang Stock

### SEO Best Practices

**Product Names:**
- Keep under 60 characters
- Include key search terms
- Be specific and descriptive

**Short Descriptions:**
- 100-150 characters
- Include main benefit
- Use action words

**Full Descriptions:**
- 300-800 words ideal
- Use natural language
- Include relevant keywords naturally
- Answer common questions

### Image Guidelines

**File Naming:**
- Use descriptive names: `business-cards-sample.jpg`
- Avoid spaces: use hyphens
- Include product name

**Formats:**
- JPG for photos
- PNG for graphics with transparency
- WebP for best compression (if supported)

**Sizes:**
- Product images: 1000x1000px (square)
- Profile photo: 400x400px
- Keep file size under 500KB

### Customer Service

**Responding to Inquiries:**
- Reply within 24 hours
- Be friendly and professional
- Answer all questions clearly
- Provide pricing and timeline
- Thank them for their interest

**Common Questions to Address:**
- Pricing and payment methods
- Turnaround time
- Customization options
- Shipping/delivery
- Bulk order discounts

---

## Quick Reference

### Product Status Checklist
- [ ] Both English and Tagalog names filled
- [ ] Both descriptions complete
- [ ] Price set correctly (PHP)
- [ ] Category selected
- [ ] At least 1 image uploaded
- [ ] Turnaround time specified
- [ ] Availability checked
- [ ] Specifications added (if applicable)

### Weekly Tasks
- [ ] Check contact messages
- [ ] Review analytics
- [ ] Update featured products
- [ ] Add new products (if any)
- [ ] Respond to all inquiries

### Monthly Tasks
- [ ] Review product pricing
- [ ] Update profile/bio if needed
- [ ] Check all images loading
- [ ] Review popular products
- [ ] Plan new product launches

---

## Need Help?

**Common Issues:**

**Images not showing:**
- Check URL is correct and accessible
- Verify Storage bucket is public
- Ensure image format is supported (JPG, PNG)

**Product not appearing:**
- Check `availability` is true
- Verify all required fields filled
- Check category spelling

**Translation not showing:**
- Verify both language fields filled
- Check for typos in field names
- Clear browser cache

**Contact form not working:**
- Check Supabase is online
- Verify RLS policies allow inserts
- Check browser console for errors

---

## Future Features (Coming Soon)

- **Admin Dashboard:** Web-based interface for easier management
- **Bulk Upload:** Upload multiple products at once
- **Image Editor:** Crop and resize images in-browser
- **Email Notifications:** Auto-notify on new messages
- **Analytics Dashboard:** Visual charts and reports
- **Shopee Integration:** Sync products with Shopee
- **Order Management:** Track custom orders
- **Customer Database:** Save customer information

---

**Last Updated:** 2024
**Version:** 1.0
