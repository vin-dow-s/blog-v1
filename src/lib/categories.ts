'use server'

import { prisma } from './prisma'
import { actionClient } from './safe-action'
import { Category, CategorySchema } from './schemas'

export const getCategories = actionClient.action(async () => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { posts: true },
                },
            },
        })

        if (!categories || categories.length === 0) {
            console.log('No category found')
            return []
        }

        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            postCount: category._count.posts,
        }))
    } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
    }
})

export const createCategory = actionClient
    .schema(CategorySchema)
    .action(async ({ parsedInput }) => {
        try {
            const newCategory = await prisma.category.create({
                data: parsedInput,
            })

            return newCategory
        } catch (error) {
            console.error('Error creating category:', error)
            throw error
        }
    })

export const updateCategory = async (categoryData: Partial<Category>) => {
    try {
        const validatedCategory = CategorySchema.partial().parse(categoryData)

        const updatedCategory = await prisma.category.update({
            where: { id: validatedCategory.id },
            data: validatedCategory,
        })

        return updatedCategory
    } catch (error) {
        console.error('Error updating category:', error)
        throw error
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const deletedCategory = await prisma.category.delete({
            where: { id },
        })

        return deletedCategory
    } catch (error) {
        console.error('Error deleting category:', error)
        throw error
    }
}
