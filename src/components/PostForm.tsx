'use client'

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
import ReactQuill from 'react-quill'
import { useForm, useWatch } from 'react-hook-form'
import { PostFormSchema, PostFormValues } from '@/lib/schemas'
import 'react-quill/dist/quill.snow.css'
import { zodResolver } from '@hookform/resolvers/zod'

type PostFormProps = {
    onSubmit: (formData: PostFormValues) => void
    postData?: PostFormValues
    isEditing?: boolean
}

export const PostForm = ({ onSubmit, postData, isEditing }: PostFormProps) => {
    const form = useForm({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            title: postData?.title ?? '',
            category: postData?.category ?? '',
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) =>
                                        field.onChange(value)
                                    }
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
