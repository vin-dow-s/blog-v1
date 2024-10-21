'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deletePost, updatePost } from '@/lib/posts'
import { Button } from './ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Post } from '@/lib/schemas'
import Link from 'next/link'

type PostActionsDropdownProps = Readonly<{
    post: Post
    onStatusChange: (updatedPost: Post) => void
    onPostDelete: (deletedPost: Post) => void
}>

export const PostActionsDropdown = ({
    post,
    onStatusChange,
    onPostDelete,
}: PostActionsDropdownProps) => {
    const handleStatusChange = async () => {
        try {
            const updatedPost = await updatePost(post.id, {
                isPublished: !post.isPublished,
            })
            onStatusChange(updatedPost)
        } catch (error) {
            console.error('Error updating post status:', error)
        }
    }

    const handleDeletePost = async () => {
        try {
            const deletedPost = await deletePost(post.id)
            onPostDelete(deletedPost)
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    const statusText = post.isPublished ? 'Unpublish' : 'Publish'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href={`/admin/edit/${post.slug}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleStatusChange}>
                    {statusText}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleDeletePost}
                    className="text-red-600 focus:text-red-600"
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
