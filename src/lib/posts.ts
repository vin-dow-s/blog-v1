'use server'

import { z } from 'zod'
import slugify from 'slugify'
import { prisma } from './prisma'

const PostSchema = z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    isPublished: z.boolean().default(false),
})

export type Post = z.infer<typeof PostSchema> & {
    id?: number
    content?: string
}

export const getPosts = async () => {
    try {
        const posts = await prisma.post.findMany()

        if (!posts || posts.length === 0) {
            console.log('No posts found')
            return []
        }

        const sanitizedPosts = posts.map((post) => ({
            ...post,
            isPublished: post.isPublished ?? false,
        }))

        return sanitizedPosts
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

        const newPost = await prisma.post.create({
            data: {
                ...validatedPost,
                slug,
            },
        })

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

        const sanitizedPost = {
            ...updatedPost,
            isPublished: updatedPost.isPublished ?? false,
        }

        return sanitizedPost
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

        const sanitizedPost = {
            ...deletedPost,
            isPublished: deletedPost.isPublished ?? false,
        }

        return sanitizedPost
    } catch (error) {
        console.error('Error deleting post:', error)
        throw error
    }
}
