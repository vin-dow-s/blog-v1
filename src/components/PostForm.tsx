'use client'

import ReactQuill from 'react-quill'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import DOMPurify from 'dompurify'
import 'react-quill/dist/quill.snow.css'
import slugify from 'slugify'
import { Button } from './ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import { Category, PostFormSchema, PostFormValues } from '@/lib/schemas'
import { quillFormats, quillModules } from '@/lib/quill-config'
import { createPost, updatePost } from '@/lib/posts'

type CreatePostFormWrapperProps = {
    categories: Category[]
}

export const CreatePostFormWrapper = ({
    categories,
}: CreatePostFormWrapperProps) => {
    const router = useRouter()

    const addSlugAndDate = (formData: PostFormValues) => {
        const slug = slugify(formData.title, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
            trim: true,
        })
        const publishedAt = new Date()

        return {
            ...formData,
            slug,
            publishedAt,
        }
    }

    const handleFormSubmit = async (formData: PostFormValues) => {
        try {
            const postData = addSlugAndDate(formData)

            await createPost(postData)

            router.push('/admin/posts')
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    return (
        <section className="mx-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between p-4 px-2 pb-12">
                <h2 className="text-lg font-bold">Create a Post</h2>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
            <PostForm onSubmit={handleFormSubmit} categories={categories} />
        </section>
    )
}

type EditPostFormWrapperProps = {
    postData: PostFormValues
    postId: number
    categories: Category[]
}

export const EditPostFormWrapper = ({
    postData,
    postId,
    categories,
}: EditPostFormWrapperProps) => {
    const router = useRouter()

    const handleFormSubmit = async (formData: PostFormValues) => {
        try {
            const sanitizedContent = DOMPurify.sanitize(formData.content)
            const sanitizedFormData = { ...formData, content: sanitizedContent }

            await updatePost(postId, sanitizedFormData)

            router.push('/admin/posts')
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    return (
        <section className="mx-4 rounded-lg border p-4">
            <nav className="flex items-center justify-between p-4 px-2 pb-12">
                <h2 className="text-lg font-bold">Edit Post</h2>
                <Button asChild variant="secondary">
                    <Link href="/admin/posts">Back to Posts</Link>
                </Button>
            </nav>
            <PostForm
                onSubmit={handleFormSubmit}
                postData={postData}
                categories={categories}
                isEditing
            />
        </section>
    )
}

type PostFormProps = {
    onSubmit: (formData: PostFormValues) => void
    postData?: PostFormValues
    categories?: Category[]
    isEditing?: boolean
}

export const PostForm = ({
    onSubmit,
    postData,
    categories,
    isEditing,
}: PostFormProps) => {
    const form = useForm({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            title: postData?.title ?? '',
            categoryId: postData?.categoryId ?? 1,
            description: postData?.description ?? '',
            content: postData?.content ?? '',
            isPublished: postData?.isPublished ?? false,
        },
    })

    const titleLength =
        useWatch({
            control: form.control,
            name: 'title',
        })?.length || 0

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-2"
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
                                <span
                                    className={
                                        titleLength >= 50 && titleLength <= 60
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }
                                >
                                    {titleLength} characters.
                                </span>{' '}
                                Optimised length for SEO: 50-60 characters.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(Number(value))
                                    }}
                                    value={String(field.value)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={String(category.id)}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
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
                                Short description of the post for the card
                                overview.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={() => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <ReactQuill
                                    theme="snow"
                                    value={form.watch('content')}
                                    onChange={(value) =>
                                        form.setValue('content', value)
                                    }
                                    modules={quillModules}
                                    formats={quillFormats}
                                    className="rounded-md bg-transparent"
                                />
                            </FormControl>
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
                <Button type="submit">
                    {isEditing ? 'Update Post' : 'Create Post'}
                </Button>
                <Button variant="secondary" type="reset">
                    Reset
                </Button>
            </form>
        </Form>
    )
}
