'use client'

import slugify from 'slugify'
import { Button } from '@/components/ui/button'
import { createPost } from '@/lib/posts'
import Link from 'next/link'
import { PostForm } from '@/components/PostForm'
import { PostFormValues } from '@/lib/schemas'

export default function CreatePostForm() {
    const addSlugAndDate = (formData: PostFormValues) => {
        const slug = slugify(formData.title, { lower: true })
        const publishedAt = new Date()

        return {
            ...formData,
            slug,
            publishedAt,
        }
    }

    const handleFormSubmit = async (formData: PostFormValues) => {
        try {
            const postData = addSlugAndDate(formData)

            await createPost(postData)
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    return (
        <section className="my-4 rounded-lg border p-4">
            <div className="mb-8">
                <Button
                    asChild
                    variant="secondary"
                    className="rounded-lg text-black"
                >
                    <Link href={`/admin`}>Back to posts</Link>
                </Button>
            </div>
            <PostForm onSubmit={handleFormSubmit} />
        </section>
    )
}
