import Link from 'next/link'
import { getAllClaims } from '@/lib/claims'
import { Shield, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claim Checker — OpenScripture',
  description: 'The most common skeptical claims about the Bible examined against the actual manuscript evidence. What do the sources really say?',
}

const verdictConfig = {
  REFUTED: {
    color: 'emerald',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    icon: CheckCircle,
  },
  'PARTIALLY TRUE': {
    color: 'amber',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    icon: AlertTriangle,
  },
  MISLEADING: {
    color: 'amber',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    icon: AlertTriangle,
  },
  'TRUE BUT MISUNDERSTOOD': {
    color: 'amber',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    icon: HelpCircle,
  },
} as const

export default function ClaimsPage() {
  const claims = getAllClaims()

  const refuted = claims.filter(c => c.verdict === 'REFUTED').length
  const misleading = claims.filter(c => c.verdict === 'MISLEADING' || c.verdict === 'PARTIALLY TRUE').length
  const partial = claims.filter(c => c.verdict === 'TRUE BUT MISUNDERSTOOD').length

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#92400e15_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-amber-700/5 px-3 py-1 text-xs text-amber-700 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
            {claims.length} claims examined · manuscript evidence only
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl leading-tight mb-6">
            Claim{' '}
            <span className="text-amber-700">Checker</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-zinc-500 leading-relaxed mb-10">
            Every skeptical claim about the Bible you&apos;ve encountered on the internet — examined against the actual manuscript evidence, archaeological record, and scholarly consensus. No apologetics spin. Just sources.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-zinc-500">{refuted} claims refuted by evidence</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-zinc-500">{misleading} misleading or overstated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-zinc-500">{partial} true but misunderstood</span>
            </div>
          </div>
        </div>
      </section>

      {/* Claims grid */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-8">
          All claims
        </h2>

        <div className="space-y-4">
          {claims.map(claim => {
            const config = verdictConfig[claim.verdict]
            const Icon = config.icon

            return (
              <Link
                key={claim.slug}
                href={`/claims/${claim.slug}`}
                className="group block rounded-xl border border-zinc-200 bg-white p-6 hover:border-amber-700/30 hover:bg-zinc-50 transition-all duration-200"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    {/* The claim */}
                    <p className="text-base text-zinc-700 italic leading-snug mb-3 group-hover:text-zinc-900 transition-colors">
                      &ldquo;{claim.claim}&rdquo;
                    </p>

                    {/* Short answer */}
                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
                      {claim.short_answer}
                    </p>
                  </div>

                  {/* Verdict badge */}
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${config.badge}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                      {claim.verdict}
                    </span>
                    <span className="text-xs text-zinc-400 group-hover:text-amber-700/60 transition-colors">
                      Read analysis →
                    </span>
                  </div>
                </div>

                {/* Evidence count pill */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
                    {claim.key_evidence.length} evidence points
                  </span>
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
                    {claim.relevant_manuscripts.length} manuscripts cited
                  </span>
                  {claim.related_verses.length > 0 && (
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
                      {claim.related_verses.length} related verses
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Methodology callout */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-700/10 flex-shrink-0">
              <Shield className="h-4 w-4 text-amber-700" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-1">How we evaluate claims</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Every verdict is based on manuscript evidence, peer-reviewed scholarship, and — where applicable — concessions from skeptical scholars like Bart Ehrman and John Dominic Crossan. We do not hide inconvenient evidence. Where the skeptics are right, we say so.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-3 text-sm">
            <div className="rounded-lg bg-zinc-100 px-3 py-2.5">
              <p className="font-medium text-zinc-700 mb-0.5">REFUTED</p>
              <p className="text-zinc-500 text-xs">The claim contradicts the manuscript record or historical consensus</p>
            </div>
            <div className="rounded-lg bg-zinc-100 px-3 py-2.5">
              <p className="font-medium text-zinc-700 mb-0.5">MISLEADING</p>
              <p className="text-zinc-500 text-xs">Technically accurate but framed to imply a false conclusion</p>
            </div>
            <div className="rounded-lg bg-zinc-100 px-3 py-2.5">
              <p className="font-medium text-zinc-700 mb-0.5">TRUE BUT MISUNDERSTOOD</p>
              <p className="text-zinc-500 text-xs">The fact is real; the implication drawn from it is not</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
