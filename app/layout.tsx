import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Acceptance Checkpoint | themissinga.org',
  description: 'Ensure goals are genuinely accepted — not just assigned.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">
        <main className="max-w-md mx-auto px-6 py-12">
          <Link href="/" className="block mb-12">
            <p className="font-serif text-lg text-stone-900">themissinga.org</p>
          </Link>
          {children}
        </main>
      </body>
    </html>
  )
}