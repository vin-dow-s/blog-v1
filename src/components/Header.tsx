import Link from 'next/link'
import { buttonVariants } from './ui/button'

export const Header = () => {
    return (
        <header className="m-4 flex items-center rounded-lg border p-4">
            <nav className="flex w-full items-center">
                <Link href="/" className="font-mono">
                    <span className="sr-only">Blog Test Home</span>{' '}
                    <h1>Blog Test</h1>{' '}
                </Link>
                <div className="ml-auto">
                    <Link
                        className={buttonVariants({ variant: 'outline' })}
                        href="/contact"
                    >
                        Contact
                    </Link>
                </div>
            </nav>
        </header>
    )
}
