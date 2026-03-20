'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import type { ChapterData, VerseData } from '@/lib/types'
import type { ManuscriptWitness } from '@/lib/manuscripts'
import ConfidenceBadge from '@/components/ConfidenceBadge'

const ManuscriptViewer = dynamic(
  () => import('./ManuscriptViewer').then(m => ({ default: m.ManuscriptViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading viewer…</div>
      </div>
    ),
  }
)

type ViewMode = 'split' | 'image' | 'text'

interface Props {
  chapterNum: number
  totalChapters: number
  chapterData: ChapterData
  keyVerses: VerseData[]
  allVerseNums: number[]
  manuscript: ManuscriptWitness | null
  book: string
}

export function ChapterReaderLayout({
  chapterNum,
  totalChapters,
  chapterData,
  keyVerses,
  allVerseNums,
  manuscript,
  book,
}: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [activeVerse, setActiveVerse] = useState<number | null>(null)
  const [activeWord, setActiveWord] = useState<number | null>(null)

  const prevChapter = chapterNum > 1 ? chapterNum - 1 : null
  const nextChapter = chapterNum < totalChapters ? chapterNum + 1 : null
  const keyVerseNums = new Set(keyVerses.map(v => v.verse))
  const bookPath = `/${book.toLowerCase()}`

  const showImage = viewMode !== 'text'
  const showText = viewMode !== 'image'

  function handleVerseClick(verseNum: number) {
    if (activeVerse === verseNum) {
      setActiveVerse(null)
      setActiveWord(null)
    } else {
      setActiveVerse(verseNum)
      setActiveWord(null)
    }
  }

  function handleWordClick(e: React.MouseEvent, wordIndex: number) {
    e.stopPropagation()
    setActiveWord(prev => (prev === wordIndex ? null : wordIndex))
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Chapter bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-14 z-40 flex items-center justify-between gap-3 px-4 py-2.5 border-b border-zinc-200 bg-white/95 backdrop-blur shrink-0 flex-wrap">
        {/* Left: back link + chapter label */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={bookPath}
            className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 transition-colors shrink-0"
          >
            <ChevronLeft size={14} />
            {book}
          </Link>
          <span className="text-zinc-300">/</span>
          <span className="text-sm font-medium text-zinc-700 truncate">
            Chapter {chapterNum}
          </span>
          {manuscript && (
            <>
              <span className="text-zinc-300 hidden sm:inline">·</span>
              <a
                href={manuscript.institution_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400 transition-colors shrink-0"
              >
                {manuscript.name} ({manuscript.date_label})
                <ExternalLink size={10} />
              </a>
            </>
          )}
        </div>

        {/* Right: view toggle + prev/next */}
        <div className="flex items-center gap-2 shrink-0">
          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-zinc-200 overflow-hidden text-xs">
            <button
              onClick={() => setViewMode('image')}
              title="Image only"
              className={`px-2.5 py-1.5 transition-colors ${viewMode === 'image' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('split')}
              title="Split view"
              className={`px-2.5 py-1.5 border-x border-zinc-200 transition-colors ${viewMode === 'split' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              ⊡
            </button>
            <button
              onClick={() => setViewMode('text')}
              title="Text only"
              className={`px-2.5 py-1.5 transition-colors ${viewMode === 'text' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              ≡
            </button>
          </div>

          {/* Prev / next */}
          <div className="flex items-center gap-1">
            {prevChapter ? (
              <Link
                href={`${bookPath}/${prevChapter}`}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
                title={`Chapter ${prevChapter}`}
              >
                <ChevronLeft size={16} />
              </Link>
            ) : (
              <span className="p-1.5 text-zinc-300"><ChevronLeft size={16} /></span>
            )}
            {nextChapter ? (
              <Link
                href={`${bookPath}/${nextChapter}`}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
                title={`Chapter ${nextChapter}`}
              >
                <ChevronRight size={16} />
              </Link>
            ) : (
              <span className="p-1.5 text-zinc-300"><ChevronRight size={16} /></span>
            )}
          </div>
        </div>
      </div>

      {/* ── Panels ──────────────────────────────────────────────────────── */}
      <div
        className={`flex-1 flex flex-col ${
          showImage && showText
            ? 'md:grid md:grid-cols-[55%_45%]'
            : ''
        } min-h-0`}
      >
        {/* Left: Manuscript image panel */}
        {showImage && (
          <div className={`bg-zinc-950 ${
            showText
              ? 'h-64 md:h-auto md:sticky md:top-[104px] md:max-h-[calc(100vh-104px)] overflow-hidden'
              : 'flex-1 min-h-[400px]'
          }`}>
            {manuscript?.image_url ? (
              <ManuscriptViewer
                imageUrl={manuscript.image_url}
                manuscriptName={`${manuscript.name} · ${manuscript.date_label}`}
                activeVerse={activeVerse ?? undefined}
                totalVerses={chapterData.verse_count}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-600">
                <span className="text-5xl">📜</span>
                <span className="text-sm">No digitized image for this chapter</span>
                <span className="text-xs text-zinc-700">
                  {manuscript ? `${manuscript.name} — image not yet available` : 'No dated manuscript covers this chapter'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Right: Verse list panel */}
        {showText && (
          <div className={`overflow-y-auto ${
            showImage ? 'md:h-[calc(100vh-104px)] md:sticky md:top-[104px]' : 'flex-1'
          } bg-white`}>
            <div className="p-5 md:p-6">
              {/* Chapter header */}
              <div className="mb-5 pb-4 border-b border-zinc-100">
                <h1 className="text-xl font-bold text-zinc-900 mb-1">
                  {book} · Chapter {chapterNum}
                </h1>
                <p className="text-sm text-zinc-500 leading-relaxed">{chapterData.summary}</p>
                <p className="text-xs text-zinc-400 mt-2">
                  {chapterData.verse_count} verses ·{' '}
                  <span className="text-zinc-500">{keyVerses.length} with full manuscript detail</span>
                </p>
              </div>

              {/* Verse list */}
              <div className="space-y-1">
                {allVerseNums.map(verseNum => {
                  const isKey = keyVerseNums.has(verseNum)
                  const verseData = keyVerses.find(v => v.verse === verseNum)
                  const isActive = activeVerse === verseNum
                  const hasWords = isKey && verseData?.greek_words && verseData.greek_words.length > 0

                  return (
                    <div key={verseNum}>
                      {/* Verse row — clickable */}
                      <div
                        onClick={() => handleVerseClick(verseNum)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && handleVerseClick(verseNum)}
                        className={`group flex items-start gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all select-none ${
                          isActive
                            ? verseData?.bracketed
                              ? 'bg-red-50 border border-red-200'
                              : isKey
                              ? 'bg-amber-50 border border-amber-200'
                              : 'bg-zinc-100 border border-zinc-300'
                            : verseData?.bracketed
                            ? 'hover:bg-red-50 border border-transparent hover:border-red-100'
                            : isKey
                            ? 'hover:bg-zinc-50 border border-transparent hover:border-zinc-200'
                            : 'hover:bg-zinc-50/60 border border-transparent'
                        }`}
                      >
                        <span className={`text-xs font-mono pt-0.5 w-6 text-right shrink-0 ${
                          isKey ? 'text-amber-600 font-semibold' : 'text-zinc-400'
                        }`}>
                          {verseNum}
                        </span>
                        <div className="flex-1 min-w-0">
                          {isKey && verseData ? (
                            <div>
                              {verseData.text && (
                                <p className={`text-sm text-zinc-700 leading-relaxed ${isActive ? '' : 'line-clamp-2'}`}>
                                  {verseData.text}
                                </p>
                              )}
                              <div className="flex items-center gap-2 mt-1">
                                <ConfidenceBadge level={verseData.confidence} size="sm" />
                                {!isActive && (
                                  <span className="text-xs text-amber-500/60 group-hover:text-amber-400 transition-colors">
                                    Click to explore →
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-zinc-400 italic pt-0.5">
                              Attested in 5,800+ Greek manuscripts
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Expanded content — shown only when active */}
                      {isActive && (
                        <div className="mx-3 mb-2 rounded-b-lg border border-t-0 border-amber-200 bg-amber-50/60 px-3 py-3">
                          {/* Greek word chips */}
                          {hasWords && verseData?.greek_words && (
                            <div className="mb-3">
                              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                Greek word-by-word
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {verseData.greek_words.map((wp, idx) => (
                                  <button
                                    key={idx}
                                    onClick={e => handleWordClick(e, idx)}
                                    className={`px-2 py-1 rounded-md text-sm font-medium transition-all ${
                                      activeWord === idx
                                        ? 'bg-amber-500 text-white shadow-sm'
                                        : 'bg-white border border-amber-200 text-zinc-700 hover:bg-amber-100 hover:border-amber-300'
                                    }`}
                                  >
                                    {wp.greek}
                                  </button>
                                ))}
                              </div>

                              {/* Translation callout */}
                              {activeWord !== null && verseData.greek_words[activeWord] && (
                                <div className="mt-2 inline-flex items-center gap-2 bg-white border border-amber-300 rounded-lg px-3 py-2 shadow-sm">
                                  <span className="text-sm font-semibold text-amber-700">
                                    {verseData.greek_words[activeWord].greek}
                                  </span>
                                  <span className="text-zinc-400">=</span>
                                  <span className="text-sm text-zinc-700 italic">
                                    &ldquo;{verseData.greek_words[activeWord].english}&rdquo;
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Non-key verse expanded state */}
                          {!isKey && (
                            <p className="text-xs text-zinc-500 mb-2">
                              This verse is attested in virtually all 5,800+ Greek manuscripts with no significant variants.
                            </p>
                          )}

                          {/* Actions row */}
                          <div className="flex items-center gap-3 pt-1 border-t border-amber-200/60">
                            {isKey ? (
                              <Link
                                href={`${bookPath}/${chapterNum}/${verseNum}`}
                                onClick={e => e.stopPropagation()}
                                className="text-xs text-amber-700 hover:text-amber-600 transition-colors font-medium"
                              >
                                Full verse detail →
                              </Link>
                            ) : (
                              <span className="text-xs text-zinc-400">
                                Verse {verseNum} · no detailed record available
                              </span>
                            )}
                            <button
                              onClick={e => { e.stopPropagation(); setActiveVerse(null); setActiveWord(null) }}
                              className="ml-auto text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Manuscript info panel */}
              {manuscript && (
                <div className="mt-8 pt-5 border-t border-zinc-100">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Manuscript Shown
                  </p>
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="font-semibold text-amber-600 text-sm">{manuscript.name}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{manuscript.date_label}</div>
                    <div className="text-xs text-zinc-400">{manuscript.repository}</div>
                    {manuscript.significance && (
                      <div className="text-xs text-zinc-500 mt-1.5 italic leading-relaxed">
                        {manuscript.significance}
                      </div>
                    )}
                    {manuscript.institution_url && (
                      <a
                        href={manuscript.institution_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-500 mt-2 transition-colors"
                      >
                        View interactive viewer <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
