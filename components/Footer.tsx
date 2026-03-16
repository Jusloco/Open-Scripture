import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-700 font-bold">OpenScripture</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              An open-source, Wikipedia-style resource for verifying the manuscript evidence behind Bible verses. MIT Licensed.
            </p>
          </div>

          <div>
            <h4 className="text-zinc-700 font-medium mb-3 text-sm">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: '/john', label: 'Gospel of John' },
                { href: '/compare', label: 'Compare Ancient Texts' },
                { href: '/ask', label: 'Ask Scholar' },
                { href: '/about', label: 'About & Methodology' },
                { href: '/contribute', label: 'Contribute Data' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-zinc-700 font-medium mb-3 text-sm">Data Sources</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="https://csntm.org" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 transition-colors">CSNTM — Manuscript Images</a></li>
              <li><a href="https://codexsinaiticus.org" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 transition-colors">Codex Sinaiticus Project</a></li>
              <li><a href="https://www.bl.uk/manuscripts" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 transition-colors">British Library Manuscripts</a></li>
              <li><span className="text-zinc-400">INTF Kurzgefasste Liste</span></li>
              <li><span className="text-zinc-400">NA28 / UBS5 Critical Apparatus</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            Open source · MIT License · No ads, ever
          </p>
          <a
            href="https://github.com/sponsors"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-700/70 hover:text-amber-700 transition-colors"
          >
            Support this project
          </a>
        </div>
      </div>
    </footer>
  )
}
