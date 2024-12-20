import { getPosts } from '@/lib/posts'
import PostsTable from '../posts/_components/posts-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const PostsPage = async () => {
    const result = await getPosts()

    if (!result?.data) {
        notFound()
    }

    const posts = result?.data

    return (
        <section className="mx-4 rounded-lg border px-4">
            <nav className="flex items-center justify-between p-8 px-2 pb-12">
                <h2 className="text-lg font-bold">Posts</h2>
                <Button asChild>
                    <Link href="/admin/posts/create">Create a Post</Link>
                </Button>
            </nav>
            <PostsTable posts={posts} />
        </section>
    )
}

export default PostsPage
