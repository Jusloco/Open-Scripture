import { Manuscript } from '@/lib/types'
import { ExternalLink } from 'lucide-react'

interface Props {
  manuscript: Manuscript
  label?: string
}

export default function ManuscriptCard({ manuscript, label = 'Earliest Manuscript' }: Props) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-100/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">{label}</p>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-zinc-900 mb-0.5">{manuscript.name}</h3>
          <p className="text-sm text-amber-700 font-medium mb-2">{manuscript.date}</p>
          <p className="text-sm text-zinc-500">{manuscript.location}</p>
          {manuscript.description && (
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed">{manuscript.description}</p>
          )}
        </div>
      </div>
      {manuscript.image_url && (
        <a
          href={manuscript.image_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-600 transition-colors"
        >
          View manuscript image
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  )
}
