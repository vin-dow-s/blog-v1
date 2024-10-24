import { z } from 'zod'

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

export const PostSchema = z.object({
    title: z.string(),
    slug: z.string(),
    categoryId: z.number(),
    description: z.string(),
    content: z.string(),
    publishedAt: z.coerce.date(),
    isPublished: z.boolean().default(false),
})

export type Post = z.infer<typeof PostSchema> & {
    id: number
    category?: Category
}

export const PostFormSchema = z.object({
    title: z.string(),
    categoryId: z.number(),
    description: z.string(),
    content: z.string(),
    isPublished: z.boolean().default(false),
})

export type PostFormValues = z.infer<typeof PostFormSchema>
