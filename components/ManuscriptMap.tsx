'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'

interface ManuscriptLocation {
  id: string
  name: string
  short_name: string
  date: number
  date_label: string
  century: number
  lat: number
  lng: number
  location: string
  contents: string
  significance: string
  repository: string
  color_century: string
  url: string
}

interface ManuscriptMapProps {
  manuscripts: ManuscriptLocation[]
  maxDate: number
}

export default function ManuscriptMap({ manuscripts, maxDate }: ManuscriptMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)
  const markersRef = useRef<unknown[]>([])

  useEffect(() => {
    if (!mapRef.current) return

    const visible = manuscripts.filter(m => m.date <= maxDate)

    // Dynamically import leaflet only on client
    import('leaflet').then(L => {
      // Fix default icon paths (Leaflet + webpack issue)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current!, {
          center: [28, 28],
          zoom: 4,
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
        // Size: major codices (vaticanus, sinaiticus, alexandrinus, bezae) get larger radius
        const isMajorCodex = ['vaticanus', 'sinaiticus', 'alexandrinus', 'bezae', 'ephraemi'].includes(ms.id)
        const radius = isMajorCodex ? 12 : 8

        const marker = L.circleMarker([ms.lat, ms.lng], {
          radius,
          fillColor: ms.color_century,
          color: '#e4e4e7',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85,
        })

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
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <span style="
                display:inline-block;
                width:10px; height:10px;
                border-radius:50%;
                background:${ms.color_century};
                flex-shrink:0;
              "></span>
              <span style="font-weight:700; font-size:14px; color:#b45309;">${ms.short_name}</span>
            </div>
            <p style="font-size:13px; font-weight:600; color:#18181b; margin:0 0 4px 0;">${ms.name}</p>
            <p style="font-size:11px; color:#71717a; margin:0 0 8px 0;">${ms.date_label} · ${ms.location}</p>
            <div style="border-top:1px solid #e4e4e7; padding-top:8px; margin-bottom:8px;">
              <p style="font-size:11px; color:#a1a1aa; margin:0 0 2px 0; text-transform:uppercase; letter-spacing:0.05em;">Contents</p>
              <p style="font-size:12px; color:#3f3f46; margin:0 0 8px 0;">${ms.contents}</p>
              <p style="font-size:11px; color:#a1a1aa; margin:0 0 2px 0; text-transform:uppercase; letter-spacing:0.05em;">Significance</p>
              <p style="font-size:12px; color:#3f3f46; margin:0 0 8px 0;">${ms.significance}</p>
              <p style="font-size:11px; color:#a1a1aa; margin:0 0 2px 0; text-transform:uppercase; letter-spacing:0.05em;">Repository</p>
              <p style="font-size:12px; color:#3f3f46; margin:0;">${ms.repository}</p>
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
