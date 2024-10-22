'use client'

import { PostForm } from '@/components/PostForm'
import { Button } from '@/components/ui/button'
import { getPostById, updatePost } from '@/lib/posts'
import { Post, PostFormValues } from '@/lib/schemas'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditPostPage = ({
    params,
}: Readonly<{
    params: { id: number }
}>) => {
    const [postData, setPostData] = useState<Post>()
    const router = useRouter()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const result = await getPostById(Number(params.id))

                if (!result?.data) {
                    router.push('/admin/posts')
                    return
                }

                setPostData(result.data)
            } catch (error) {
                console.error('Error fetching post:', error)
            }
        }

        fetchPost()
    }, [params.id, router])

    const handleFormSubmit = async (formData: PostFormValues) => {
        if (!postData) return

        try {
            await updatePost(postData.id, formData)
            router.push('/admin/posts')
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    if (!postData) {
        return <p>Loading post...</p>
    }

    return (
        <section className="my-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
            <h3>Edit Post</h3>
            <PostForm
                onSubmit={handleFormSubmit}
                postData={postData}
                isEditing
            />
        </section>
    )
}

export default EditPostPage
