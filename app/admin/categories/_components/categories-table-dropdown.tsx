'use client'

import { Pencil, Trash } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteCategory } from '@/lib/categories'
import { Category } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'

type CategoriesTableDropdownProps = Readonly<{
    category: Category
    onCategoryEdit: (category: Category) => void
    onCategoryDelete: (deletedCategory: Category) => void
}>

const CategoriesTableDropdown = ({
    category,
    onCategoryEdit,
    onCategoryDelete,
}: CategoriesTableDropdownProps) => {
    const handleEditCategory = () => {
        onCategoryEdit(category)
    }

    const handleDeleteCategory = async () => {
        try {
            const deletedCategory = await deleteCategory(category.id)
            onCategoryDelete(deletedCategory)
        } catch (error) {
            console.error('Error deleting category:', error)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="size-8 p-0 hover:bg-gray-200"
                >
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={handleEditCategory}
                    className="gap-4 p-2"
                >
                    <Pencil />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleDeleteCategory}
                    className="gap-4 p-2 text-red-600 focus:text-red-600"
                >
                    <Trash />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CategoriesTableDropdown
