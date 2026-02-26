import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
export const metadata: Metadata = {
  title: 'Acceptance Checkpoint | themissinga.org',
  description: 'Ensure goals are genuinely accepted — not just assigned.',
  icons: {
    icon: '/favicon.svg',
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">
        <header className="p-8 flex items-center justify-between">
          <Link href="/">
            <p className="font-serif text-lg text-stone-900 border-l-4 border-amber-500 pl-3">
              themissing<span className="font-semibold text-amber-600">A</span>.org
            </p>
          </Link>
          <Link href="/demo" className="text-sm font-medium tracking-wider text-amber-600 hover:text-white border-2 border-amber-500 hover:bg-amber-500 px-4 py-2 transition-colors">
            DEMO
          </Link>
        </header>
        <main className="max-w-md mx-auto px-6 pb-12">
          {children}
        </main>
      </body>
    </html>
  )
}
