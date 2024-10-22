import { getPosts } from '@/lib/posts'
import PostsTable from './posts-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const PostsPage = async () => {
    const result = await getPosts()

    if (!result) {
        console.error('Error fetching posts:', result)
        return <p>Error fetching posts. Please try again later.</p>
    }

    // Get the actual posts from the result
    const posts = result.data

    // Handle case where no posts are found
    if (!posts) {
        return <p>No posts found.</p>
    }

    return (
        <section className="my-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <Button asChild>
                    <Link href="/admin/posts/create">Create a Post</Link>
                </Button>
            </nav>
            <h3 className="text-lg">Posts</h3>
            <PostsTable posts={posts} />
        </section>
    )
}

export default PostsPage
