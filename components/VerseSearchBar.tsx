'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function VerseSearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const parseAndNavigate = (input: string) => {
    const cleaned = input.trim().toLowerCase()
    // Match patterns like "john 3:16", "john 3 16", "3:16", "3 16"
    const fullMatch = cleaned.match(/(?:john\s+)?(\d+)[:\s]+(\d+)/)
    if (fullMatch) {
      router.push(`/john/${fullMatch[1]}/${fullMatch[2]}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    parseAndNavigate(query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Try: John 3:16 or John 1:1"
        className="w-full rounded-xl border border-zinc-300 bg-white pl-12 pr-4 py-3.5 text-zinc-900 placeholder-zinc-400 outline-none focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/20 transition-colors"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-amber-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
      >
        Verify
      </button>
    </form>
  )
}
