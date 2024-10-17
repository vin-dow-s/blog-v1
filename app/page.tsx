import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { getPosts } from '@/lib/posts'
import Link from 'next/link'

export default async function Home() {
    const posts = await getPosts()

    return (
        <div>
            {posts.map((post) => (
                <Card key={post.title}>
                    <CardHeader>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                {new Date(
                                    post.publishedAt,
                                ).toLocaleDateString()}
                                {post.isPublished ? (
                                    <span> - Published</span>
                                ) : (
                                    <span> - DRAFT</span>
                                )}
                            </p>
                        </div>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.description}</CardDescription>
                    </CardHeader>

                    <CardFooter>
                        <Link
                            className="text-blue-500 hover:underline"
                            href={`/posts/${post.title}`}
                        >
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
