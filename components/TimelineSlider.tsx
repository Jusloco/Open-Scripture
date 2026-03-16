'use client'

interface TimelineSliderProps {
  maxDate: number
  onChange: (value: number) => void
  totalVisible: number
  totalCount: number
}

const MILESTONES = [100, 200, 300, 400, 500, 600]

const CENTURY_COLORS: Record<string, string> = {
  '100': '#f59e0b',
  '200': '#f97316',
  '300': '#f43f5e',
  '400': '#a855f7',
  '500': '#64748b',
  '600': '#64748b',
}

export default function TimelineSlider({ maxDate, onChange, totalVisible, totalCount }: TimelineSliderProps) {
  const percent = ((maxDate - 100) / (600 - 100)) * 100

  function getActiveColor(date: number): string {
    if (date <= 199) return '#f59e0b'
    if (date <= 299) return '#f97316'
    if (date <= 399) return '#f43f5e'
    if (date <= 499) return '#a855f7'
    return '#64748b'
  }

  const activeColor = getActiveColor(maxDate)

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">
            Timeline Filter
          </p>
          <p className="text-sm text-zinc-700">
            Showing manuscripts up to{' '}
            <span className="font-bold" style={{ color: activeColor }}>
              {maxDate} AD
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold" style={{ color: activeColor }}>
            {totalVisible}
          </p>
          <p className="text-xs text-zinc-500">
            of {totalCount} manuscripts visible
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="relative mb-3">
        <input
          type="range"
          min={100}
          max={600}
          step={5}
          value={maxDate}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full appearance-none h-2 rounded-full outline-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${activeColor} 0%, ${activeColor} ${percent}%, #d4d4d8 ${percent}%, #d4d4d8 100%)`,
          }}
        />
      </div>

      {/* Milestone labels */}
      <div className="flex justify-between px-0.5 mb-4">
        {MILESTONES.map(year => (
          <button
            key={year}
            onClick={() => onChange(year)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className="w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-150"
              style={{ background: maxDate >= year ? CENTURY_COLORS[String(year)] : '#d4d4d8' }}
            />
            <span
              className="text-xs font-medium transition-colors"
              style={{ color: maxDate >= year ? CENTURY_COLORS[String(year)] : '#a1a1aa' }}
            >
              {year}
            </span>
          </button>
        ))}
      </div>

      {/* Century legend */}
      <div className="border-t border-zinc-200 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
          Century color guide
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: '2nd cent.', color: '#f59e0b', range: '100–199' },
            { label: '3rd cent.', color: '#f97316', range: '200–299' },
            { label: '4th cent.', color: '#f43f5e', range: '300–399' },
            { label: '5th cent.', color: '#a855f7', range: '400–499' },
            { label: '6th cent.+', color: '#64748b', range: '500+' },
          ].map(({ label, color, range }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: color }}
              />
              <span className="text-xs text-zinc-500">{label}</span>
              <span className="text-xs text-zinc-400 hidden sm:inline">({range})</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #b45309;
          border: 2px solid #fafafa;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(180,83,9,0.2);
          transition: box-shadow 0.15s;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 5px rgba(180,83,9,0.25);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #b45309;
          border: 2px solid #fafafa;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
