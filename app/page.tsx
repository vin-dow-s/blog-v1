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
        /*{' '}
            <div className="">
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
                            <CardDescription>
                                {post.description}
                            </CardDescription>
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
            </div>{' '}
            */
        <section className="my-4 grid grid-cols-4 rounded-lg bg-blue-500 p-4">
            <article className="m-4 w-fit">
                <Card key={1}>
                    <CardHeader>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                {new Date().toLocaleDateString()}
                                <span> - DRAFT</span>
                            </p>
                        </div>
                        <p>Design</p>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>This is a title</CardTitle>
                        <CardDescription>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quidem asperiores impedit possimus,
                            repudiandae deleniti aliquam quam nostrum molestias
                            veniam suscipit vel rem voluptates.
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Link
                            className="text-blue-500 hover:underline"
                            href={''}
                        >
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            </article>
            <article className="m-4 w-fit">
                <Card key={2}>
                    <CardHeader>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                {new Date().toLocaleDateString()}
                                <span> - DRAFT</span>
                            </p>
                        </div>
                        <p>Design</p>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>This is a title</CardTitle>
                        <CardDescription>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quidem asperiores impedit possimus,
                            repudiandae deleniti aliquam quam nostrum molestias
                            veniam suscipit vel rem voluptates.
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Link
                            className="text-blue-500 hover:underline"
                            href={''}
                        >
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            </article>
            <article className="m-4 w-fit">
                <Card key={3}>
                    <CardHeader>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                {new Date().toLocaleDateString()}
                                <span> - DRAFT</span>
                            </p>
                        </div>
                        <p>Design</p>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>This is a title</CardTitle>
                        <CardDescription>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quidem asperiores impedit possimus,
                            repudiandae deleniti aliquam quam nostrum molestias
                            veniam suscipit vel rem voluptates.
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Link
                            className="text-blue-500 hover:underline"
                            href={''}
                        >
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            </article>
            <article className="m-4 w-fit">
                <Card key={4}>
                    <CardHeader>
                        <div>
                            <p className="text-xs text-muted-foreground">
                                {new Date().toLocaleDateString()}
                                <span> - DRAFT</span>
                            </p>
                        </div>
                        <p>Design</p>
                    </CardHeader>
                    <CardContent>
                        <CardTitle>This is a title</CardTitle>
                        <CardDescription>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quidem asperiores impedit possimus,
                            repudiandae deleniti aliquam quam nostrum molestias
                            veniam suscipit vel rem voluptates.
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Link
                            className="text-blue-500 hover:underline"
                            href={''}
                        >
                            Read more
                        </Link>
                    </CardFooter>
                </Card>
            </article>
        </section>
    )
}
