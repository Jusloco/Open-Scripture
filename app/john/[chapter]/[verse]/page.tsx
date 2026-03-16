import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVerseData, getDefaultVerseData, getChapterData } from '@/lib/data'
import ConfidenceBadge from '@/components/ConfidenceBadge'
import ManuscriptCard from '@/components/ManuscriptCard'
import ManuscriptCountBar from '@/components/ManuscriptCountBar'
import { totalManuscripts } from '@/lib/utils'
import { AlertTriangle, BookOpen, Quote } from 'lucide-react'
import AskScholar from '@/components/AskScholar'
import { VerseReader } from '@/components/VerseReader'
import { ManuscriptWitnessList } from '@/components/ManuscriptWitnessList'
import { getWitnessesForVerse, groupWitnessesByType, getImagedManuscripts } from '@/lib/manuscripts'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ chapter: string; verse: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter, verse } = await params
  const c = parseInt(chapter)
  const v = parseInt(verse)
  const data = getVerseData(c, v) || getDefaultVerseData(c, v)
  return {
    title: `John ${c}:${v} — OpenScripture`,
    description: data.plain_english_summary.slice(0, 160),
  }
}

export default async function VersePage({ params }: Props) {
  const { chapter, verse } = await params
  const chapterNum = parseInt(chapter)
  const verseNum = parseInt(verse)

  if (isNaN(chapterNum) || isNaN(verseNum)) notFound()

  const chapterData = getChapterData(chapterNum)
  if (!chapterData) notFound()
  if (verseNum < 1 || verseNum > chapterData.verse_count) notFound()

  const verseData = getVerseData(chapterNum, verseNum) || getDefaultVerseData(chapterNum, verseNum)
  const total = totalManuscripts(verseData)

  const prevVerse = verseNum > 1 ? verseNum - 1 : null
  const nextVerse = verseNum < chapterData.verse_count ? verseNum + 1 : null

  // Manuscript witness data (computed server-side, passed to client components)
  const allWitnesses = getWitnessesForVerse('John', chapterNum, verseNum)
  const groupedWitnesses = groupWitnessesByType(allWitnesses)
  const imagedManuscripts = getImagedManuscripts(allWitnesses)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-8">
        <Link href="/john" className="hover:text-zinc-600 transition-colors">John</Link>
        <span>/</span>
        <Link href={`/john/${chapterNum}`} className="hover:text-zinc-600 transition-colors">Chapter {chapterNum}</Link>
        <span>/</span>
        <span className="text-zinc-500">Verse {verseNum}</span>
      </nav>

      {/* Disputed banner */}
      {verseData.bracketed && (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-700 mb-1">Bracketed Passage</p>
            <p className="text-sm text-red-600/80 leading-relaxed">{verseData.bracket_note}</p>
          </div>
        </div>
      )}

      {/* Verse header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h1 className="text-2xl font-bold text-zinc-900">{verseData.reference}</h1>
          <ConfidenceBadge level={verseData.confidence} size="md" />
        </div>

        {verseData.text && (
          <blockquote className="border-l-4 border-amber-700/40 pl-5 py-1">
            <p className="text-xl text-zinc-800 leading-relaxed italic">&ldquo;{verseData.text}&rdquo;</p>
            <p className="text-sm text-zinc-400 mt-2">King James Version (1769) — Public Domain</p>
          </blockquote>
        )}
      </div>

      {/* Split-screen Verse Reader */}
      <div className="mb-10">
        <VerseReader
          wordPairs={verseData.greek_words ?? []}
          imagedManuscripts={imagedManuscripts}
          fallbackManuscript={verseData.earliest_manuscript}
        />
      </div>

      {/* Confidence description */}
      <ConfidenceBadge level={verseData.confidence} showDescription size="lg" />

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Manuscript count */}
        <ManuscriptCountBar
          greek={verseData.greek_manuscripts}
          latin={verseData.latin_manuscripts}
          syriac={verseData.syriac_manuscripts}
          coptic={verseData.coptic_manuscripts}
          armenian={verseData.armenian_manuscripts}
        />

        {/* Earliest manuscript */}
        <ManuscriptCard manuscript={verseData.earliest_manuscript} />
      </div>

      {/* Church Father Citation */}
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Earliest Church Father Citation</p>
        <div className="flex items-start gap-3">
          <Quote className="h-5 w-5 text-amber-700/50 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-zinc-900">{verseData.earliest_church_father_citation.author}</p>
            <p className="text-sm text-amber-700">{verseData.earliest_church_father_citation.date}</p>
            {verseData.earliest_church_father_citation.work && (
              <p className="text-sm text-zinc-500 mt-0.5">{verseData.earliest_church_father_citation.work}</p>
            )}
            {verseData.earliest_church_father_citation.quote && (
              <p className="text-sm text-zinc-500 italic mt-2 leading-relaxed">
                &ldquo;{verseData.earliest_church_father_citation.quote}&rdquo;
              </p>
            )}
            <p className="text-xs text-zinc-400 mt-2">
              This verse was cited independently of any Bible — confirming the text existed as quoted at this date.
            </p>
          </div>
        </div>
      </div>

      {/* Variants */}
      {verseData.variants.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-zinc-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-700" />
            Textual Variants — Plain English
          </h2>
          <div className="space-y-4">
            {verseData.variants.map((variant, i) => (
              <div key={i} className="rounded-xl border border-amber-700/20 bg-amber-700/5 p-5">
                <h3 className="font-semibold text-zinc-900 mb-3">What differs?</h3>
                <p className="text-sm text-zinc-700 leading-relaxed mb-4">{variant.description}</p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-white border border-zinc-200 p-3">
                    <p className="text-xs font-semibold text-zinc-500 uppercase mb-1">Which MSS?</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">{variant.manuscripts_supporting}</p>
                  </div>
                  <div className="rounded-lg bg-white border border-zinc-200 p-3">
                    <p className="text-xs font-semibold text-zinc-500 uppercase mb-1">Scholars say</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">{variant.scholarly_consensus}</p>
                  </div>
                  <div className="rounded-lg bg-white border border-zinc-200 p-3">
                    <p className="text-xs font-semibold text-zinc-500 uppercase mb-1">Doctrinal impact</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">{variant.doctrinal_impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plain English Summary */}
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Plain English Summary</p>
        <p className="text-zinc-700 leading-relaxed">{verseData.plain_english_summary}</p>
      </div>

      {/* Manuscript Witness List */}
      <div className="mt-10">
        <ManuscriptWitnessList
          witnesses={groupedWitnesses}
          verseRef={verseData.reference}
        />
      </div>

      {/* Ask a Scholar */}
      <AskScholar />

      {/* Total count callout */}
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <p className="text-4xl font-bold text-emerald-700 mb-1">{total.toLocaleString()}+</p>
        <p className="text-sm text-zinc-500">
          manuscripts in all languages contain or support this verse
        </p>
        <p className="text-xs text-zinc-400 mt-2">
          Compare: Caesar&apos;s Gallic Wars has 251 manuscripts. Plato has 210. Homer&apos;s Iliad has 1,757.
        </p>
        <Link href="/compare" className="mt-3 inline-block text-sm text-amber-700 hover:text-amber-600 transition-colors">
          See full comparison →
        </Link>
      </div>

      {/* Verse navigation */}
      <div className="mt-12 flex items-center justify-between border-t border-zinc-200 pt-8">
        {prevVerse ? (
          <Link
            href={`/john/${chapterNum}/${prevVerse}`}
            className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            ← John {chapterNum}:{prevVerse}
          </Link>
        ) : (
          chapterNum > 1 ? (
            <Link href={`/john/${chapterNum - 1}`} className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors">
              ← Chapter {chapterNum - 1}
            </Link>
          ) : <div />
        )}

        <Link href={`/john/${chapterNum}`} className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors">
          Chapter {chapterNum}
        </Link>

        {nextVerse ? (
          <Link
            href={`/john/${chapterNum}/${nextVerse}`}
            className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            John {chapterNum}:{nextVerse} →
          </Link>
        ) : (
          chapterNum < 21 ? (
            <Link href={`/john/${chapterNum + 1}`} className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors">
              Chapter {chapterNum + 1} →
            </Link>
          ) : <div />
        )}
      </div>
    </div>
  )
}
