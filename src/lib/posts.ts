'use server'

import { prisma } from './prisma'
import { actionClient } from './safe-action'
import { Post, PostSchema } from './schemas'
import { z } from 'zod'

export const getPosts = actionClient.action(async () => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                category: true,
            },
        })

        if (!posts || posts.length === 0) {
            console.log('No posts found')
            return []
        }

        return posts
    } catch (error) {
        console.error('Error fetching posts:', error)
        throw error
    }
})

export const getPublishedPosts = actionClient.action(async () => {
    try {
        const posts = await prisma.post.findMany({
            where: { isPublished: true },
            include: {
                category: true,
            },
        })

        if (!posts || posts.length === 0) {
            console.log('No posts found')
            return []
        }

        return posts
    } catch (error) {
        console.error('Error fetching published posts:', error)
        throw error
    }
})

export const getPostById = actionClient
    .schema(z.number())
    .action(async ({ parsedInput }) => {
        const id = parsedInput

        try {
            const post = await prisma.post.findUnique({
                where: { id },
                include: {
                    category: true,
                },
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
    })

export const getPostBySlug = actionClient
    .schema(z.string())
    .action(async ({ parsedInput }) => {
        const slug = parsedInput

        try {
            const post = await prisma.post.findUnique({
                where: { slug },
                include: {
                    category: true,
                },
            })

            if (!post) {
                console.log('Post not found')
                return null
            }

            return post
        } catch (error) {
            console.error('Error fetching post by slug:', error)
            throw error
        }
    })

export const createPost = actionClient
    .schema(PostSchema)
    .action(async ({ parsedInput }) => {
        try {
            const newPost = await prisma.post.create({
                data: parsedInput,
            })

            return newPost
        } catch (error) {
            console.error('Error creating post:', error)
            throw error
        }
    })

export const updatePost = async (id: number, postData: Partial<Post>) => {
    try {
        const validatedPost = PostSchema.partial().parse(postData)

        const updatedPost = await prisma.post.update({
            where: { id },
            data: validatedPost,
            include: { category: true },
        })

        return updatedPost
    } catch (error) {
        console.error('Error updating post:', error)
        throw error
    }
}

export const deletePost = async (id: number) => {
    try {
        const deletedPost = await prisma.post.delete({
            where: { id },
        })

        return deletedPost
    } catch (error) {
        console.error('Error deleting post:', error)
        throw error
    }
}
