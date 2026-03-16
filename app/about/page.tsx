import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Mission & Methodology',
  description: 'Why this project exists, how the data is sourced, and the principles behind it.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12">
        <p className="text-sm text-amber-700 font-medium mb-2">Open Source · MIT License</p>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">About This Project</h1>
        <p className="text-zinc-500 leading-relaxed">
          What this is, why it exists, and how to trust it.
        </p>
      </div>

      <div className="prose prose-zinc max-w-none space-y-10">
        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">The Problem</h2>
          <p className="text-zinc-500 leading-relaxed">
            Hundreds of millions of people believe the Bible was &quot;changed over time&quot; — not because the evidence supports it, but because the evidence proving the opposite is buried in clunky academic tools. The manuscript data, textual criticism, and Church Father citations are all publicly available, but there is no modern, clean, intuitive interface for a curious non-scholar to verify a verse.
          </p>
          <p className="text-zinc-500 leading-relaxed mt-4">
            A student, journalist, or skeptic doubts John 1:1. Where do they go to verify it? Nowhere good. This project fixes that.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">The Vision</h2>
          <p className="text-zinc-500 leading-relaxed">
            Think of this as <strong className="text-zinc-800">&quot;GitHub for Scripture&quot;</strong> — an open-source, Wikipedia-style public good that lets anyone check the manuscript evidence behind any Bible verse. The MVP covers the Gospel of John as a proof of concept. The full New Testament is next.
          </p>
          <div className="mt-4 rounded-xl border border-amber-700/20 bg-amber-700/5 p-5">
            <p className="text-amber-700 font-semibold mb-1">Tagline</p>
            <p className="text-zinc-800 text-lg italic">
              &quot;The Bible is the best-documented text in ancient history. You should be able to verify that in 30 seconds.&quot;
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">The Honesty Principle</h2>
          <p className="text-zinc-500 leading-relaxed mb-4">
            This project is radically honest about disputed passages. If a passage does not appear in the earliest manuscripts, we say so — clearly, in plain English, without hedging.
          </p>
          <div className="rounded-xl border border-red-200 bg-red-50 p-5">
            <p className="text-sm font-semibold text-red-700 mb-2">Example: John 7:53–8:11</p>
            <p className="text-zinc-700 italic leading-relaxed text-sm">
              &quot;This passage does not appear in the earliest manuscripts. It was likely added centuries later. That is why modern Bibles put it in brackets. No Christian doctrine stands or falls on this passage.&quot;
            </p>
          </div>
          <p className="text-zinc-500 leading-relaxed mt-4">
            This honesty is a feature, not a weakness. A site willing to say the hard thing can be trusted when it says everything else checks out.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">Data Sources</h2>
          <div className="space-y-3">
            {[
              { name: 'INTF Kurzgefasste Liste', desc: 'Institut für Neutestamentliche Textforschung — the authoritative registry of all known Greek NT manuscripts.', href: null },
              { name: 'NA28 / UBS5 Critical Apparatus', desc: 'The Nestle-Aland 28th Edition and United Bible Societies 5th Edition — the standard critical texts used by scholars worldwide.', href: null },
              { name: 'CSNTM', desc: 'Center for the Study of New Testament Manuscripts — high-resolution digital images of NT manuscripts.', href: 'https://csntm.org' },
              { name: 'Codex Sinaiticus Project', desc: 'Online edition of the oldest complete NT manuscript, digitized by the British Library.', href: 'https://codexsinaiticus.org' },
              { name: 'British Library Digitised Manuscripts', desc: 'Codex Alexandrinus and other key manuscripts in high resolution.', href: 'https://www.bl.uk/manuscripts' },
            ].map(source => (
              <div key={source.name} className="rounded-lg border border-zinc-200 bg-white p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-zinc-800 mb-1">{source.name}</p>
                    <p className="text-sm text-zinc-500 leading-relaxed">{source.desc}</p>
                  </div>
                  {source.href && (
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-700 hover:text-amber-600 flex-shrink-0 transition-colors"
                    >
                      Visit →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-900 mb-3">Model &amp; License</h2>
          <ul className="space-y-2 text-zinc-500">
            <li className="flex items-start gap-2"><span className="text-amber-700 mt-1">·</span> Open source — MIT License</li>
            <li className="flex items-start gap-2"><span className="text-amber-700 mt-1">·</span> No ads, ever</li>
            <li className="flex items-start gap-2"><span className="text-amber-700 mt-1">·</span> Community-edited data (Wikipedia model)</li>
            <li className="flex items-start gap-2"><span className="text-amber-700 mt-1">·</span> Donation-supported (GitHub Sponsors / Open Collective)</li>
            <li className="flex items-start gap-2"><span className="text-amber-700 mt-1">·</span> No login required to read anything</li>
          </ul>
        </section>

        <div className="flex gap-4 pt-4">
          <Link href="/contribute" className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition-colors">
            Contribute Data
          </Link>
          <Link href="/john" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-zinc-400 transition-colors">
            Browse John
          </Link>
        </div>
      </div>
    </div>
  )
}
