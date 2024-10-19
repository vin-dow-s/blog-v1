import { getPosts } from '@/lib/posts'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

export default async function Home() {
    const posts = await getPosts()

    return (
        <section className="my-4 rounded-lg bg-blue-200 p-4">
            <button className="rounded-lg bg-blue-500 p-2 text-white">
                <Link href={`/admin/form`}>Create Post</Link>
            </button>
            <Table>
                <TableCaption>Your posts.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Published Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.title}>
                            <TableCell className="font-medium">
                                {post.title}
                            </TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>{post.description}</TableCell>
                            <TableCell>{post.publishedAt.getTime()}</TableCell>
                            <TableCell>{post.isPublished}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
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
    )
}
