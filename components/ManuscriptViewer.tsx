'use client'

import { useEffect, useRef } from 'react'
import type OpenSeadragonType from 'openseadragon'

interface Props {
  imageUrl: string
  manuscriptName: string
  activeVerse?: number
  totalVerses?: number
}

export function ManuscriptViewer({ imageUrl, manuscriptName, activeVerse, totalVerses }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<OpenSeadragonType.Viewer | null>(null)
  const osdRef = useRef<typeof OpenSeadragonType | null>(null)

  useEffect(() => {
    if (!containerRef.current || viewerRef.current) return

    import('openseadragon').then((OSD) => {
      if (!containerRef.current) return
      osdRef.current = OSD.default
      viewerRef.current = OSD.default({
        element: containerRef.current,
        tileSources: { type: 'image', url: imageUrl },
        showNavigationControl: true,
        showZoomControl: true,
        showHomeControl: true,
        showFullPageControl: false,
        navigationControlAnchor: OSD.default.ControlAnchor.BOTTOM_RIGHT,
        gestureSettingsTouch: { pinchRotate: false },
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 4,
        minZoomLevel: 0.5,
        visibilityRatio: 0.5,
      })
    })

    return () => {
      viewerRef.current?.destroy()
      viewerRef.current = null
      osdRef.current = null
    }
  }, [imageUrl])

  useEffect(() => {
    if (!activeVerse || !totalVerses || !viewerRef.current || !osdRef.current) return
    const OSD = osdRef.current
    const y = Math.max(0.02, Math.min(0.98, (activeVerse - 0.5) / totalVerses))
    viewerRef.current.viewport.panTo(new OSD.Point(0.5, y), false)
    viewerRef.current.viewport.applyConstraints(true)
  }, [activeVerse, totalVerses])

  return (
    <div className="relative w-full h-full bg-zinc-950">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-3 text-xs text-zinc-500 pointer-events-none select-none bg-zinc-950/60 px-2 py-0.5 rounded">
        {manuscriptName}
      </div>
    </div>
  )
}
