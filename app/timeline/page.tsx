import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manuscript Timeline — OpenScripture',
  description: 'Visual timeline of New Testament manuscripts from ~100 AD to 500 AD, showing the earliest witnesses to the Gospel of John.',
}

const TIMELINE_START = 100
const TIMELINE_END = 500

interface ManuscriptEntry {
  id: string
  name: string
  shortName: string
  date: number
  dateEnd?: number
  dateLabel: string
  location: string
  content: string
  significance: string
  color: string
  verseLinks?: { ref: string; href: string }[]
}

const MANUSCRIPTS: ManuscriptEntry[] = [
  {
    id: 'p52',
    name: 'P52 — Rylands Papyrus',
    shortName: 'P52',
    date: 100,
    dateEnd: 150,
    dateLabel: '~100–150 AD',
    location: 'John Rylands Library, Manchester',
    content: 'John 18:31–33, 37–38',
    significance: 'Oldest known New Testament fragment. A small scrap — but it proves John\'s Gospel existed in Egypt within decades of composition.',
    color: 'amber',
    verseLinks: [],
  },
  {
    id: 'p66',
    name: 'P66 — Papyrus Bodmer II',
    shortName: 'P66',
    date: 175,
    dateLabel: '~175 AD',
    location: 'Bodmer Library, Geneva',
    content: 'Almost the entire Gospel of John',
    significance: 'One of the best-preserved NT papyri — contains most of John in excellent condition. Key witness to 1:1, 3:16, 14:6, 20:28 and more.',
    color: 'amber',
    verseLinks: [
      { ref: '1:1', href: '/john/1/1' },
      { ref: '1:14', href: '/john/1/14' },
      { ref: '3:16', href: '/john/3/16' },
      { ref: '8:58', href: '/john/8/58' },
      { ref: '14:6', href: '/john/14/6' },
      { ref: '20:28', href: '/john/20/28' },
    ],
  },
  {
    id: 'p75',
    name: 'P75 — Papyrus Bodmer XIV–XV',
    shortName: 'P75',
    date: 175,
    dateEnd: 225,
    dateLabel: '~175–225 AD',
    location: 'Vatican Library, Rome',
    content: 'Luke and John (nearly complete)',
    significance: 'The closest ancestor of Codex Vaticanus. Together P66 and P75 provide a picture of John\'s text just generations after composition.',
    color: 'emerald',
    verseLinks: [
      { ref: '1:18', href: '/john/1/18' },
    ],
  },
  {
    id: 'p45',
    name: 'P45 — Chester Beatty I',
    shortName: 'P45',
    date: 225,
    dateEnd: 250,
    dateLabel: '~225–250 AD',
    location: 'Chester Beatty Library, Dublin',
    content: 'Portions of all four Gospels and Acts',
    significance: 'Part of the Chester Beatty collection — some of the most important biblical papyri outside Egypt. Key witness to John 11.',
    color: 'blue',
    verseLinks: [
      { ref: '11:25', href: '/john/11/25' },
      { ref: '11:35', href: '/john/11/35' },
    ],
  },
  {
    id: 'vaticanus',
    name: 'Codex Vaticanus (B)',
    shortName: 'Vaticanus',
    date: 300,
    dateEnd: 325,
    dateLabel: '~300–325 AD',
    location: 'Vatican Library, Rome',
    content: 'Nearly complete Old and New Testament',
    significance: 'One of the two most authoritative manuscripts in textual criticism. Agrees with P75 on many readings, including \'only begotten God\' in John 1:18.',
    color: 'violet',
    verseLinks: [
      { ref: '1:18', href: '/john/1/18' },
    ],
  },
  {
    id: 'sinaiticus',
    name: 'Codex Sinaiticus (א)',
    shortName: 'Sinaiticus',
    date: 330,
    dateEnd: 360,
    dateLabel: '~330–360 AD',
    location: 'British Library, London',
    content: 'Complete New Testament + Septuagint portions',
    significance: 'The oldest complete New Testament. Discovered in 1844 at St. Catherine\'s Monastery in Sinai. Fully digitized and freely available online.',
    color: 'violet',
    verseLinks: [
      { ref: '1:18', href: '/john/1/18' },
    ],
  },
  {
    id: 'alexandrinus',
    name: 'Codex Alexandrinus (A)',
    shortName: 'Alexandrinus',
    date: 400,
    dateEnd: 440,
    dateLabel: '~400–440 AD',
    location: 'British Library, London',
    content: 'Nearly complete Old and New Testament',
    significance: 'One of the earliest Great Codices. Notably includes John 5:4 — the angel stirring the water — which is absent from older manuscripts.',
    color: 'rose',
    verseLinks: [
      { ref: '5:4', href: '/john/5/4' },
    ],
  },
  {
    id: 'bezae',
    name: 'Codex Bezae (D)',
    shortName: 'Bezae',
    date: 400,
    dateLabel: '~400 AD',
    location: 'Cambridge University Library',
    content: 'Greek and Latin Gospels and Acts',
    significance: 'A bilingual codex with a famously distinct text — often longer than other manuscripts. One of the earliest sources to include the Pericope Adulterae.',
    color: 'rose',
    verseLinks: [
      { ref: '7:53', href: '/john/7/53' },
      { ref: '8:1', href: '/john/8/1' },
    ],
  },
]

