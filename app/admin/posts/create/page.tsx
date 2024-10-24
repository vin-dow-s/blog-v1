import { CreatePostFormWrapper } from '@/components/PostForm'
import { getCategories } from '@/lib/categories'
import { notFound } from 'next/navigation'

const CreatePostPage = async () => {
    const result = await getCategories()

    if (!result?.data) {
        notFound()
    }

    const categories = result?.data

    return <CreatePostFormWrapper categories={categories} />
}

export default CreatePostPage
