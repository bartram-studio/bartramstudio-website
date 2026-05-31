# 🐚 Bartram Studio Website

Handcrafted coastal art from St. Johns, Florida. Built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com), content managed with [Decap CMS](https://decapcms.org).

---

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Local Development Setup](#local-development-setup)
3. [Pushing to GitHub](#pushing-to-github)
4. [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)
5. [Setting Up Decap CMS](#setting-up-decap-cms)
6. [Managing Products](#managing-products)
7. [Adding Product Photos](#adding-product-photos)
8. [Customization Guide](#customization-guide)

---

## Project Structure

```
bartram-studio/
├── public/
│   ├── admin/
│   │   ├── index.html          ← Decap CMS app
│   │   └── config.yml          ← CMS field configuration
│   ├── images/
│   │   └── products/           ← Product photos go here
│   ├── _redirects              ← Cloudflare Pages routing
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts           ← Astro content collection schema
│   │   └── products/           ← One .md file per product
│   │       ├── sea-glass-resin-tray.md
│   │       └── ...
│   ├── layouts/
│   │   └── Layout.astro        ← Site-wide header, footer, nav
│   ├── pages/
│   │   ├── index.astro         ← Home page
│   │   ├── about.astro         ← About page
│   │   ├── contact.astro       ← Contact page
│   │   ├── 404.astro           ← Not found page
│   │   └── products/
│   │       ├── index.astro     ← Product listing page
│   │       └── [slug].astro    ← Dynamic product detail page
│   └── styles/
│       └── global.css          ← All global styles
├── astro.config.mjs
├── package.json
└── .gitignore
```

---

## Local Development Setup

### Prerequisites

- [Node.js](https://nodejs.org) version **18.17.1 or higher**
  - Check your version: `node --version`
  - Download from: https://nodejs.org

### Step 1 — Install dependencies

Open your terminal, navigate to the project folder, and run:

```bash
cd bartram-studio
npm install
```

### Step 2 — Start the dev server

```bash
npm run dev
```

The site will open at **http://localhost:4321**

Any changes you make to files will instantly reload in the browser.

### Step 3 — Build for production (optional test)

```bash
npm run build
npm run preview
```

This builds the static site into the `dist/` folder and previews it locally.

---

## Pushing to GitHub

### Step 1 — Create a GitHub account (if you don't have one)

Go to https://github.com and sign up. It's free.

### Step 2 — Create a new repository

1. Click the **+** icon in the top-right corner of GitHub → **New repository**
2. Name it `bartram-studio` (or anything you like)
3. Set it to **Private** or **Public** — either works
4. **Do NOT** check "Add a README file" (we already have one)
5. Click **Create repository**

### Step 3 — Initialize Git and push

In your terminal, from inside the `bartram-studio` folder:

```bash
# Initialize git
git init

# Stage all files
git add .

# Create the first commit
git commit -m "Initial commit — Bartram Studio website"

# Connect to your GitHub repo (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/bartram-studio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub username and password (use a Personal Access Token as your password — see https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

### Pushing future changes

Every time you make changes you want to save and deploy:

```bash
git add .
git commit -m "Brief description of what you changed"
git push
```

Cloudflare Pages will automatically rebuild and redeploy within a minute or two.

---

## Deploying to Cloudflare Pages

### Step 1 — Create a Cloudflare account

Go to https://cloudflare.com and sign up (free plan is fine).

### Step 2 — Connect your GitHub repository

1. In Cloudflare dashboard, go to **Pages** in the left sidebar
2. Click **Create a project** → **Connect to Git**
3. Authorize Cloudflare to access your GitHub account
4. Select your `bartram-studio` repository
5. Click **Begin setup**

### Step 3 — Configure build settings

| Setting | Value |
|---|---|
| **Framework preset** | Astro |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(leave blank)* |
| **Node.js version** | `18` or `20` |

> **To set the Node.js version:** In the **Environment variables** section, add:
> - Variable name: `NODE_VERSION`
> - Value: `20`

### Step 4 — Deploy

Click **Save and Deploy**. Cloudflare will build and deploy your site. This takes about 1–2 minutes.

You'll get a URL like `bartram-studio.pages.dev`. 

### Step 5 — Add a custom domain (optional)

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter `bartramstudio.com` (or your domain)
4. Follow the DNS instructions to point your domain to Cloudflare Pages

**Production branch:** `main` — every push to `main` triggers a new deployment automatically.

---

## Setting Up Decap CMS

Decap CMS lets Amanda edit products, upload photos, and manage content at `/admin` — no code required.

### Overview of how it works

1. Amanda logs in at `https://bartramstudio.com/admin`
2. She edits products through a friendly form interface
3. Decap CMS commits the changes to GitHub as markdown files
4. Cloudflare Pages detects the commit and rebuilds the site automatically (1–2 min)

### Step 1 — Enable Git Gateway in Cloudflare Pages

Decap CMS uses Cloudflare's built-in identity and Git Gateway — but actually, for the simplest setup, we'll use **Netlify Identity + Cloudflare Pages**:

> **Simpler alternative:** Use the Decap CMS `github` backend with OAuth. See below.

### Recommended: GitHub backend with OAuth App

This is the most reliable approach for Cloudflare Pages hosting.

**1. Create a GitHub OAuth App:**

- Go to: https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**
- Application name: `Bartram Studio CMS`
- Homepage URL: `https://bartramstudio.com`
- Authorization callback URL: `https://api.netlify.com/auth/done`
- Click **Register application**, then note your **Client ID** and **Client Secret**

**2. Deploy an auth proxy (one-time setup):**

The easiest free option is to use [Netlify's auth server](https://decapcms.org/docs/github-backend/) just for OAuth (you still host on Cloudflare):

- Create a free Netlify account at https://netlify.com
- Deploy a simple site just to use Netlify Identity as an OAuth proxy
- OR use an open-source proxy like: https://github.com/vencax/netlify-cms-github-oauth-provider

**3. Update `public/admin/config.yml`:**

Replace the `backend` section with:

```yaml
backend:
  name: github
  repo: YOUR-USERNAME/bartram-studio
  branch: main
  base_url: https://YOUR-AUTH-PROXY.netlify.app
```

**4. Access the CMS:**

Visit `https://bartramstudio.com/admin` and log in with your GitHub account.

### Amanda's CMS Workflow

Once configured, Amanda can:

1. Go to `https://bartramstudio.com/admin`
2. Log in with GitHub
3. Click **Products** in the left sidebar
4. Click **New Product** or click an existing product to edit
5. Fill in the fields: title, price, description, status, photos, etc.
6. Click **Save** (saves as draft) or **Publish** (goes live after ~2 min rebuild)

---

## Managing Products

### Adding a product manually (without CMS)

Create a new `.md` file in `src/content/products/` named with the product slug:

```
src/content/products/my-new-product.md
```

Template:

```markdown
---
title: "Your Product Title"
slug: "your-product-title"
category: "Resin Art"
description: "A detailed description of the piece..."
price: 75
status: "available"
quantity: 1
featured: false
customOrderAvailable: true
images:
  - "/images/products/your-photo.jpg"
---
```

**Category options:** `Resin Art`, `Coastal Decor`, `Seasonal Crafts`, `Custom Pieces`

**Status options:** `available`, `pending`, `sold`

### Marking a product as sold

Change the `status` field from `available` to `sold`:

```yaml
status: "sold"
```

The product will still appear on the site with a "Sold" badge, which is great for showing your work history. If you want it removed entirely, delete the `.md` file.

### Featuring a product on the homepage

Set `featured: true` in the product's frontmatter. Up to 3 featured products will appear in the homepage section. Only available products are shown as featured.

---

## Adding Product Photos

### Where to put photos

Place all product photos in:
```
public/images/products/
```

### Naming convention

Use lowercase letters, numbers, and hyphens only:
- ✅ `sea-glass-tray-1.jpg`
- ✅ `shell-coasters-front.jpg`
- ❌ `Sea Glass Tray (1).jpg` ← spaces and parentheses cause problems

### Referencing in product files

In the product `.md` file, reference images like this:

```yaml
images:
  - "/images/products/sea-glass-tray-1.jpg"
  - "/images/products/sea-glass-tray-2.jpg"
```

The **first image** in the list is used as the thumbnail on the products grid.

### Recommended image specs

| Setting | Recommendation |
|---|---|
| **Format** | JPEG or WebP |
| **Minimum size** | 800 × 600 px |
| **Ideal size** | 1200 × 900 px |
| **Aspect ratio** | 4:3 (landscape) works best in the grid |
| **File size** | Under 500 KB per image |

To compress photos for the web, use: https://squoosh.app (free, no software to install)

---

## Customization Guide

### Updating contact info

Edit `src/layouts/Layout.astro` — update the footer email and Instagram link.

### Updating the email address for contact form

The contact form uses Cloudflare Pages Forms (or Netlify Forms if using Netlify). To receive form submissions by email:

1. In your Cloudflare Pages project, go to **Forms**
2. Configure email notifications for the `contact` form

### Changing colors

All colors are CSS custom properties in `src/styles/global.css`. The main palette:

```css
--tide-dark:   #4d7f80;   /* Primary teal — buttons, links */
--coral:       #c97b5a;   /* Accent coral — prices, highlights */
--driftwood-dk:#5c4d38;   /* Dark text */
--sand:        #f5f0e8;   /* Background panels */
```

### Adding a new category

1. Add the category name to `src/content/config.ts` in the `category` enum
2. Add it to `public/admin/config.yml` in the category widget options
3. Add a card for it in the homepage categories section (`src/pages/index.astro`)

### Changing fonts

Fonts are loaded from Google Fonts in `src/layouts/Layout.astro`. The CSS variables are:

```css
--font-display: 'Cormorant Garamond', Georgia, serif;
--font-body:    'Jost', 'Gill Sans', sans-serif;
```

Change the Google Fonts import URL and these variables to swap fonts.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Astro 4](https://astro.build) | Static site framework |
| HTML/CSS | Templates and styling (no UI framework) |
| Markdown | Product content storage |
| [Decap CMS](https://decapcms.org) | Visual content editor for Amanda |
| [Cloudflare Pages](https://pages.cloudflare.com) | Hosting and deployment |
| [GitHub](https://github.com) | Source code and CMS Git backend |

---

## Support

Questions or issues? Open an issue on GitHub or email hello@bartramstudio.com.
