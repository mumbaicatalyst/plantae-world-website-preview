# Plantae World — Complete Client Handoff & Deployment Guide

This document contains everything needed by the hosting administrator or webmaster to deploy the redesigned Plantae World website as a permanent replacement for the existing site.

---

## 1. Architecture & Deliverable Overview

The website is engineered using pure, standards-compliant **Vanilla HTML5, CSS3, and JavaScript**. 
* **Zero build steps**: No Node.js, Webpack, or npm dependencies are required to run or host the site.
* **100% Host-Agnostic**: Deploys seamlessly to cPanel (`public_html`), Apache, Nginx, AWS S3/CloudFront, Cloudflare Pages, Vercel, or Netlify.
* **Responsive Architecture**: Fully responsive from 320px compact mobile phones up to 4K desktop screens.

### Core File Structure
```
├── index.html                  # Homepage (Hybrid Rosebank slider, Disciplines, Typologies)
├── services.html               # 4 Landscape & Living Wall Disciplines + Mobile Carousels
├── design-and-build.html       # 3-Track Architectural Journey (Turnkey Execution)
├── selected-works.html         # Portfolio & Case Studies (Apartments, Villas, Commercial)
├── plantae-luxe.html           # Luxury Retail Boutique, Rare Specimens & Home Styling
├── about.html                  # 40-Year Heritage (Since 1985), Founder Story & Philosophy
├── contact.html                # Studio Location (Ballard Estate), Direct Channels & Enquiry Form
├── sitemap.xml                 # Search engine sitemap
├── robots.txt                  # Search engine crawler instructions
├── vercel.json                 # Vercel preview & production security headers
├── netlify.toml                # Netlify alternative deployment configuration
├── *.css                       # Compiled component & responsive stylesheets
├── *.js                        # Off-canvas drawer, hero sliders, preloader, form handlers
└── assets/                     # All project photography, video reels, brand emblems & icons
```

---

## 2. Step 1: Uploading to the Server

1. **Extract the ZIP file**: Unzip the package into the web server's root directory (typically `public_html` on cPanel/Plesk, or `/var/www/html` on Linux Nginx/Apache).
2. **Preserve folder hierarchy**: Ensure the `assets/` directory sits in the same directory as `index.html`.
3. **Replace previous site**: Backup the old website files, then place these files at the domain root so that `https://plantaeworld.com/` loads `index.html`.

---

## 3. Step 2: Enabling Search Engine Indexing (Google & Bing)

During the staging and preview phase, all pages were intentionally set to `noindex` to avoid premature crawler indexing. 

### What to Change Before Public Launch:
In each of the **7 HTML files** (`index.html`, `services.html`, `design-and-build.html`, `selected-works.html`, `plantae-luxe.html`, `about.html`, `contact.html`), find line 5:
```html
<!-- BEFORE (Staging Mode) -->
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
```
Change it to:
```html
<!-- AFTER (Production Live Mode) -->
<meta name="robots" content="index, follow" />
```

*Note: In `vercel.json` (if using Vercel), remove the `X-Robots-Tag` block once live.*

---

## 4. Step 3: Web3Forms Email & Lead Routing

The contact page and consultation modals submit via **Web3Forms**, forwarding enquiries directly to Plantae's email inbox without requiring any server-side PHP or backend database.

### Current Configuration:
* **Access Key**: `760f1a7f-5c61-480c-81d3-ba9c7e1a1189`
* **Recipient**: `shruti@plantaeworld.com`
* **Spam Protection**: Configured with a hidden honeypot field (`botcheck`) and client-side validation.

### If You Need to Change the Destination Email:
1. Visit [https://web3forms.com](https://web3forms.com) and enter the new email address to generate a new free access key.
2. In the following 3 files, update the `access_key` value:
   * **`contact.html`** (line 210)
   * **`services.html`** (line 716)
   * **`nav.js`** (line 187)
3. Submit a test enquiry on the live site to confirm delivery.

---

## 5. Step 4: Server Caching & Security Headers

### If Hosting on Apache (cPanel / LiteSpeed):
Add this to your `.htaccess` file:
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security Headers
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "DENY"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()"

# Content Security Policy (Allows Web3Forms submissions and GSAP from Cloudflare)
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; media-src 'self' data: blob:; connect-src 'self' https://api.web3forms.com; form-action 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self';"

# Caching: Revalidate HTML immediately, cache assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 day"
  ExpiresByType application/javascript "access plus 1 day"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType video/mp4 "access plus 30 days"
</IfModule>
```

### If Hosting on Nginx:
```nginx
# Security Headers
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; media-src 'self' data: blob:; connect-src 'self' https://api.web3forms.com; form-action 'self' https://api.web3forms.com; frame-ancestors 'none'; base-uri 'self';" always;

# HTML: Do not cache
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate";
}

# Static Assets
location ~* \.(css|js|jpg|jpeg|png|gif|svg|mp4|webm|woff2)$ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

---

## 6. Pre-Launch Verification Checklist

Before making the website live to the public, verify:
* [ ] **SSL / HTTPS is active**: Certificate is valid and all traffic redirects from HTTP to HTTPS.
* [ ] **Robots meta tag updated**: Changed from `noindex, nofollow` to `index, follow`.
* [ ] **Enquiry form test**: Send a live test enquiry via `contact.html` and confirm receipt in `shruti@plantaeworld.com`.
* [ ] **WhatsApp integration**: Click the WhatsApp header and footer buttons to ensure they launch a direct WhatsApp chat to `+91 74000 77765`.
* [ ] **Phone dialer test**: Tap the phone buttons on mobile to ensure direct dialing to `07400077765`.
