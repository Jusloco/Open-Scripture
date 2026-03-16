import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllClaims, getClaimBySlug } from '@/lib/claims'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  BookOpen,
  Quote,
  Scroll,
  ArrowRight,
  FileText,
  Users,
} from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const claims = getAllClaims()
  return claims.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const claim = getClaimBySlug(slug)
  if (!claim) return { title: 'Claim Not Found — OpenScripture' }
  return {
    title: `"${claim.claim}" — Claim Checker | OpenScripture`,
    description: claim.short_answer.slice(0, 160),
  }
}

const verdictConfig = {
  REFUTED: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
    icon: CheckCircle,
    iconColor: 'text-emerald-700',
    heroBorder: 'border-emerald-200',
    heroBg: 'bg-emerald-50',
  },
  'PARTIALLY TRUE': {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    icon: AlertTriangle,
    iconColor: 'text-amber-700',
    heroBorder: 'border-amber-200',
    heroBg: 'bg-amber-50',
  },
  MISLEADING: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    icon: AlertTriangle,
    iconColor: 'text-amber-700',
    heroBorder: 'border-amber-200',
    heroBg: 'bg-amber-50',
  },
  'TRUE BUT MISUNDERSTOOD': {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
    icon: HelpCircle,
    iconColor: 'text-amber-700',
    heroBorder: 'border-amber-200',
    heroBg: 'bg-amber-50',
  },
} as const

// Parse a verse reference like "John 8:58" into a URL path /john/8/58
function verseToPath(ref: string): string | null {
  const match = ref.match(/John\s+(\d+):(\d+)/i)
  if (!match) return null
  return `/john/${match[1]}/${match[2]}`
}

// Icon pool for evidence cards
const evidenceIcons = [Shield, BookOpen, FileText, Users, Scroll]

export default async function ClaimPage({ params }: Props) {
  const { slug } = await params
  const claim = getClaimBySlug(slug)
  if (!claim) notFound()

  const config = verdictConfig[claim.verdict]
  const VerdictIcon = config.icon

  const allClaims = getAllClaims()
  const currentIndex = allClaims.findIndex(c => c.slug === slug)
  const prevClaim = currentIndex > 0 ? allClaims[currentIndex - 1] : null
  const nextClaim = currentIndex < allClaims.length - 1 ? allClaims[currentIndex + 1] : null

  // Split full_explanation into paragraphs
  const paragraphs = claim.full_explanation.split('\n\n').filter(Boolean)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
        <Link href="/claims" className="hover:text-zinc-600 transition-colors">Claim Checker</Link>
        <span>/</span>
        <span className="text-zinc-500 truncate max-w-xs">{claim.verdict}</span>
      </nav>

      {/* Hero */}
      <div className={`rounded-2xl border ${config.heroBorder} ${config.heroBg} p-8 mb-8`}>
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 flex-shrink-0 mt-0.5">
            <VerdictIcon className={`h-5 w-5 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">The Claim</p>
            <h1 className="text-2xl font-bold text-zinc-900 leading-snug mb-5 sm:text-3xl">
              &ldquo;{claim.claim}&rdquo;
            </h1>

            {/* Verdict badge */}
            <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${config.badge}`}>
              <span className={`h-2 w-2 rounded-full ${config.dot}`} />
              {claim.verdict}
            </span>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="rounded-xl border border-amber-700/20 bg-amber-700/5 p-6 mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700/70 mb-3">
          Short Answer
        </p>
        <p className="text-zinc-700 leading-relaxed text-[15px]">{claim.short_answer}</p>
      </div>

      {/* Full Explanation */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-5 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-amber-700" />
          Full Analysis
        </h2>
        <div className="space-y-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-zinc-600 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Key Evidence */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-zinc-900 mb-5 flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-700" />
          Key Evidence
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {claim.key_evidence.map((point, i) => {
            const EvidenceIcon = evidenceIcons[i % evidenceIcons.length]
            return (
              <div
                key={i}
                className="rounded-xl border border-zinc-200 bg-white p-5"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-amber-700/10">
                  <EvidenceIcon className="h-4 w-4 text-amber-700" />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2 text-sm leading-snug">{point.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{point.detail}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Scholarly Quote */}
      <div className="mb-10 rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <Quote className="h-6 w-6 text-amber-700/50 flex-shrink-0 mt-1" />
          <div>
            <blockquote className="text-zinc-700 leading-relaxed italic text-[15px] mb-4">
              &ldquo;{claim.scholarly_quote.quote}&rdquo;
            </blockquote>
            <div>
              <p className="font-semibold text-zinc-900 text-sm">{claim.scholarly_quote.scholar}</p>
              <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{claim.scholarly_quote.credentials}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-10">
        {/* Relevant Manuscripts */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
            <Scroll className="h-4 w-4" />
            Manuscripts Cited
          </h2>
          <div className="space-y-2">
            {claim.relevant_manuscripts.map(ms => (
              <Link
                key={ms}
                href="/manuscripts"
                className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-200 hover:text-amber-700 transition-all group"
              >
                <span>{ms}</span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-600 group-hover:text-amber-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Related Verses */}
        {claim.related_verses.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Related Verses
            </h2>
            <div className="space-y-2">
              {claim.related_verses.map(ref => {
                const path = verseToPath(ref)
                if (!path) {
                  return (
                    <div key={ref} className="rounded-lg bg-zinc-100 px-3 py-2.5 text-sm text-zinc-500">
                      {ref}
                    </div>
                  )
                }
                return (
                  <Link
                    key={ref}
                    href={path}
                    className="flex items-center justify-between rounded-lg bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-200 hover:text-amber-700 transition-all group"
                  >
                    <span>{ref}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-amber-700 transition-colors" />
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-amber-700/20 bg-amber-700/5 p-8 mb-12 text-center">
        <h3 className="font-bold text-zinc-900 text-lg mb-2">Explore the manuscripts yourself</h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-5 max-w-lg mx-auto">
          Don&apos;t take our word for it. Browse the actual manuscript evidence — P52, P66, Codex Sinaiticus, Vaticanus — and see what they say.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/manuscripts"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 transition-colors"
          >
            Browse Manuscripts
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/claims"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:border-zinc-400 hover:text-zinc-900 transition-colors"
          >
            All Claims
          </Link>
        </div>
      </div>

      {/* Claim navigation */}
      <div className="flex items-center justify-between border-t border-zinc-200 pt-8">
        {prevClaim ? (
          <Link
            href={`/claims/${prevClaim.slug}`}
            className="group flex flex-col items-start max-w-[45%]"
          >
            <span className="text-xs text-zinc-400 mb-1">← Previous</span>
            <span className="text-sm text-zinc-500 group-hover:text-zinc-700 transition-colors line-clamp-1">
              &ldquo;{prevClaim.claim}&rdquo;
            </span>
          </Link>
        ) : <div />}

        {nextClaim ? (
          <Link
            href={`/claims/${nextClaim.slug}`}
            className="group flex flex-col items-end max-w-[45%]"
          >
            <span className="text-xs text-zinc-400 mb-1">Next →</span>
            <span className="text-sm text-zinc-500 group-hover:text-zinc-700 transition-colors line-clamp-1 text-right">
              &ldquo;{nextClaim.claim}&rdquo;
            </span>
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
