import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import slugify from 'slugify'

const PostSchema = z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    isPublished: z.boolean().optional().default(false),
})

type Post = z.infer<typeof PostSchema> & {
    content?: string
}

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
    }
}

export const getPost = async (slug: string) => {
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
        })

        if (!post) {
            console.log('Post not found')
            return null
        }

        return post
    } catch (error) {
        console.error('Error fetching post by ID:', error)
        throw error
    }
}

export const createPost = async (postData: Post) => {
    try {
        const validatedPost = PostSchema.parse(postData)
        const slug = slugify(validatedPost.title, { lower: true })
        console.log('🚀 ~ createPost ~ slug:', slug)

        const newPost = await prisma.post.create({
            data: {
                ...validatedPost,
                slug,
            },
        })
        console.log('🚀 ~ createPost ~ newPost:', newPost)

        return newPost
    } catch (error) {
        console.error('Error creating post:', error)
        throw error
    }
}

export const updatePost = async (slug: string, postData: Partial<Post>) => {
    try {
        const validatedPost = PostSchema.partial().parse(postData)

        const updatedPost = await prisma.post.update({
            where: { slug },
            data: validatedPost,
        })
        console.log('🚀 ~ updatePost ~ updatedPost:', updatedPost)

        return updatedPost
    } catch (error) {
        console.error('Error updating post:', error)
        throw error
    }
}

export const deletePost = async (slug: string) => {
    try {
        const deletedPost = await prisma.post.delete({
            where: { slug },
        })

        return deletedPost
    } catch (error) {
        console.error('Error deleting post:', error)
        throw error
    }
}
