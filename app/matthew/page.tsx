import Link from 'next/link'
import { getMatthewData, getMatthewVersesByChapter } from '@/lib/matthew-data'
import ConfidenceBadge from '@/components/ConfidenceBadge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gospel of Matthew — Manuscript Overview',
  description: 'Browse all 28 chapters of the Gospel of Matthew and see the manuscript evidence for every chapter.',
}

export default function MatthewPage() {
  const book = getMatthewData()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-amber-700 font-medium mb-2">Manuscript Evidence</p>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Gospel of Matthew</h1>
        <p className="text-zinc-500 leading-relaxed max-w-2xl">
          The Gospel of Matthew is the most-quoted Gospel in the writings of the early church fathers. Below are all 28 chapters. Click any chapter to browse its verses and see the manuscript evidence.
        </p>

        {/* Book-level stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Greek MSS', value: `${book.total_greek_manuscripts.toLocaleString()}+` },
            { label: 'Latin MSS', value: `${book.total_latin_manuscripts.toLocaleString()}+` },
            { label: 'Syriac MSS', value: `${book.total_syriac_manuscripts.toLocaleString()}+` },
            { label: 'All Languages', value: `${book.total_all_languages.toLocaleString()}+` },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-zinc-200 bg-white p-4 text-center">
              <p className="text-2xl font-bold text-amber-700">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chapters grid */}
      <div className="space-y-3">
        {book.chapters.map(chapter => {
          const keyVerses = getMatthewVersesByChapter(chapter.number)
          const hasDisputed = keyVerses.some(v => v.confidence === 'red')
          const hasVariant = keyVerses.some(v => v.confidence === 'yellow')

          return (
            <Link
              key={chapter.number}
              href={`/matthew/${chapter.number}`}
              className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 hover:border-amber-700/30 hover:bg-zinc-50 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-xs text-zinc-400 font-mono">CH {String(chapter.number).padStart(2, '0')}</span>
                  <h2 className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                    Chapter {chapter.number}
                  </h2>
                  <span className="text-xs text-zinc-400">{chapter.verse_count} verses</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{chapter.summary}</p>
                {chapter.manuscripts_note && (
                  <p className="mt-2 text-xs text-amber-700/70">{chapter.manuscripts_note}</p>
                )}
              </div>

              <div className="ml-4 flex flex-col items-end gap-2">
                {hasDisputed && <ConfidenceBadge level="red" size="sm" />}
                {hasVariant && !hasDisputed && <ConfidenceBadge level="yellow" size="sm" />}
                {!hasDisputed && !hasVariant && keyVerses.length > 0 && <ConfidenceBadge level="green" size="sm" />}
                <span className="text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors">View →</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-12 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Confidence Legend</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-zinc-500"><span className="text-emerald-700 font-medium">Textually Secure</span> — Near-universal agreement</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-sm text-zinc-500"><span className="text-amber-700 font-medium">Minor Variant</span> — Small differences, no doctrinal change</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-sm text-zinc-500"><span className="text-red-600 font-medium">Bracketed</span> — Absent from earliest manuscripts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
