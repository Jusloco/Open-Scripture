'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const MapWrapper = dynamic(() => import('./MapWrapper'), { ssr: false })

interface CenturyConfig {
  century: number
  label: string
  range: string
  colorClass: string
  borderClass: string
  bgClass: string
}

interface KeySite {
  name: string
  icon: string
  description: string
  count: number
  color: string
  labelColor: string
}

interface MapPageClientProps {
  totalManuscripts: number
  centuries: number
  countries: number
  centuryCounts: Record<number, number>
  centuryConfig: CenturyConfig[]
  keySites: KeySite[]
}

export default function MapPageClient({
  totalManuscripts,
  centuries,
  countries,
  centuryCounts,
  centuryConfig,
  keySites,
}: MapPageClientProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">

      {/* Hero */}
      <section className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
          Discovery Map
        </p>
        <h1 className="text-3xl font-bold text-zinc-900 mb-3">
          Where Were the Manuscripts Found?
        </h1>
        <p className="text-zinc-500 max-w-2xl leading-relaxed">
          Every major New Testament manuscript has a place of origin. Most were buried in Egyptian
          sand for nearly 2,000 years. Drag the timeline slider to watch the manuscript record
          grow across the centuries.
        </p>
      </section>

      {/* Stat bar */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{totalManuscripts}</p>
          <p className="text-xs text-zinc-500 mt-1">manuscripts plotted</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{centuries}</p>
          <p className="text-xs text-zinc-500 mt-1">centuries spanned</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{countries}+</p>
          <p className="text-xs text-zinc-500 mt-1">regions represented</p>
        </div>
      </section>

      {/* Map + Slider */}
      <section className="mb-10">
        <MapWrapper />
      </section>

      {/* Century breakdown grid */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
          Manuscripts by century
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {centuryConfig.map(({ century, label, range, colorClass, borderClass, bgClass }) => {
            const count = centuryCounts[century] || 0
            return (
              <div
                key={century}
                className={`rounded-xl border ${borderClass} ${bgClass} p-4 text-center`}
              >
                <p className={`text-2xl font-bold ${colorClass}`}>{count}</p>
                <p className="text-xs font-semibold text-zinc-700 mt-1">{label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{range}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Key discovery sites */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">
          Key discovery sites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {keySites.map(site => (
            <div
              key={site.name}
              className={`rounded-xl border ${site.color} p-5`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl" aria-hidden="true">{site.icon}</span>
                <h3 className={`font-semibold ${site.labelColor}`}>{site.name}</h3>
                <span className="ml-auto text-xs text-zinc-500 bg-zinc-100 rounded-full px-2 py-0.5">
                  {site.count} plotted
                </span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">{site.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <section className="rounded-2xl border border-amber-700/10 bg-amber-700/5 p-8 mb-10">
        <div className="flex items-start gap-3 mb-4">
          <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-amber-700" />
          <h3 className="text-lg font-semibold text-zinc-900">Why does provenance matter?</h3>
        </div>
        <p className="text-zinc-700 leading-relaxed mb-3">
          The geographical spread of early manuscripts tells us something important: the New Testament
          text was circulating across the Mediterranean world within decades of composition. Egypt
          preserved the physical papyri due to its dry climate — but those manuscripts were clearly
          copies of texts used across a much wider region.
        </p>
        <p className="text-zinc-500 text-sm leading-relaxed">
          When P52 (Egypt) and the Dura-Europos fragment (Syria, 600 miles east) both attest to the
          same Gospel text in the 2nd century, the consistency is remarkable — and historically significant.
        </p>
        <Link
          href="/compare"
          className="mt-4 inline-block text-sm text-amber-700 hover:text-amber-600 transition-colors"
        >
          Compare NT manuscript evidence to other ancient texts →
        </Link>
      </section>

      {/* Nav links */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/manuscripts"
          className="px-5 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:border-amber-700/30 hover:text-amber-700 transition-colors text-sm"
        >
          Key Manuscripts
        </Link>
        <Link
          href="/timeline"
          className="px-5 py-2.5 rounded-xl border border-amber-700/30 text-amber-700 hover:bg-amber-700/10 transition-colors text-sm"
        >
          View Timeline →
        </Link>
      </div>
    </div>
  )
}
