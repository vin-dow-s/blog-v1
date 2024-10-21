'use client'

import { PostForm } from '@/components/PostForm'
import { getPost, updatePost } from '@/lib/posts'
import { Post, PostFormValues } from '@/lib/schemas'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditPost({
    params,
}: Readonly<{
    params: { slug: string }
}>) {
    const [postData, setPostData] = useState<Post>()
    const router = useRouter()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPost(params.slug)

                if (!post) {
                    router.push('/admin')
                    return
                }

                setPostData(post)
            } catch (error) {
                console.error('Error fetching post:', error)
            }
        }

        fetchPost()
    }, [params.slug, router])

    const handleFormSubmit = async (formData: PostFormValues) => {
        if (!postData) return

        try {
            await updatePost(postData.id, formData)
            router.push('/admin')
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    if (!postData) {
        return <p>Loading post...</p>
    }

    return (
        <section className="my-4 rounded-lg border p-4">
            <PostForm
                onSubmit={handleFormSubmit}
                postData={postData}
                isEditing
            />
        </section>
    )
}
