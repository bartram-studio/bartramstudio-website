import { defineCollection, z } from 'astro:content';

// Reusable: empty string (site default) or one of the five CMS-selectable background values
const bgEnum = z.union([
  z.literal(''),
  z.enum(['soft-shell', 'sea-glass', 'resin-amber', 'shell-pink', 'driftwood']),
]).optional();

// ── Products ────────────────────────────────────────────────────────────────
const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Resin Art', 'Coastal Decor', 'Seasonal Crafts', 'Custom Pieces']),
    description: z.string().optional(),                    // legacy — kept for backward compat
    descriptionParagraphs: z.array(z.string()).optional(), // new list-widget field
    price: z.number(),
    status: z.enum(['available', 'pending', 'sold']),
    quantity: z.number().default(1),
    featured: z.boolean().default(false),
    customOrderAvailable: z.boolean().default(false),
    images: z.array(z.string()).default([]),
    videos: z.array(z.string()).default([]),
  }),
});

// ── Site content (home / about / contact / shop wording + backgrounds) ───────
const site = defineCollection({
  type: 'content',
  schema: z.object({

    // ── Home wording ──
    heroEyebrow:        z.string().optional(),
    heroTitle:          z.string().optional(),
    heroTitleEmphasis:  z.string().optional(),
    heroLead:           z.string().optional(),
    heroImage:          z.string().optional(),  // optional uploaded hero visual image
    featuredEyebrow:    z.string().optional(),
    featuredTitle:      z.string().optional(),
    featuredText:       z.string().optional(),
    categoriesEyebrow:  z.string().optional(),
    categoriesTitle:    z.string().optional(),
    aboutEyebrow:       z.string().optional(),
    aboutTitle:         z.string().optional(),
    aboutText:          z.string().optional(),
    ctaTitle:           z.string().optional(),
    ctaTitleEmphasis:   z.string().optional(),
    ctaText:            z.string().optional(),
    ctaButtonText:      z.string().optional(),

    // ── About wording ──
    pageEyebrow:            z.string().optional(),
    pageTitle:              z.string().optional(),
    pageIntro:              z.string().optional(),
    introEyebrow:           z.string().optional(),
    introTitle:             z.string().optional(),
    intraParagraphs:        z.array(z.string()).optional(),
    introParagraphs:        z.array(z.string()).optional(),
    craftEyebrow:           z.string().optional(),
    craftTitle:             z.string().optional(),
    craftText:              z.string().optional(),
    processSteps:           z.array(z.object({ title: z.string(), body: z.string() })).optional(),
    valuesEyebrow:          z.string().optional(),
    valuesTitle:            z.string().optional(),
    valuesParagraphs:       z.array(z.string()).optional(),
    quoteText:              z.string().optional(),
    quoteCitation:          z.string().optional(),
    contactCtaTitle:        z.string().optional(),
    contactCtaText:         z.string().optional(),
    contactCtaButtonText:   z.string().optional(),

    // ── Contact wording ──
    formTitle:              z.string().optional(),
    formIntro:              z.string().optional(),
    email:                  z.string().optional(),
    instagramHandle:        z.string().optional(),
    instagramUrl:           z.string().optional(),
    location:               z.string().optional(),
    customOrdersTitle:      z.string().optional(),
    customOrdersParagraphs: z.array(z.string()).optional(),
    responseTime:           z.string().optional(),
    faqItems:               z.array(z.object({ question: z.string(), answer: z.string() })).optional(),

    // ── Background colour controls (shared across all site/* files) ──
    // Each page only uses the fields relevant to it; others are simply absent.
    heroBg:          bgEnum,   // home, about, contact, shop
    bandBg:          bgEnum,   // home band strip
    featuredBg:      bgEnum,   // home featured products section
    categoriesBg:    bgEnum,   // home categories section
    aboutBg:         bgEnum,   // home about strip
    ctaBg:           bgEnum,   // home CTA box
    aboutIntroBg:    bgEnum,   // about intro section
    aboutCraftBg:    bgEnum,   // about craft/process section
    aboutValuesBg:   bgEnum,   // about values section
    aboutCtaBg:      bgEnum,   // about contact CTA strip
    contactMainBg:   bgEnum,   // contact main section
    contactAccentBg: bgEnum,   // contact custom orders sidebar card
    contactMethodsBg:bgEnum,   // contact methods sidebar card
    contactFaqBg:    bgEnum,   // contact FAQ sidebar card
    shopGridBg:      bgEnum,   // shop product grid section
    shopCtaBg:       bgEnum,   // shop custom order CTA section

  }),
});

// ── Brand settings ──────────────────────────────────────────────────────────
const brand = defineCollection({
  type: 'content',
  schema: z.object({
    typographyTheme: z.enum([
      'coastal-serif',
      'clean-modern',
      'soft-handmade',
    ]).default('coastal-serif'),
  }),
});

export const collections = { products, site, brand };
