import type { Metadata } from 'next'
import MapPageClient from '@/components/MapPageClient'
import { getAllManuscripts } from '@/lib/manuscripts'

export const metadata: Metadata = {
  title: 'Manuscript Map — OpenScripture',
  description: 'Discover where the New Testament manuscripts were found — an interactive map spanning the 2nd through 6th centuries, from Egypt to Rome to Syria.',
}

// Compute stats from witness data (server-side)
const allWitnesses = getAllManuscripts()
const mappedWitnesses = allWitnesses.filter(m => m.lat != null && m.lng != null)

const totalManuscripts = mappedWitnesses.length

const centuryNumMap: Record<string, number> = {
  '2nd': 2, '3rd': 3, '4th': 4, '5th': 5, '6th': 6,
  '7th': 7, '8th': 8, '9th': 9, '10th': 10,
}
function centuryNum(c: string): number {
  for (const key of Object.keys(centuryNumMap)) {
    if (c.startsWith(key)) return centuryNumMap[key]
  }
  return 6
}

const centurySet = new Set(mappedWitnesses.map(m => centuryNum(m.century)))
const centuries = centurySet.size

const regions = new Set(
  mappedWitnesses.map(m => {
    const r = m.repository
    if (r.includes('Egypt') || r.includes('Cairo') || r.includes('Oxford') || r.includes('Manchester') || r.includes('Cologny') || r.includes('Bodmer')) return 'Egypt/Europe'
    if (r.includes('Vatican') || r.includes('Rome') || r.includes('Florence') || r.includes('Milan') || r.includes('Venice') || r.includes('Grottaferrata')) return 'Italy'
    if (r.includes('Sinai') || r.includes('Jerusalem')) return 'Middle East'
    if (r.includes('Paris') || r.includes('Ghent') || r.includes('Barcelona') || r.includes('Utrecht') || r.includes('Basel') || r.includes('Wolfenbüttel') || r.includes('Hamburg') || r.includes('Munich') || r.includes('St. Gallen')) return 'Western Europe'
    if (r.includes('London') || r.includes('Cambridge') || r.includes('British Library') || r.includes('Leicester') || r.includes('Glasgow')) return 'Britain'
    if (r.includes('St. Petersburg') || r.includes('Moscow') || r.includes('Tbilisi') || r.includes('Athens') || r.includes('Mt. Athos') || r.includes('Sparta')) return 'Eastern Europe'
    if (r.includes('New York') || r.includes('Washington') || r.includes('Chicago') || r.includes('Princeton') || r.includes('Ann Arbor') || r.includes('Berkeley')) return 'North America'
    return 'Other'
  })
)
const countries = regions.size

const centuryCounts = mappedWitnesses.reduce<Record<number, number>>((acc, m) => {
  const c = centuryNum(m.century)
  acc[c] = (acc[c] || 0) + 1
  return acc
}, {})

const centuryConfig = [
  { century: 2, label: '2nd Century', range: '100–199 AD', colorClass: 'text-amber-700', borderClass: 'border-amber-700/20', bgClass: 'bg-amber-700/5' },
  { century: 3, label: '3rd Century', range: '200–299 AD', colorClass: 'text-orange-700', borderClass: 'border-orange-700/20', bgClass: 'bg-orange-700/5' },
  { century: 4, label: '4th Century', range: '300–399 AD', colorClass: 'text-rose-700', borderClass: 'border-rose-700/20', bgClass: 'bg-rose-700/5' },
  { century: 5, label: '5th Century', range: '400–499 AD', colorClass: 'text-purple-700', borderClass: 'border-purple-700/20', bgClass: 'bg-purple-700/5' },
  { century: 6, label: '6th Century+', range: '500+ AD', colorClass: 'text-slate-600', borderClass: 'border-slate-300', bgClass: 'bg-slate-50' },
]

const keySites = [
  {
    name: 'Egypt (origin)',
    icon: '🏺',
    description: 'The dominant provenance for early NT manuscripts. Oxyrhynchus, the Fayum, and the Dishna find yielded P52, P66, P75, P45, and dozens more.',
    count: allWitnesses.filter(m => m.origin?.includes('Egypt')).length,
    color: 'border-amber-700/20 bg-amber-700/5',
    labelColor: 'text-amber-700',
  },
  {
    name: 'Sinai / Jerusalem',
    icon: '⛰️',
    description: "St. Catherine's Monastery preserved Codex Sinaiticus until Tischendorf discovered it in 1844. The Greek Orthodox Patriarchate in Jerusalem holds additional minuscules.",
    count: mappedWitnesses.filter(m => m.repository.includes('Sinai') || m.repository.includes('Jerusalem')).length,
    color: 'border-rose-200 bg-rose-50',
    labelColor: 'text-rose-700',
  },
  {
    name: 'Rome / Vatican',
    icon: '🏛️',
    description: 'Vatican City holds Codex Vaticanus, one of the two most authoritative NT manuscripts, catalogued in the Vatican library since at least 1475.',
    count: mappedWitnesses.filter(m => m.repository.includes('Vatican') || m.repository.includes('Rome')).length,
    color: 'border-zinc-300 bg-zinc-100/50',
    labelColor: 'text-zinc-700',
  },
  {
    name: 'Mt. Athos',
    icon: '🏔️',
    description: 'The monastic peninsula in northern Greece preserves dozens of Byzantine minuscules and lectionaries in its ancient monasteries, including Great Lavra and Vatopedi.',
    count: mappedWitnesses.filter(m => m.repository.includes('Mt. Athos')).length,
    color: 'border-orange-200 bg-orange-50',
    labelColor: 'text-orange-700',
  },
]

export default function MapPage() {
  return (
    <MapPageClient
      totalManuscripts={totalManuscripts}
      centuries={centuries}
      countries={countries}
      centuryCounts={centuryCounts}
      centuryConfig={centuryConfig}
      keySites={keySites}
    />
  )
}
