'use client'

import { useState } from 'react'
import type { WordPair, Manuscript } from '@/lib/types'

interface ManuscriptReaderProps {
  wordPairs: WordPair[]
  manuscript: Manuscript
}

export default function ManuscriptReader({ wordPairs, manuscript }: ManuscriptReaderProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [pinned, setPinned] = useState<number | null>(null)
  const [imgFailed, setImgFailed] = useState(false)

  const active = pinned !== null ? pinned : hovered

  const handleClick = (i: number) => setPinned(prev => prev === i ? null : i)

  return (
    <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-100/50 overflow-hidden">
      <div className="px-5 py-3 border-b border-zinc-200 bg-white">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-700">Manuscript Reader</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Hover any word to see its translation · Click to pin</p>
      </div>

      {/* Manuscript Image — full width, prominent */}
      <div className="border-b border-zinc-200">
        <div className="px-5 pt-4 pb-2 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-zinc-800">{manuscript.name}</p>
            <p className="text-xs text-amber-700">{manuscript.date}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{manuscript.location}</p>
          </div>
          {manuscript.image_url && (
            <a
              href={manuscript.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-amber-700 transition-colors whitespace-nowrap mt-1"
            >
              View at institution ↗
            </a>
          )}
        </div>

        <div className="relative w-full bg-zinc-100 overflow-x-auto">
          {manuscript.image_direct_url && !imgFailed ? (
            <img
              src={manuscript.image_direct_url}
              alt={`${manuscript.name} — original manuscript`}
              className="w-full object-contain max-h-80"
              style={{ minWidth: '500px' }}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-zinc-200 flex items-center justify-center">
                <span className="text-2xl">📜</span>
              </div>
              <p className="text-sm text-zinc-500 max-w-sm">
                {manuscript.description || `Original image of ${manuscript.name}`}
              </p>
              {manuscript.image_url && (
                <a
                  href={manuscript.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-sm text-zinc-800 transition-colors"
                >
                  View manuscript image ↗
                </a>
              )}
            </div>
          )}
        </div>
        {manuscript.description && manuscript.image_direct_url && !imgFailed && (
          <p className="px-5 py-2 text-xs text-zinc-500 border-t border-zinc-200/50">{manuscript.description}</p>
        )}
      </div>

      {/* Greek text — inline flowing words with hover tooltips */}
      <div className="border-b border-zinc-200 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
          Greek — Original Text
        </p>
        <p className="text-xl leading-loose" style={{ fontFamily: 'Georgia, serif', direction: 'ltr' }}>
          {wordPairs.map((pair, i) => (
            <span key={i} className="relative inline-block mx-0.5">
              <span
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(i)}
                className={`
                  cursor-pointer px-1 py-0.5 rounded transition-all select-none
                  ${active === i
                    ? 'bg-amber-700 text-white font-semibold'
                    : 'text-zinc-800 hover:bg-zinc-200 hover:text-amber-700'
                  }
                `}
              >
                {pair.greek}
              </span>
              {/* Tooltip */}
              {hovered === i && pinned !== i && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none">
                  <span className="block bg-white border border-zinc-300 rounded-lg shadow-xl px-3 py-2 text-center whitespace-nowrap">
                    <span className="block text-base font-serif text-zinc-900">{pair.greek}</span>
                    <span className="block text-xs text-amber-700 mt-0.5">{pair.english}</span>
                  </span>
                  <span className="block w-2 h-2 bg-white border-r border-b border-zinc-300 rotate-45 mx-auto -mt-1" />
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* English translation — inline flowing words */}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
          English — KJV Translation
        </p>
        <p className="text-base leading-loose">
          {wordPairs.map((pair, i) => (
            <span
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleClick(i)}
              className={`
                cursor-pointer px-1 py-0.5 rounded mx-0.5 transition-all select-none
                ${active === i
                  ? 'bg-amber-700 text-white font-semibold'
                  : 'text-zinc-700 hover:bg-zinc-200 hover:text-amber-700'
                }
              `}
            >
              {pair.english}
            </span>
          ))}
        </p>

        {/* Pinned word detail card */}
        {pinned !== null && (
          <div className="mt-5 p-4 rounded-xl bg-amber-700/10 border border-amber-700/25 flex items-start gap-4">
            <div className="flex-1">
              <p className="text-xs text-amber-700/60 mb-1">Greek</p>
              <p className="text-2xl font-serif text-zinc-900 leading-snug">{wordPairs[pinned].greek}</p>
            </div>
            <div className="w-px self-stretch bg-amber-700/20" />
            <div className="flex-1">
              <p className="text-xs text-amber-700/60 mb-1">English</p>
              <p className="text-base text-zinc-800">{wordPairs[pinned].english}</p>
            </div>
            <button
              onClick={() => setPinned(null)}
              className="text-zinc-400 hover:text-zinc-600 transition-colors text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className="px-5 py-3 border-t border-zinc-200 bg-zinc-100/60">
        <p className="text-xs text-zinc-400">
          Greek text from the Nestle-Aland critical text (NA28) · Public domain
        </p>
      </div>
    </div>
  )
}
