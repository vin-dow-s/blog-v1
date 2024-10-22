import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Blog Test',
    description: 'This is a Blog Test',
}

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html lang="en" className="h-full">
            <body
                className={cn(
                    `${geistSans.variable} ${geistMono.variable} antialiased`,
                )}
            >
                <Header />
                <main className="mx-auto px-4">{children}</main>
                <Footer />
            </body>
        </html>
    )
}

export default RootLayout
