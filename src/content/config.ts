import { defineCollection, z } from 'astro:content';

// ── Products ────────────────────────────────────────────────────────────────
const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['Resin Art', 'Coastal Decor', 'Seasonal Crafts', 'Custom Pieces']),
    description: z.string(),
    price: z.number(),
    status: z.enum(['available', 'pending', 'sold']),
    quantity: z.number().default(1),
    featured: z.boolean().default(false),
    customOrderAvailable: z.boolean().default(false),
    images: z.array(z.string()).default([]),
    videos: z.array(z.string()).default([]),
  }),
});

// ── Site content (home / about / contact wording) ───────────────────────────
const site = defineCollection({
  type: 'content',
  schema: z.object({

    // ── Home ──
    heroEyebrow:        z.string().optional(),
    heroTitle:          z.string().optional(),
    heroTitleEmphasis:  z.string().optional(),
    heroLead:           z.string().optional(),
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

    // ── About ──
    pageEyebrow:            z.string().optional(),
    pageTitle:              z.string().optional(),
    pageIntro:              z.string().optional(),
    introEyebrow:           z.string().optional(),
    introTitle:             z.string().optional(),
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

    // ── Contact ──
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

  }),
});

export const collections = { products, site };
