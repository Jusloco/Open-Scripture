'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'
import type { ManuscriptWitness } from '@/lib/manuscripts'

const TYPE_COLORS: Record<string, string> = {
  papyrus: '#b45309',    // amber
  uncial: '#c2410c',     // orange
  minuscule: '#7e22ce',  // purple
  lectionary: '#0f766e', // teal
  version: '#1d4ed8',    // blue
}

const CENTURY_COLORS: Record<string, string> = {
  '2nd': '#b45309',
  '3rd': '#c2410c',
  '4th': '#be123c',
  '5th': '#7e22ce',
  '6th': '#475569',
  '7th': '#475569',
  '8th': '#374151',
  '9th': '#1f2937',
}

function getCenturyColor(century: string): string {
  for (const key of Object.keys(CENTURY_COLORS)) {
    if (century.startsWith(key)) return CENTURY_COLORS[key]
  }
  return '#6b7280'
}

const TYPE_LABELS: Record<string, string> = {
  papyrus: 'Papyrus',
  uncial: 'Uncial',
  minuscule: 'Minuscule',
  lectionary: 'Lectionary',
  version: 'Version',
}

interface ManuscriptMapProps {
  manuscripts: ManuscriptWitness[]
  maxDate: number
}

const MAJOR_IDS = new Set(['vaticanus', 'sinaiticus', 'alexandrinus', 'bezae', 'ephraemi', 'p66', 'p75', 'p52'])

export default function ManuscriptMap({ manuscripts, maxDate }: ManuscriptMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markersRef = useRef<unknown[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    const visible = manuscripts.filter(m => m.date_year <= maxDate && m.lat != null && m.lng != null)

    import('leaflet').then(L => {
      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current!, {
          center: [44, 18],
          zoom: 3,
          zoomControl: true,
          attributionControl: true,
        })

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }).addTo(map)

        mapInstanceRef.current = map
      }

      const map = mapInstanceRef.current as ReturnType<typeof L.map>

      // Clear existing markers
      markersRef.current.forEach(m => (m as ReturnType<typeof L.circleMarker>).remove())
      markersRef.current = []

      // Add visible markers
      visible.forEach(ms => {
        const color = getCenturyColor(ms.century)
        const isMajor = MAJOR_IDS.has(ms.id)
        const radius = isMajor ? 11 : ms.type === 'papyrus' ? 8 : 7

        const marker = L.circleMarker([ms.lat!, ms.lng!], {
          radius,
          fillColor: color,
          color: '#e4e4e7',
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.85,
        })

        const typeLabel = TYPE_LABELS[ms.type] || ms.type
        const typeColor = TYPE_COLORS[ms.type] || '#6b7280'
        const linkHtml = ms.institution_url
          ? `<a href="${ms.institution_url}" target="_blank" rel="noopener noreferrer" style="font-size:11px; color:#b45309; text-decoration:underline;">View at institution →</a>`
          : ''

        const popupContent = `
          <div style="
            background: #ffffff;
            color: #18181b;
            border-radius: 10px;
            padding: 14px 16px;
            min-width: 230px;
            max-width: 280px;
            font-family: system-ui, -apple-system, sans-serif;
            border: 1px solid #e4e4e7;
          ">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
              <span style="
                display:inline-block;
                width:10px; height:10px;
                border-radius:50%;
                background:${color};
                flex-shrink:0;
              "></span>
              <span style="font-weight:700; font-size:14px; color:#b45309;">${ms.siglum}</span>
              <span style="
                margin-left:auto;
                font-size:10px;
                font-weight:600;
                color:${typeColor};
                background:${typeColor}18;
                border:1px solid ${typeColor}30;
                border-radius:4px;
                padding:1px 6px;
                text-transform:uppercase;
                letter-spacing:0.05em;
              ">${typeLabel}</span>
            </div>
            <p style="font-size:13px; font-weight:600; color:#18181b; margin:0 0 2px 0;">${ms.name}</p>
            <p style="font-size:11px; color:#71717a; margin:0 0 8px 0;">${ms.date_label}</p>
            <div style="border-top:1px solid #e4e4e7; padding-top:8px;">
              <p style="font-size:11px; color:#a1a1aa; margin:0 0 2px 0; text-transform:uppercase; letter-spacing:0.05em;">Repository</p>
              <p style="font-size:12px; color:#3f3f46; margin:0 0 6px 0;">${ms.repository}</p>
              ${ms.significance ? `<p style="font-size:11px; color:#71717a; font-style:italic; margin:0 0 6px 0;">${ms.significance}</p>` : ''}
              ${linkHtml}
            </div>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 290,
          className: 'manuscript-popup',
        })

        marker.addTo(map)
        markersRef.current.push(marker)
      })
    })

    return () => {
      // Only cleanup markers on prop change, not full map
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxDate])

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        ;(mapInstanceRef.current as { remove: () => void }).remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={mapRef}
      style={{ height: '600px', width: '100%' }}
      className="rounded-xl overflow-hidden border border-zinc-200"
    />
  )
}
