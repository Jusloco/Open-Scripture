import { getComparisonData } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Ancient Texts',
  description: 'How does the New Testament manuscript evidence compare to Caesar, Homer, Plato, and other accepted ancient texts?',
}

export default function ComparePage() {
  const data = getComparisonData()

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-12">
        <p className="text-sm text-amber-700 font-medium mb-2">The Consistency Principle</p>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Ancient Texts Compared</h1>
        <p className="text-zinc-500 leading-relaxed max-w-2xl">
          Every ancient text we accept as authentic has fewer manuscripts, larger time gaps, and less corroborating evidence than the New Testament. If the standard of proof is good enough for Caesar and Plato, it is overwhelmingly satisfied by the NT.
        </p>
      </div>

      {/* Key insight */}
      <div className="mb-10 rounded-2xl border border-amber-700/20 bg-amber-700/5 p-6">
        <p className="text-amber-700 font-semibold mb-2">The Point</p>
        <p className="text-zinc-700 leading-relaxed">{data.key_insight}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">Text</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">Written</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">Earliest Copy</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">Gap (yrs)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">Manuscripts</th>
            </tr>
          </thead>
          <tbody>
            {data.texts.map((text, i) => {
              const isNT = text.category === 'scripture'
              return (
                <tr
                  key={i}
                  className={`border-b border-zinc-200/60 transition-colors hover:bg-zinc-50
                    ${isNT ? 'bg-amber-700/5' : ''}`}
                >
                  <td className="px-4 py-4">
                    <p className={`font-semibold ${isNT ? 'text-amber-700' : 'text-zinc-800'}`}>{text.title}</p>
                    <p className="text-xs text-zinc-400 mt-0.5">{text.author}</p>
                  </td>
                  <td className="px-4 py-4 text-zinc-500">{text.written}</td>
                  <td className="px-4 py-4 text-zinc-500">{text.earliest_copy}</td>
                  <td className="px-4 py-4">
                    <span className={`font-semibold ${isNT ? 'text-emerald-700' : 'text-zinc-500'}`}>
                      {text.gap_years}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-bold ${isNT ? 'text-amber-700 text-base' : 'text-zinc-700'}`}>
                      {text.manuscript_count.toLocaleString()}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Individual text cards */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data.texts.map((text, i) => {
          const isNT = text.category === 'scripture'
          return (
            <div
              key={i}
              className={`rounded-xl border p-5 ${isNT
                ? 'border-amber-700/30 bg-amber-700/5'
                : 'border-zinc-200 bg-white'
                }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className={`font-semibold ${isNT ? 'text-amber-700' : 'text-zinc-900'}`}>{text.title}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{text.author}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-lg font-bold ${isNT ? 'text-amber-700' : 'text-zinc-800'}`}>
                    {text.manuscript_count.toLocaleString()}
                  </p>
                  <p className="text-xs text-zinc-400">manuscripts</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-zinc-500 mb-3">
                <span>Written: <span className="text-zinc-500">{text.written}</span></span>
                <span>Earliest: <span className="text-zinc-500">{text.earliest_copy}</span></span>
                <span>Gap: <span className={isNT ? 'text-emerald-700 font-semibold' : 'text-zinc-500'}>{text.gap_years} yrs</span></span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">{text.notes}</p>
            </div>
          )
        })}
      </div>

      {/* Footnotes */}
      <div className="mt-12 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">Sources &amp; Notes</p>
        <ul className="space-y-2">
          {data.footnotes.map((note, i) => (
            <li key={i} className="text-xs text-zinc-500 leading-relaxed">
              {note}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
