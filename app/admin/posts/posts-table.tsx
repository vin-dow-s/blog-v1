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
import PostsTableDropdown from './posts-table-dropdown'
import { useState } from 'react'
import { Post } from '@/lib/schemas'

type PostsTableProps = Readonly<{
    posts: Post[]
}>

const PostsTable = ({ posts }: PostsTableProps) => {
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
