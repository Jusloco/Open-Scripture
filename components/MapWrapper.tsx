'use client'

import { useState } from 'react'
import ManuscriptMap from './ManuscriptMap'
import TimelineSlider from './TimelineSlider'
import { getAllManuscripts } from '@/lib/manuscripts'

const allWitnesses = getAllManuscripts().filter(m => m.lat != null && m.lng != null)

export default function MapWrapper() {
  const [maxDate, setMaxDate] = useState(600)

  const visibleCount = allWitnesses.filter(m => m.date_year <= maxDate).length

  return (
    <div className="space-y-4">
      <ManuscriptMap manuscripts={allWitnesses} maxDate={maxDate} />
      <TimelineSlider
        maxDate={maxDate}
        onChange={setMaxDate}
        totalVisible={visibleCount}
        totalCount={allWitnesses.length}
      />
    </div>
  )
}
