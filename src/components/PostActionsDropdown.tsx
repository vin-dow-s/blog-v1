'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { deletePost, Post, updatePost } from '@/lib/posts'

type PostActionsDropdownProps = Readonly<{
    post: Post
    onStatusChange: (updatedPost: Post) => void
    onPostDelete: (deletedPost: Post) => void
}>

export default function PostActionsDropdown({
    post,
    onStatusChange,
    onPostDelete,
}: PostActionsDropdownProps) {
    const handleStatusChange = async () => {
        try {
            const updatedPost = await updatePost(post.slug, {
                isPublished: !post.isPublished,
            })
            onStatusChange(updatedPost)
        } catch (error) {
            console.error('Error updating post status:', error)
        }
    }

    const handleDeletePost = async () => {
        try {
            const deletedPost = await deletePost(post.slug)
            onPostDelete(deletedPost)
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleStatusChange}>
                    {post.isPublished ? 'Unpublish' : 'Publish'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDeletePost}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
