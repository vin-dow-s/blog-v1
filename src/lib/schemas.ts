import { z } from 'zod'

export const PostFormSchema = z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    content: z.string(),
    isPublished: z.boolean().default(false),
})

export type PostFormValues = z.infer<typeof PostFormSchema>

export const PostSchema = z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    description: z.string(),
    content: z.string(),
    publishedAt: z.coerce.date(),
    isPublished: z.boolean().default(false),
})

export type Post = z.infer<typeof PostSchema> & {
    id: number
}
