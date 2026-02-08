'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ReviewEntry() {
  const router = useRouter()
  const [code, setCode] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = code.includes('/') ? code.split('/').pop() : code
    if (id) {
      router.push(`/c/${id}`)
    }
  }

  return (
    <div className="animate-fade-in pt-8">
      <div className="text-center mb-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6">
          Enter Code
        </p>
        <h1 className="font-serif text-3xl font-light text-stone-900 mb-3">
          Access Your<br />Checkpoint
        </h1>
        <p className="text-stone-500 text-sm">
          Paste the link or code you received.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full px-4 py-4 border-2 border-stone-300 bg-white text-center text-lg text-stone-900 placeholder-stone-400 mb-4"
          placeholder="Paste link or code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          disabled={!code}
          className="w-full py-4 bg-stone-900 text-white font-medium tracking-wide hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          CONTINUE
        </button>
      </form>
      
      <Link
        href="/"
        className="block w-full py-4 mt-4 text-center text-sm text-stone-500 hover:text-stone-900 transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  )
}
