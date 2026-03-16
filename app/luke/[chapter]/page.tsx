import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLukeChapterData, getLukeVersesByChapter } from '@/lib/data'
import ConfidenceBadge from '@/components/ConfidenceBadge'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ chapter: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter } = await params
  const chapterNum = parseInt(chapter)
  const data = getLukeChapterData(chapterNum)
  if (!data) return { title: 'Chapter Not Found' }
  return {
    title: `Luke Chapter ${chapterNum}`,
    description: data.summary,
  }
}

export default async function LukeChapterPage({ params }: Props) {
  const { chapter } = await params
  const chapterNum = parseInt(chapter)

  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 24) {
    notFound()
  }

  const chapterData = getLukeChapterData(chapterNum)
  if (!chapterData) notFound()

  const keyVerses = getLukeVersesByChapter(chapterNum)

  const prevChapter = chapterNum > 1 ? chapterNum - 1 : null
  const nextChapter = chapterNum < 24 ? chapterNum + 1 : null

  // Build full verse list: documented key verses + placeholders for the rest
  const documentedNums = new Set(keyVerses.map(v => v.verse))
  const allVerseNums = Array.from({ length: chapterData.verse_count }, (_, i) => i + 1)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
        <Link href="/luke" className="hover:text-zinc-600 transition-colors">Luke</Link>
        <span>/</span>
        <span className="text-zinc-500">Chapter {chapterNum}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Luke — Chapter {chapterNum}</h1>
        <p className="text-zinc-500 leading-relaxed">{chapterData.summary}</p>
        {chapterData.manuscripts_note && (
          <div className="mt-4 rounded-lg border border-amber-700/20 bg-amber-700/5 px-4 py-3">
            <p className="text-sm text-amber-700">{chapterData.manuscripts_note}</p>
          </div>
        )}
      </div>

      {/* Verse list */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4">
          {chapterData.verse_count} Verses
        </p>
        {allVerseNums.map(verseNum => {
          const isDocumented = documentedNums.has(verseNum)
          const verseData = keyVerses.find(v => v.verse === verseNum)
          const isDisputed = verseData?.bracketed

          return (
            <Link
              key={verseNum}
              href={`/luke/${chapterNum}/${verseNum}`}
              className={`group flex items-center justify-between rounded-lg border px-4 py-3 transition-all
                ${isDisputed
                  ? 'border-red-200 bg-red-50 hover:border-red-300 hover:bg-red-100/60'
                  : 'border-zinc-200 bg-white hover:border-amber-700/30 hover:bg-zinc-50'
                }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-zinc-400 w-6 text-right">{verseNum}</span>
                {isDocumented && verseData ? (
                  <div>
                    {verseData.text && (
                      <p className="text-sm text-zinc-700 leading-relaxed line-clamp-1">
                        {verseData.text}
                      </p>
                    )}
                    {!verseData.text && (
                      <p className="text-sm text-zinc-500">Luke {chapterNum}:{verseNum}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-400">Luke {chapterNum}:{verseNum}</p>
                )}
              </div>

              <div className="ml-3 flex items-center gap-3 flex-shrink-0">
                {verseData && <ConfidenceBadge level={verseData.confidence} size="sm" />}
                {isDocumented && (
                  <span className="text-xs text-amber-700/50 group-hover:text-amber-700 transition-colors">Detail →</span>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-8">
        {prevChapter ? (
          <Link
            href={`/luke/${prevChapter}`}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            ← Chapter {prevChapter}
          </Link>
        ) : <div />}

        <Link href="/luke" className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">
          All Chapters
        </Link>

        {nextChapter ? (
          <Link
            href={`/luke/${nextChapter}`}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            Chapter {nextChapter} →
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
