'use client'

import { useState } from 'react'
import { ManuscriptWitness } from '@/lib/manuscripts'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

interface Props {
  witnesses: {
    papyri: ManuscriptWitness[]
    uncials: ManuscriptWitness[]
    minuscules: ManuscriptWitness[]
    lectionaries: ManuscriptWitness[]
    versions: ManuscriptWitness[]
  }
  verseRef: string
}

type Tab = 'papyri' | 'uncials' | 'minuscules' | 'lectionaries' | 'versions'

const TAB_LABELS: Record<Tab, string> = {
  papyri: 'Greek Papyri',
  uncials: 'Greek Uncials',
  minuscules: 'Greek Minuscules',
  lectionaries: 'Lectionaries',
  versions: 'Translations',
}

const TYPE_DESCRIPTIONS: Record<Tab, string> = {
  papyri: '2nd–7th century · Earliest surviving Greek manuscripts',
  uncials: '4th–10th century · Parchment codices in capital letters',
  minuscules: '9th–16th century · Medieval manuscripts in cursive script',
  lectionaries: '4th–16th century · Church service books with NT readings',
  versions: '2nd–9th century · Translations into other languages',
}

function WitnessRow({ ms }: { ms: ManuscriptWitness }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-0.5 py-2.5 border-b border-zinc-800/50 last:border-0 items-start">
      <div className="font-mono text-gold-400 text-sm font-semibold pt-0.5 min-w-[3rem]">
        {ms.siglum}
      </div>
      <div>
        <div className="text-sm text-zinc-200">{ms.name}</div>
        {ms.full_name && ms.full_name !== ms.name && (
          <div className="text-xs text-zinc-500">{ms.full_name}</div>
        )}
        <div className="text-xs text-zinc-500 mt-0.5">{ms.repository}</div>
        {ms.significance && (
          <div className="text-xs text-gold-500/70 mt-0.5 italic">{ms.significance}</div>
        )}
      </div>
      <div className="text-right">
        <div className="text-xs text-zinc-400 whitespace-nowrap">{ms.date_label}</div>
        {ms.text_type && (
          <div className="text-xs text-zinc-600 mt-0.5">{ms.text_type}</div>
        )}
        {ms.institution_url && (
          <a
            href={ms.institution_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-xs text-gold-500 hover:text-gold-400 mt-1"
          >
            View <ExternalLink size={9} />
          </a>
        )}
      </div>
    </div>
  )
}

function TabSection({ items, tab }: { items: ManuscriptWitness[], tab: Tab }) {
  const [expanded, setExpanded] = useState(tab === 'papyri')

  if (items.length === 0) return null

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="font-semibold text-zinc-100">{TAB_LABELS[tab]}</span>
          <span className="text-xs bg-gold-400/10 text-gold-400 px-2 py-0.5 rounded-full">
            {items.length} manuscripts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500 hidden sm:block">{TYPE_DESCRIPTIONS[tab]}</span>
          {expanded ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
        </div>
      </button>
      {expanded && (
        <div className="px-4 bg-zinc-900 divide-y divide-zinc-800/30">
          {items.map(ms => <WitnessRow key={ms.id} ms={ms} />)}
        </div>
      )}
    </div>
  )
}

export function ManuscriptWitnessList({ witnesses, verseRef }: Props) {
  const total = witnesses.papyri.length + witnesses.uncials.length +
    witnesses.minuscules.length + witnesses.lectionaries.length + witnesses.versions.length

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white mb-1">
          Manuscript Witnesses
        </h2>
        <p className="text-zinc-400 text-sm">
          Every known manuscript tradition containing <span className="text-gold-400">{verseRef}</span> —
          <span className="text-zinc-300"> {total} named sources listed below</span>,
          plus thousands more in the Byzantine tradition.
        </p>
      </div>

      <TabSection items={witnesses.papyri} tab="papyri" />
      <TabSection items={witnesses.uncials} tab="uncials" />
      <TabSection items={witnesses.minuscules} tab="minuscules" />
      <TabSection items={witnesses.lectionaries} tab="lectionaries" />
      <TabSection items={witnesses.versions} tab="versions" />

      <div className="mt-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs text-zinc-500">
        <strong className="text-zinc-400">Note on completeness:</strong> This list includes all named manuscripts in the scholarly tradition.
        The full manuscript count — including 1,650+ unnamed Greek minuscules and 8,000+ Latin Vulgate copies —
        exceeds 25,000 total witnesses. No other ancient text comes close: Caesar&apos;s <em>Gallic War</em> has 251 manuscripts, Plato&apos;s works have ~210.
      </div>
    </div>
  )
}
