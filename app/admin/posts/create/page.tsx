'use client'

import { useRouter } from 'next/navigation'
import slugify from 'slugify'
import { createPost } from '@/lib/posts'
import { PostForm } from '@/components/PostForm'
import { PostFormValues } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CreatePostPage = () => {
    const router = useRouter()

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

            router.push('/admin/posts')
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    return (
        <section className="my-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
            <h3>Create a Post</h3>
            <PostForm onSubmit={handleFormSubmit} />
        </section>
    )
}

export default CreatePostPage