const COLOR_MAP: Record<string, { dot: string; bar: string; border: string; text: string }> = {
  amber: { dot: 'bg-amber-600', bar: 'bg-amber-600/80', border: 'border-amber-700/30', text: 'text-amber-700' },
  emerald: { dot: 'bg-emerald-600', bar: 'bg-emerald-600/80', border: 'border-emerald-700/30', text: 'text-emerald-700' },
  blue: { dot: 'bg-blue-600', bar: 'bg-blue-600/80', border: 'border-blue-700/30', text: 'text-blue-700' },
  violet: { dot: 'bg-violet-600', bar: 'bg-violet-600/80', border: 'border-violet-700/30', text: 'text-violet-700' },
  rose: { dot: 'bg-rose-600', bar: 'bg-rose-600/80', border: 'border-rose-700/30', text: 'text-rose-700' },
}

function pct(year: number) {
  return ((year - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * 100
}

export default function TimelinePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">Manuscript Timeline</p>
        <h1 className="text-3xl font-bold text-zinc-900 mb-3">
          From Papyrus to Codex — {TIMELINE_START}–{TIMELINE_END} AD
        </h1>
        <p className="text-zinc-500 max-w-2xl">
          The New Testament is the best-documented text in antiquity. Here is how the manuscript
          tradition of the Gospel of John developed across the first five centuries.
        </p>
      </div>

      {/* Visual timeline bar */}
      <div className="mb-16 select-none">
        <div className="relative h-2 rounded-full bg-zinc-200 mb-3">
          {/* Century markers */}
          {[200, 300, 400, 500].map(yr => (
            <div
              key={yr}
              className="absolute top-0 w-px h-4 bg-zinc-300 -translate-x-1/2"
              style={{ left: `${pct(yr)}%` }}
            />
          ))}
          {/* Manuscript spans */}
          {MANUSCRIPTS.map(ms => {
            const c = COLOR_MAP[ms.color]
            const left = pct(ms.date)
            const right = ms.dateEnd ? pct(ms.dateEnd) : left
            const width = Math.max(right - left, 1.5)
            return (
              <div
                key={ms.id}
                className={`absolute h-2 rounded-full ${c.bar} opacity-90`}
                style={{ left: `${left}%`, width: `${width}%` }}
                title={`${ms.name}: ${ms.dateLabel}`}
              />
            )
          })}
        </div>
        {/* Year labels */}
        <div className="relative h-5">
          {[100, 200, 300, 400, 500].map(yr => (
            <span
              key={yr}
              className="absolute text-xs text-zinc-400 -translate-x-1/2"
              style={{ left: `${pct(yr)}%` }}
            >
              {yr} AD
            </span>
          ))}
        </div>
      </div>

      {/* Manuscript cards */}
      <div className="space-y-4">
        {MANUSCRIPTS.map(ms => {
          const c = COLOR_MAP[ms.color]
          return (
            <div
              key={ms.id}
              className={`rounded-xl border ${c.border} bg-white p-5`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Timeline dot + date */}
                <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-1 sm:w-28 flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full ${c.dot} ring-2 ring-white`} />
                  <span className={`text-xs font-semibold ${c.text} whitespace-nowrap`}>
                    {ms.dateLabel}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h2 className="font-semibold text-zinc-900">{ms.name}</h2>
                    <span className="text-xs text-zinc-500">{ms.location}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-2">Contains: {ms.content}</p>
                  <p className="text-sm text-zinc-600 leading-relaxed">{ms.significance}</p>

                  {ms.verseLinks && ms.verseLinks.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="text-xs text-zinc-400">Key verses:</span>
                      {ms.verseLinks.map(v => (
                        <Link
                          key={v.href}
                          href={v.href}
                          className={`text-xs px-2 py-0.5 rounded-full border ${c.border} ${c.text} hover:bg-zinc-100 transition-colors`}
                        >
                          John {v.ref}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Context callout */}
      <div className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center">
        <p className="text-2xl font-bold text-amber-700 mb-2">~5,800</p>
        <p className="text-sm text-zinc-500 mb-1">Greek NT manuscripts survive today</p>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Compare: Caesar&apos;s Gallic Wars has 251 manuscripts. Plato&apos;s Republic has ~210.
          The NT manuscript tradition is unmatched in the ancient world.
        </p>
      </div>
    </div>
  )
}
