import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategories } from '@/lib/categories'
import CategoriesTable from './_components/categories-table'
import { CategoryForm } from '@/components/CategoryForm'
import { Category } from '@/lib/schemas'
import { useState } from 'react'

const CategoriesPage = async () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    )

    const result = await getCategories()

    if (!result?.data) {
        notFound()
    }

    const categories = result?.data

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category)
    }

    return (
        <section className="mx-4 rounded-lg border px-4">
            <nav className="flex items-center justify-between p-8 px-2 pb-12">
                <h2 className="text-lg font-bold">Categories</h2>
                <CategoryForm
                    categoryData={selectedCategory}
                    isEditing={Boolean(selectedCategory)}
                />
                <Button asChild>
                    <Link href="/admin/categories/create">
                        Create a Category
                    </Link>
                </Button>
            </nav>
            <CategoriesTable
                categories={categories}
                onEditCategory={handleEditCategory}
            />
        </section>
    )
}

export default CategoriesPage
