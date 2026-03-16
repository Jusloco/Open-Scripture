import { ConfidenceLevel } from '@/lib/types'
import { confidenceLabel, confidenceDescription } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface Props {
  level: ConfidenceLevel
  showDescription?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const colorMap = {
  green: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    ring: 'ring-emerald-200',
  },
  yellow: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    ring: 'ring-amber-200',
  },
  red: {
    badge: 'bg-red-50 text-red-600 border-red-200',
    dot: 'bg-red-500',
    ring: 'ring-red-200',
  },
}

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

export default function ConfidenceBadge({ level, showDescription = false, size = 'md' }: Props) {
  const colors = colorMap[level]

  return (
    <div className="flex flex-col gap-1.5">
      <span className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        colors.badge,
        sizeMap[size]
      )}>
        <span className={cn('rounded-full', colors.dot, size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2')} />
        {confidenceLabel(level)}
      </span>
      {showDescription && (
        <p className="text-sm text-zinc-500">{confidenceDescription(level)}</p>
      )}
    </div>
  )
}
