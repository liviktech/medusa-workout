import { z } from 'zod';

export const PostAdminCreateBrand = z.object({
    name: z.string(),
    description: z.string().optional(),
    logo: z.string().optional(),
    website: z.string().optional(),
    slug: z.string().optional(),
    active: z.boolean().default(true)
})

