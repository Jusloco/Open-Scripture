'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/john', label: 'Gospel of John' },
  { href: '/search', label: 'Search' },
  { href: '/ask', label: 'Ask Scholar' },
  { href: '/manuscripts', label: 'Manuscripts' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/map', label: 'Map' },
  { href: '/claims', label: 'Claim Checker' },
  { href: '/compare', label: 'Compare' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur" ref={menuRef}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-amber-700 text-xl font-bold tracking-tight">Open</span>
          <span className="text-zinc-500 text-xl font-bold tracking-tight">Scripture</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm transition-colors',
                pathname.startsWith(link.href)
                  ? 'text-amber-700'
                  : 'text-zinc-500 hover:text-zinc-900'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Support button — always visible */}
          <a
            href="https://github.com/sponsors"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-amber-700/30 px-3 py-1.5 text-xs text-amber-700 hover:bg-amber-700/10 transition-colors"
          >
            Support
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center rounded-md p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 transition-colors"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-zinc-200 bg-white/95 backdrop-blur',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'rounded-md px-3 py-2.5 text-sm transition-colors',
                pathname.startsWith(link.href)
                  ? 'text-amber-700 bg-amber-700/5'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 pt-2 border-t border-zinc-200">
            <a
              href="https://github.com/sponsors"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm text-amber-700 hover:bg-amber-700/10 transition-colors"
            >
              Support this project
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
