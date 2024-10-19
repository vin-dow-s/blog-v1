'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import slugify from 'slugify'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { createPost } from '@/lib/posts'

export const FormSchema = z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    isPublished: z.boolean().optional().default(false),
})

type PostForm = z.infer<typeof FormSchema>

export default function CreatePostForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            category: '',
            description: '',
            isPublished: false,
        },
    })

    const addSlugAndDate = (formData: PostForm) => {
        const slug = slugify(formData.title, { lower: true })
        const publishedAt = new Date()

        return {
            ...formData,
            slug,
            publishedAt,
        }
    }

    async function onFormSubmit(formData: PostForm) {
        console.log('🚀 ~ onSubmit ~ formData:', formData)

        try {
            const postData = addSlugAndDate(formData)
            console.log('🚀 ~ onSubmit ~ postData:', postData)

            await createPost(postData)
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Public title of the post."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Optimised length for SEO: 50-60 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) =>
                                        field.onChange(value)
                                    } // Correctly trigger field.onChange
                                    value={field.value || ''}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">
                                            Light
                                        </SelectItem>
                                        <SelectItem value="dark">
                                            Dark
                                        </SelectItem>
                                        <SelectItem value="system">
                                            System
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Ex: Just open this it's juicy"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Short description of the post.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                        <RadioGroup
                            value={field.value ? 'published' : 'draft'}
                            onValueChange={(value) =>
                                field.onChange(value === 'published')
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="draft" id="draft" />
                                <Label htmlFor="draft">Draft</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="published"
                                    id="published"
                                />
                                <Label htmlFor="published">Published</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
