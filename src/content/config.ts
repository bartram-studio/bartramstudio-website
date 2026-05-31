import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'Resin Art',
      'Coastal Decor',
      'Seasonal Crafts',
      'Custom Pieces',
    ]),
    description: z.string(),
    price: z.number(),
    status: z.enum(['available', 'pending', 'sold']),
    quantity: z.number().default(1),
    featured: z.boolean().default(false),
    customOrderAvailable: z.boolean().default(false),
    images: z.array(z.string()).default([]),
  }),
});

export const collections = { products };
