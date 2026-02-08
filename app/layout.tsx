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
        <header className="p-8">
          <Link href="/">
            <p className="font-serif text-lg text-stone-900 border-l-4 border-stone-900 pl-3">themissinga.org</p>
          </Link>
        </header>
        <main className="max-w-md mx-auto px-6 pb-12">
          {children}
        </main>
      </body>
    </html>
  )
}