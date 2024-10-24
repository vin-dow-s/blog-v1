import { Button } from '@/components/ui/button'
import { getPostById } from '@/lib/posts'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import parse from 'html-react-parser'
import testImage from '../../../public/assets/test.png'

const PostOverviewPage = async ({
    params,
}: Readonly<{
    params: { id: number }
}>) => {
    const postId = Number(params.id)
    const result = await getPostById(postId)

    if (!result?.data) {
        notFound()
    }

    const post = result?.data

    return (
        <section className="mx-4 rounded-lg border px-4">
            <nav className="flex items-center justify-between p-8 px-2 pb-12">
                <h2 className="text-lg font-bold">Post Overview</h2>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
            <div className="prose px-2">
                <div>
                    <p className="text-xs text-muted-foreground">
                        {post?.publishedAt.toLocaleDateString()}
                        {post?.isPublished ? (
                            <span> - Published</span>
                        ) : (
                            <span> - DRAFT</span>
                        )}
                    </p>
                </div>
                <h1>{post?.title}</h1>
                <Image
                    src={testImage}
                    alt={'Test Image'}
                    width={250}
                    height={250}
                />
                <p>Category: {post?.category?.name}</p>
                <p>Description: {post?.description}</p>
                {post?.content && (
                    <div className="prose">Content: {parse(post?.content)}</div>
                )}
            </div>
        </section>
    )
}

export default PostOverviewPage
