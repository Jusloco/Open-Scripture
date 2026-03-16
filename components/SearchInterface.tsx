'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { BookData } from '@/lib/types'

interface SearchInterfaceProps {
  data: BookData
}

interface SearchResult {
  verseRef: string
  chapter: number
  verse: number
  text: string
  confidence: string
  matchType: 'reference' | 'text' | 'greek' | 'english'
  matchSnippet: string
}

function highlight(text: string, query: string): string {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text.slice(0, 80)
  const start = Math.max(0, idx - 20)
  const end = Math.min(text.length, idx + query.length + 40)
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
}

const CONFIDENCE_COLORS: Record<string, string> = {
  green: 'text-emerald-700',
  yellow: 'text-amber-700',
  red: 'text-red-600',
}

const CONFIDENCE_LABELS: Record<string, string> = {
  green: 'Universally attested',
  yellow: 'Significant variant',
  red: 'Later addition',
}

export default function SearchInterface({ data }: SearchInterfaceProps) {
  const [query, setQuery] = useState('')

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []

    const out: SearchResult[] = []

    for (const [key, verse] of Object.entries(data.key_verses)) {
      const parts = key.split(':')
      const chapter = parseInt(parts[0])
      const verseNum = parseInt(parts[1])

      // Reference match (e.g. "1:1", "john 1", "3:16")
      if (
        key.includes(q) ||
        `john ${key}`.includes(q) ||
        verse.reference.toLowerCase().includes(q)
      ) {
        out.push({
          verseRef: key,
          chapter,
          verse: verseNum,
          text: verse.text,
          confidence: verse.confidence,
          matchType: 'reference',
          matchSnippet: verse.reference,
        })
        continue
      }

      // English verse text match
      if (verse.text.toLowerCase().includes(q)) {
        out.push({
          verseRef: key,
          chapter,
          verse: verseNum,
          text: verse.text,
          confidence: verse.confidence,
          matchType: 'text',
          matchSnippet: highlight(verse.text, q),
        })
        continue
      }

      // Greek word match
      if (verse.greek_words) {
        const greekMatch = verse.greek_words.find(w =>
          w.greek.toLowerCase().includes(q) || w.english.toLowerCase().includes(q)
        )
        if (greekMatch) {
          out.push({
            verseRef: key,
            chapter,
            verse: verseNum,
            text: verse.text,
            confidence: verse.confidence,
            matchType: greekMatch.greek.toLowerCase().includes(q) ? 'greek' : 'english',
            matchSnippet: `${greekMatch.greek} = "${greekMatch.english}"`,
          })
          continue
        }
      }

      // Summary match
      if (verse.plain_english_summary.toLowerCase().includes(q)) {
        out.push({
          verseRef: key,
          chapter,
          verse: verseNum,
          text: verse.text,
          confidence: verse.confidence,
          matchType: 'text',
          matchSnippet: highlight(verse.plain_english_summary, q),
        })
      }
    }

    return out
  }, [query, data])

  const matchTypeLabel: Record<string, string> = {
    reference: 'Reference',
    text: 'Verse text',
    greek: 'Greek word',
    english: 'English gloss',
  }

  return (
    <div>
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search verses, Greek words, or topics…"
          autoFocus
          className="w-full rounded-xl bg-white border border-zinc-300 px-5 py-4 text-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-700/50 focus:ring-1 focus:ring-amber-700/20"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 text-xl"
          >
            ×
          </button>
        )}
      </div>

      {/* Examples */}
      {!query && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-zinc-400">Try:</span>
          {['I am', 'Λόγος', 'resurrection', '1:1', 'light', 'Abraham', 'begotten'].map(ex => (
            <button
              key={ex}
              onClick={() => setQuery(ex)}
              className="text-xs px-3 py-1 rounded-full border border-zinc-300 text-zinc-500 hover:border-amber-700/50 hover:text-amber-700 transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {query.length >= 2 && (
        <div className="mt-6">
          {results.length === 0 ? (
            <p className="text-zinc-500 text-center py-12">
              No results for &ldquo;{query}&rdquo; — try a different term
            </p>
          ) : (
            <>
              <p className="text-xs text-zinc-500 mb-4">
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
              <div className="space-y-3">
                {results.map(r => (
                  <Link
                    key={r.verseRef}
                    href={`/john/${r.chapter}/${r.verse}`}
                    className="block rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                          John {r.verseRef}
                        </span>
                        <span className={`text-xs ${CONFIDENCE_COLORS[r.confidence]}`}>
                          {CONFIDENCE_LABELS[r.confidence]}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 whitespace-nowrap">
                        {matchTypeLabel[r.matchType]}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 italic leading-relaxed">
                      {r.matchType === 'greek' || r.matchType === 'english'
                        ? r.matchSnippet
                        : `"${r.matchSnippet}"`}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
