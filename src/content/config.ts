import { defineCollection, z } from 'astro:content';

// Reusable: empty string (site default) or one of the five CMS-selectable background values
const bgEnum = z.union([
  z.literal(''),
  z.enum(['soft-shell', 'sea-glass', 'resin-amber', 'shell-pink', 'driftwood']),
]).optional();

// Approved Bartram Studio palette names selectable as a Category's accent colour
const categoryAccentEnum = z.enum([
  'sea-glass',
  'deep-tide',
  'resin-amber',
  'shell-pink',
  'driftwood',
]);

// ── Categories ────────────────────────────────────────────────────────────────
const categories = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),                    // displayed throughout the site
    categoryId: z.string(),              // stable identifier — products reference this; does NOT auto-update from name
                                           // (named categoryId, not slug — Astro reserves `slug` in content collection schemas)
    description: z.string().optional(),  // short description, used later on the homepage
    categoryIcon: z.string(), // curated emoji, chosen from a Decap select dropdown; kept as a plain
                               // string (not a strict enum) for backward compatibility and future flexibility
    categoryAccent: categoryAccentEnum,
    featuredImage: z.string().optional(), // not used yet — future category landing pages
    homepageOrder: z.number().default(0), // controls homepage ordering later
    showOnHomepage: z.boolean().default(false), // used later
    active: z.boolean().default(true),    // marks a category as retired; existing products may keep
                                           // referencing it, and it may still appear in the CMS picker
                                           // (Decap's relation widget does not auto-filter by this field)
  }),
});

// ── Products ────────────────────────────────────────────────────────────────
const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Stores a category's categoryId for newly-edited products (via the CMS relation widget).
    // Kept as a plain string, NOT an enum or reference, so that legacy product files
    // still containing old display-name values (e.g. "Resin Art", "Coastal Decor")
    // continue to build successfully. Pages resolve this value (categoryId or legacy
    // name) to a display name at render time — see resolveCategoryName() in the page files.
    // Existing products keep working as-is until Amanda manually reassigns them
    // to a managed category through the CMS.
    category: z.string(),
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
    profileImage:           z.string().optional(),  // about page portrait photo
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
    secondaryTextTone: z.enum(['soft', 'medium', 'dark']).default('soft'),
  }),
});

export const collections = { products, categories, site, brand };
