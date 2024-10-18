import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { getPosts } from '@/lib/posts'
import Image from 'next/image'
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
                        <Image src={''} alt={''} width={250} height={250} />
                        <p>Category {post.category}</p>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>Title {post.title}</CardTitle>
                        <CardDescription>{post.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Link
                            className="text-blue-500 hover:underline"
                            href={`/posts/${post.slug}`}
                        >
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
