import { getBookData } from '@/lib/data'
import SearchInterface from '@/components/SearchInterface'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search — OpenScripture',
  description: 'Search Bible verses by reference, Greek words, or topic across the Gospel of John manuscript database.',
}

export default function SearchPage() {
  const data = getBookData()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 mb-3">Search</h1>
        <p className="text-zinc-500">
          Search by verse reference (e.g. &ldquo;3:16&rdquo;), Greek word (e.g. &ldquo;Λόγος&rdquo;), English phrase, or topic.
        </p>
      </div>

      <SearchInterface data={data} />

      {/* Ask Scholar CTA */}
      <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-700/10 border border-amber-700/20 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-900">Didn&rsquo;t find what you were looking for?</p>
          <p className="text-sm text-zinc-500 mt-0.5">
            Ask Scholar can answer questions about specific verses, manuscripts, and textual criticism concepts.
          </p>
        </div>
        <Link
          href="/ask"
          className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-700 text-white text-sm font-semibold hover:bg-amber-800 transition-colors"
        >
          Want a deeper answer? Ask Scholar
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  )
}
