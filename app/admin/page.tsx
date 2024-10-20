import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import PostTable from '@/components/PostTable'

export default async function Home() {
    const posts = await getPosts()

    return (
        <section className="my-4 rounded-lg border p-4">
            <button className="rounded-lg bg-blue-500 p-2 text-white">
                <Link href={`/admin/form`}>Create Post</Link>
            </button>
            <PostTable posts={posts} />
        </section>
    )
}
