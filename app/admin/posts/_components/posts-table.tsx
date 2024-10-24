'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import PostsTableDropdown from './posts-table-dropdown'
import { useState } from 'react'
import { Post } from '@/lib/schemas'
import { useRouter } from 'next/navigation'

type PostsTableProps = Readonly<{
    posts: Post[]
}>

const PostsTable = ({ posts }: PostsTableProps) => {
    const [postList, setPostList] = useState(posts)
    const router = useRouter()

    const handleRowClick = (id: number) => {
        router.push(`/admin/posts/${id}`)
    }

    const handleStatusChange = (updatedPost: Post) => {
        setPostList((prevPosts) =>
            prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p)),
        )
    }

    const handleDeletePost = (deletedPost: Post) => {
        setPostList((prevPosts) =>
            prevPosts.filter((p) => p.id !== deletedPost.id),
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="w-80">Description</TableHead>
                    <TableHead className="w-36">Publication Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {postList
                    .toSorted((a, b) => b.id - a.id)
                    .map((post) => (
                        <TableRow key={post.id}>
                            <TableCell>{post.id}</TableCell>
                            <TableCell
                                onClick={() => handleRowClick(post.id)}
                                className="cursor-pointer hover:underline"
                            >
                                {post.title}
                            </TableCell>
                            <TableCell>{post.category?.name}</TableCell>
                            <TableCell>
                                {post.description.substring(0, 40)}
                            </TableCell>
                            <TableCell>
                                {post.publishedAt.toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {post.isPublished ? 'Published' : 'Draft'}
                            </TableCell>
                            <TableCell>
                                <PostsTableDropdown
                                    post={post}
                                    onStatusChange={handleStatusChange}
                                    onPostDelete={handleDeletePost}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    )
}

export default PostsTable
