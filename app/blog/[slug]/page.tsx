import { getPostBySlug } from '@/lib/posts'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import parse from 'html-react-parser'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import testImage from '../../public/assets/test.png'

const PostPage = async ({
    params,
}: Readonly<{
    params: { slug: string }
}>) => {
    const result = await getPostBySlug(params.slug)

    if (!result?.data) {
        notFound()
    }

    const post = result?.data

    return (
        <section className="rounded-lg border p-4">
            <Button asChild variant="secondary">
                <Link href="/blog">Back to Posts</Link>
            </Button>
            <div className="prose prose-sm px-2 lg:prose-lg">
                <div>
                    <p className="text-xs text-muted-foreground">
                        {post?.publishedAt.toLocaleDateString()}
                    </p>
                </div>
                <h1>{post?.title}</h1>
                <Image
                    src={testImage}
                    alt={'Test image'}
                    width={250}
                    height={250}
                />
                <p>Category {post?.category?.name}</p>
                <p>{post?.description}</p>
                {post?.content && (
                    <div className="prose">Content: {parse(post?.content)}</div>
                )}
            </div>
        </section>
    )
}

export default PostPage
