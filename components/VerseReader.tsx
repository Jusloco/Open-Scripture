'use client'

import { useState } from 'react'
import { WordPair } from '@/lib/types'
import { ManuscriptWitness } from '@/lib/manuscripts'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

interface FallbackManuscript {
  name: string
  date: string
  location: string
  image_direct_url?: string
  image_url?: string
  description?: string
}

interface Props {
  wordPairs: WordPair[]
  imagedManuscripts: ManuscriptWitness[]
  fallbackManuscript?: FallbackManuscript
}

type DisplayManuscript = ManuscriptWitness | FallbackManuscript

function isManuscriptWitness(ms: DisplayManuscript): ms is ManuscriptWitness {
  return 'date_year' in ms
}

export function VerseReader({ wordPairs, imagedManuscripts, fallbackManuscript }: Props) {
  const [activeMs, setActiveMs] = useState(0)
  const [selectedWord, setSelectedWord] = useState<number | null>(null)
  const [imgFailed, setImgFailed] = useState(false)

  const manuscripts: DisplayManuscript[] = imagedManuscripts.length > 0
    ? imagedManuscripts
    : fallbackManuscript ? [fallbackManuscript] : []

  const ms = manuscripts[activeMs]
  const word = selectedWord !== null ? wordPairs[selectedWord] : null

  const goNext = () => {
    setActiveMs((activeMs + 1) % manuscripts.length)
    setImgFailed(false)
  }
  const goPrev = () => {
    setActiveMs((activeMs - 1 + manuscripts.length) % manuscripts.length)
    setImgFailed(false)
  }

  const imageUrl = ms
    ? isManuscriptWitness(ms)
      ? ms.image_url
      : ms.image_direct_url
    : undefined

  const institutionUrl = ms
    ? isManuscriptWitness(ms)
      ? ms.institution_url
      : ms.image_url
    : undefined

  const msName = ms?.name ?? ''
  const msDate = ms ? (isManuscriptWitness(ms) ? ms.date_label : ms.date) : ''
  const msLocation = ms ? (isManuscriptWitness(ms) ? ms.repository : ms.location) : ''
  const msSignificance = ms && isManuscriptWitness(ms) ? ms.significance : undefined

  return (
    <div className="grid md:grid-cols-5 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
      {/* LEFT: Manuscript Image Panel (2/5 width) */}
      <div className="md:col-span-2 bg-zinc-900 flex flex-col p-5 border-b md:border-b-0 md:border-r border-zinc-800">
        <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
          Original Manuscript
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center bg-zinc-950 rounded-lg overflow-hidden min-h-52 mb-4 border border-zinc-800">
          {imageUrl && !imgFailed ? (
            <img
              src={imageUrl}
              alt={msName}
              className="max-h-56 w-full object-contain"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-zinc-600">
              <span className="text-5xl">📜</span>
              <span className="text-xs">Image not available</span>
            </div>
          )}
        </div>

        {/* Manuscript info */}
        {ms && (
          <div className="mb-3">
            <div className="font-semibold text-amber-400 text-sm">{msName}</div>
            <div className="text-xs text-zinc-400 mt-0.5">{msDate}</div>
            <div className="text-xs text-zinc-500">{msLocation}</div>
            {msSignificance && (
              <div className="text-xs text-zinc-600 mt-1 italic">
                {msSignificance}
              </div>
            )}
            {institutionUrl && (
              <a
                href={institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 mt-2"
              >
                View at institution <ExternalLink size={10} />
              </a>
            )}
          </div>
        )}

        {/* Navigation */}
        {manuscripts.length > 1 && (
          <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
            <button
              onClick={goPrev}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="flex-1 text-center text-xs text-zinc-500">
              {activeMs + 1} of {manuscripts.length} manuscripts with images
            </span>
            <button
              onClick={goNext}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* RIGHT: Greek Text Panel (3/5 width) */}
      <div className="md:col-span-3 bg-zinc-950 flex flex-col p-5">
        <div className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
          Greek Text — Click Any Word
        </div>

        {/* Greek words */}
        {wordPairs.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {wordPairs.map((wp, i) => (
              <button
                key={i}
                onClick={() => setSelectedWord(i === selectedWord ? null : i)}
                className={`text-xl font-serif px-2.5 py-1 rounded-lg transition-all border ${
                  selectedWord === i
                    ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-lg shadow-amber-400/20'
                    : 'text-zinc-200 hover:bg-zinc-800 border-transparent hover:border-zinc-700'
                }`}
              >
                {wp.greek}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-sm text-zinc-500 mb-4 italic">
            Greek word-by-word data not available for this verse.
          </div>
        )}

        {/* Translation card */}
        {word ? (
          <div className="bg-zinc-900 border border-amber-400/30 rounded-xl p-4 mb-4 shadow-lg">
            <div className="text-4xl font-serif text-amber-400 mb-1">{word.greek}</div>
            <div className="text-xl text-white font-medium">{word.english}</div>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
            <div className="text-zinc-600 text-sm">
              Select a Greek word above to see its translation
            </div>
          </div>
        )}

        {/* Full English translation */}
        <div className="mt-auto pt-3 border-t border-zinc-800">
          <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            English Translation (KJV)
          </div>
          <div className="text-zinc-300 text-sm leading-relaxed">
            {wordPairs.length > 0
              ? wordPairs.map(wp => wp.english).join(' ')
              : 'Translation not available'}
          </div>
        </div>
      </div>
    </div>
  )
}
