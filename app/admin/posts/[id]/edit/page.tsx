import { notFound } from 'next/navigation'
import { EditPostFormWrapper } from '@/components/PostForm'
import { getPostById } from '@/lib/posts'
import { getCategories } from '@/lib/categories'

const EditPostPage = async ({ params }: { params: { id: number } }) => {
    const postId = Number(params.id)

    const [postResult, categoriesResult] = await Promise.all([
        getPostById(postId),
        getCategories(),
    ])

    if (!postResult?.data || !categoriesResult?.data) {
        notFound()
    }

    const postData = postResult.data
    const categories = categoriesResult.data

    return (
        <EditPostFormWrapper
            postData={postData}
            postId={postId}
            categories={categories}
        />
    )
}

export default EditPostPage
