'use client'

import { useState } from 'react'
import ManuscriptMap from './ManuscriptMap'
import TimelineSlider from './TimelineSlider'
import manuscriptLocations from '@/data/manuscript-locations.json'

export default function MapWrapper() {
  const [maxDate, setMaxDate] = useState(600)

  const visibleCount = manuscriptLocations.filter(m => m.date <= maxDate).length

  return (
    <div className="space-y-4">
      <ManuscriptMap manuscripts={manuscriptLocations} maxDate={maxDate} />
      <TimelineSlider
        maxDate={maxDate}
        onChange={setMaxDate}
        totalVisible={visibleCount}
        totalCount={manuscriptLocations.length}
      />
    </div>
  )
}
