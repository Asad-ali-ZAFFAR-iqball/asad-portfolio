# Deployment Guide - GitHub Pages + Google Search

This guide will help you deploy your portfolio to GitHub Pages with a custom domain and make it searchable on Google.

## 📋 Prerequisites

- ✅ GitHub repository: `https://github.com/Asad-ali-ZAFFAR-iqball/asad-portfolio`
- ✅ Custom domain purchased: `asadalizaffar.dev`
- ✅ GitHub Actions workflow configured
- ✅ CNAME file created

---

## 🚀 Step 1: Push Code to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add GitHub Pages deployment workflow and CNAME"

# Push to main branch
git push origin main
```

**⏳ Wait:** GitHub Actions will automatically start building and deploying your site (2-3 minutes).

---

## ⚙️ Step 2: Enable GitHub Pages

1. Go to your repository: `https://github.com/Asad-ali-ZAFFAR-iqball/asad-portfolio`
2. Click **Settings** (top menu)
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - Source: **GitHub Actions** (should already be selected)
5. Under **Custom domain**:
   - Enter: `asadalizaffar.dev`
   - Click **Save**
   - ✅ Check **Enforce HTTPS** (wait for DNS check to pass first)

---

## 🌐 Step 3: Configure DNS Records

Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add these DNS records:

### Option A: Using Apex Domain (asadalizaffar.dev)

Add these **A Records**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### Option B: Using WWW Subdomain (www.asadalizaffar.dev)

Add this **CNAME Record**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | Asad-ali-ZAFFAR-iqball.github.io | 3600 |

### Recommended: Both (Apex + WWW)

1. Add all 4 **A records** from Option A
2. Add the **CNAME record** from Option B
3. Add this **CNAME record** for apex domain:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | Asad-ali-ZAFFAR-iqball.github.io | 3600 |

**⏳ Wait:** DNS propagation can take 5 minutes to 48 hours (usually 15-30 minutes).

---

## ✅ Step 4: Verify Deployment

1. **Check GitHub Actions:**
   - Go to: `https://github.com/Asad-ali-ZAFFAR-iqball/asad-portfolio/actions`
   - Ensure the latest workflow run shows ✅ green checkmark

2. **Check DNS Propagation:**
   - Visit: https://dnschecker.org/
   - Enter: `asadalizaffar.dev`
   - Ensure A records are showing GitHub's IPs

3. **Visit Your Site:**
   - Open: https://asadalizaffar.dev
   - It should load your portfolio!

4. **Enable HTTPS:**
   - After DNS propagates, go back to **Settings** > **Pages**
   - Check **Enforce HTTPS**

---

## 🔍 Step 5: Make It Searchable on Google

### 5.1 Verify Site with Google Search Console

1. Go to: https://search.google.com/search-console/
2. Click **Add Property** > **URL prefix**
3. Enter: `https://asadalizaffar.dev`
4. Choose verification method:

**Option A: HTML Tag** (Recommended)
- Copy the meta tag
- Add it to `src/app/layout.tsx` in the `<head>` section
- Push changes and wait for deployment
- Click **Verify**

**Option B: DNS Record**
- Add the TXT record to your domain DNS settings
- Click **Verify**

### 5.2 Submit Sitemap

1. In Google Search Console, click **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**

Your sitemap URL: https://asadalizaffar.dev/sitemap.xml

### 5.3 Request Indexing

1. In Google Search Console, use **URL Inspection** tool
2. Enter: `https://asadalizaffar.dev`
3. Click **Request Indexing**

### 5.4 Wait for Google to Crawl

- ⏳ Initial indexing: 1-7 days
- 🔍 Check status: Search `site:asadalizaffar.dev` on Google

---

## 📊 Optional: Add Analytics & SEO Tools

### Google Analytics

1. Create account at: https://analytics.google.com
2. Get your Tracking ID (G-XXXXXXXXXX)
3. Add to your site (create a Google Analytics component)

### Google Tag Manager

1. Create account at: https://tagmanager.google.com
2. Get your GTM ID (GTM-XXXXXX)
3. Add GTM script to your layout

### Bing Webmaster Tools

1. Go to: https://www.bing.com/webmasters
2. Add your site
3. Import from Google Search Console (easier)

---

## 🔄 Future Updates

After making changes to your portfolio:

```bash
# 1. Commit changes
git add .
git commit -m "Update portfolio content"

# 2. Push to GitHub
git push origin main
```

GitHub Actions will automatically rebuild and deploy your site within 2-3 minutes! ✨

---

## 🐛 Troubleshooting

### Site not loading?
- ✅ Check DNS propagation: https://dnschecker.org/
- ✅ Verify GitHub Actions completed successfully
- ✅ Ensure CNAME file contains: `asadalizaffar.dev`
- ✅ Clear browser cache (Ctrl+Shift+R)

### 404 Error?
- ✅ Check GitHub Pages is enabled in repository settings
- ✅ Ensure custom domain is set correctly
- ✅ Verify DNS records are correct

### SSL Certificate Error?
- ✅ Wait for DNS to fully propagate
- ✅ Disable and re-enable "Enforce HTTPS" in GitHub Pages settings
- ✅ Wait 10-15 minutes for certificate provisioning

### Not showing up on Google?
- ✅ Verify site ownership in Google Search Console
- ✅ Submit sitemap
- ✅ Check robots.txt allows crawling
- ✅ Wait 3-7 days for initial indexing

---

## 📚 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Google Search Console Help](https://support.google.com/webmasters/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [DNS Checker Tool](https://dnschecker.org/)

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub Actions workflow completed ✅
- [ ] GitHub Pages enabled
- [ ] Custom domain configured in GitHub
- [ ] DNS records added to domain registrar
- [ ] Site loads at https://asadalizaffar.dev
- [ ] HTTPS enabled
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Google
- [ ] Initial indexing requested

**Once all checked, your portfolio is live and searchable! 🚀**
