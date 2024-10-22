import { getPostById } from '@/lib/posts'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function RoutePage(props: { params: { slug: string } }) {
    const post = await getPostById(props.params.slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="prose prose-sm lg:prose-lg">
            <div>
                <p className="text-xs text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString()}
                    {post.isPublished ? (
                        <span> - Published</span>
                    ) : (
                        <span> - DRAFT</span>
                    )}
                </p>
            </div>
            <h1>{post.title}</h1>
            <Image src={''} alt={''} width={250} height={250} />
            <p>Category {post.category}</p>
        </div>
    )
}
