import type { Metadata } from 'next'
import MapPageClient from '@/components/MapPageClient'
import manuscriptLocations from '@/data/manuscript-locations.json'

export const metadata: Metadata = {
  title: 'Manuscript Map — OpenScripture',
  description: 'Discover where the New Testament manuscripts were found — an interactive map spanning the 2nd through 6th centuries, from Egypt to Rome to Syria.',
}

// Compute stats from data (server-side)
const totalManuscripts = manuscriptLocations.length

const centuries = new Set(manuscriptLocations.map(m => m.century)).size

const regions = new Set(
  manuscriptLocations.map(m => {
    if (m.location.includes('Egypt') || m.location.includes('Sinai')) return 'Egypt/Sinai'
    if (m.location.includes('Vatican') || m.location.includes('Rome')) return 'Italy'
    if (m.location.includes('Syria') || m.location.includes('Antioch')) return 'Syria'
    if (m.location.includes('Turkey') || m.location.includes('Asia Minor') || m.location.includes('Ephesus')) return 'Turkey'
    if (m.location.includes('Gaul') || m.location.includes('Africa')) return 'N. Africa'
    return 'Other'
  })
)
const countries = regions.size

const centuryCounts = manuscriptLocations.reduce<Record<number, number>>((acc, m) => {
  acc[m.century] = (acc[m.century] || 0) + 1
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
    name: 'Egypt',
    icon: '🏺',
    description: 'The dominant provenance for early NT manuscripts. Oxyrhynchus, the Fayum, and the Dishna find yielded P52, P66, P75, P45, and dozens more.',
    count: manuscriptLocations.filter(m => m.location.includes('Egypt')).length,
    color: 'border-amber-700/20 bg-amber-700/5',
    labelColor: 'text-amber-700',
  },
  {
    name: 'Sinai Peninsula',
    icon: '⛰️',
    description: "St. Catherine's Monastery, founded in 565 AD, preserved Codex Sinaiticus — the oldest complete New Testament — until Tischendorf discovered it in 1844.",
    count: manuscriptLocations.filter(m => m.location.includes('Sinai')).length,
    color: 'border-rose-200 bg-rose-50',
    labelColor: 'text-rose-700',
  },
  {
    name: 'Rome / Vatican',
    icon: '🏛️',
    description: 'Vatican City holds Codex Vaticanus, one of the two most authoritative NT manuscripts, catalogued in the Vatican library since at least 1475.',
    count: manuscriptLocations.filter(m => m.location.includes('Rome') || m.location.includes('Vatican')).length,
    color: 'border-zinc-300 bg-zinc-100/50',
    labelColor: 'text-zinc-700',
  },
  {
    name: 'Syria',
    icon: '🏙️',
    description: 'Dura-Europos preserved the only Greek Diatessaron fragment — a Gospel harmony — sealed under rubble before the city fell in 256 AD. Antioch produced the Peshitta.',
    count: manuscriptLocations.filter(m => m.location.includes('Syria') || m.location.includes('Antioch')).length,
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
