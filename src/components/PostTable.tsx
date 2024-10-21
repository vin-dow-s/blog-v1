'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { PostActionsDropdown } from '@/components/PostActionsDropdown'
import { useState } from 'react'
import { Post } from '@/lib/schemas'

type PostTableProps = Readonly<{
    posts: Post[]
}>

export const PostTable = ({ posts }: PostTableProps) => {
    const [postList, setPostList] = useState(posts)

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
            <TableCaption>Your posts.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Publication Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {postList.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell>{post.id}</TableCell>
                        <TableCell className="font-medium">
                            {post.title}
                        </TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{post.description}</TableCell>
                        <TableCell>
                            {post.publishedAt
                                .toUTCString()
                                .split(' ')
                                .slice(1, 4)
                                .join(' ')}
                        </TableCell>
                        <TableCell>
                            {post.isPublished ? 'Published' : 'Draft'}
                        </TableCell>
                        <TableCell>
                            <PostActionsDropdown
                                post={post}
                                onStatusChange={handleStatusChange}
                                onPostDelete={handleDeletePost}
                            />{' '}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
