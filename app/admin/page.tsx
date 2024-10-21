import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import { PostTable } from '@/components/PostTable'
import { Button } from '@/components/ui/button'

export default async function Home() {
    const posts = await getPosts()

    return (
        <section className="my-4 rounded-lg border p-4">
            <div className="mb-8 flex justify-start">
                <Button asChild>
                    <Link href={`/admin/create`}>Create Post</Link>
                </Button>
            </div>
            <PostTable posts={posts} />
        </section>
    )
}
