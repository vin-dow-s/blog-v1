'use client'

import { CategoryFormSchema, CategoryFormValues } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { createCategory, updateCategory } from '@/lib/categories'

type CategoryFormProps = {
    categoryData?: CategoryFormValues
    isEditing?: boolean
}

export const CategoryForm = ({
    categoryData,
    isEditing,
}: CategoryFormProps) => {
    const form = useForm({
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: {
            name: categoryData?.name ?? '',
        },
    })

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            if (isEditing && categoryData) {
                await updateCategory({ ...categoryData, name: data.name })
            } else {
                await createCategory(data)
            }
            alert(`${isEditing ? 'Category updated!' : 'Category created!'}`)
        } catch (error) {
            console.error('Error saving category:', error)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-2"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Name of the category."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {isEditing ? 'Update Category' : 'Create Category'}
                </Button>
            </form>
        </Form>
    )
}
