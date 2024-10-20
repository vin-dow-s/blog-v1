import Link from 'next/link'

export const Header = () => {
    return (
        <header className="m-4 flex items-center rounded-lg bg-red-500 p-4">
            <nav className="flex w-full items-center">
                <Link href="/" className="font-mono">
                    <span className="sr-only">Blog Test Home</span>{' '}
                    <h1>Blog Test</h1>{' '}
                </Link>

                <div className="ml-auto">
                    <Link href="/posts" className="text-primary">
                        Posts
                    </Link>
                </div>
            </nav>
        </header>
    )
}
