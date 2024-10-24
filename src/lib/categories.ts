'use server'

import { prisma } from './prisma'
import { actionClient } from './safe-action'

export const getCategories = actionClient.action(async () => {
    try {
        const categories = await prisma.category.findMany()

        if (!categories || categories.length === 0) {
            console.log('No category found')
            return []
        }

        return categories
    } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
    }
})
