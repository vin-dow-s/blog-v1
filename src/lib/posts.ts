import { PrismaClient } from '@prisma/client'
/* import { z } from 'zod'

const PostSchema = z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    isPublished: z.boolean().optional().default(false),
})

type Post = z.infer<typeof PostSchema> & {
    slug: string
    content: string
} */

const prisma = new PrismaClient()

export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany()
        console.log('Fetched posts array length:', posts.length)

        if (!posts || posts.length === 0) {
            console.log('No posts found')
            return []
        }

        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
        throw error
    } finally {
        await prisma.$disconnect()
    }
}
