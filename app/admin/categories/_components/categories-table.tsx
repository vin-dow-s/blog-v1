'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import CategoriesTableDropdown from './categories-table-dropdown'
import { Category } from '@/lib/schemas'

type CategoriesTableProps = Readonly<{
    categories: Category[]
    onEditCategory: (category: Category) => void
}>

const CategoriesTable = ({
    categories,
    onEditCategory,
}: CategoriesTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Posts in Category</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.postCount}</TableCell>
                        <TableCell>
                            <CategoriesTableDropdown
                                category={category}
                                onCategoryEdit={onEditCategory}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CategoriesTable
