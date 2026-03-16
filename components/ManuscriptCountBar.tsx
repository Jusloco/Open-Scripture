interface Tradition {
  label: string
  count: number
  color: string
}

interface Props {
  greek: number
  latin: number
  syriac?: number
  coptic?: number
  armenian?: number
}

export default function ManuscriptCountBar({ greek, latin, syriac = 0, coptic = 0, armenian = 0 }: Props) {
  const traditions: Tradition[] = [
    { label: 'Greek', count: greek, color: 'bg-amber-700' },
    { label: 'Latin', count: latin, color: 'bg-blue-400' },
    { label: 'Syriac', count: syriac, color: 'bg-violet-400' },
    { label: 'Coptic', count: coptic, color: 'bg-emerald-400' },
    { label: 'Armenian', count: armenian, color: 'bg-rose-400' },
  ].filter(t => t.count > 0)

  const total = traditions.reduce((sum, t) => sum + t.count, 0)

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-100/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Manuscript Traditions</p>

      <div className="flex h-3 w-full overflow-hidden rounded-full mb-5 gap-0.5">
        {traditions.map(t => (
          <div
            key={t.label}
            className={`${t.color} opacity-90 rounded-full`}
            style={{ width: `${(t.count / total) * 100}%` }}
            title={`${t.label}: ${t.count.toLocaleString()}`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {traditions.map(t => (
          <div key={t.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${t.color} flex-shrink-0`} />
            <div>
              <p className="text-xs text-zinc-500">{t.label}</p>
              <p className="text-sm font-semibold text-zinc-800">{t.count.toLocaleString()}+</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-200">
        <p className="text-xs text-zinc-500">Total across all languages</p>
        <p className="text-2xl font-bold text-zinc-900">{total.toLocaleString()}+</p>
      </div>
    </div>
  )
}
