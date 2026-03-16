import type { Metadata } from 'next'
import Link from 'next/link'
import { GitBranch, Database, BookOpen, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contribute',
  description: 'How to contribute data, code, or funding to the OpenScripture project.',
}

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12">
        <p className="text-sm text-amber-700 font-medium mb-2">Open Source · Community Driven</p>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Contribute</h1>
        <p className="text-zinc-500 leading-relaxed">
          This project runs on the Wikipedia model — anyone can contribute data or code, with a review process to ensure accuracy. Here&apos;s how.
        </p>
      </div>

      <div className="space-y-6">
        {[
          {
            icon: Database,
            title: 'Add or correct manuscript data',
            color: 'text-amber-700',
            bg: 'bg-amber-700/10',
            steps: [
              'Fork the repository on GitHub',
              'Edit the JSON files in /data/ — each verse has a structured format',
              'Include your source (INTF, NA28 apparatus, published textual criticism)',
              'Submit a pull request with a description of what you changed and why',
              'A maintainer will review for accuracy before merging',
            ],
          },
          {
            icon: GitBranch,
            title: 'Contribute code',
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            steps: [
              'Check open issues on GitHub for features or bugs',
              'Comment on an issue to claim it before starting',
              'Fork, branch, build, and submit a PR',
              'Stack: Next.js 14 (App Router), TypeScript, Tailwind CSS',
              'All contributions welcome — UI, performance, accessibility',
            ],
          },
          {
            icon: BookOpen,
            title: 'Add a new book',
            color: 'text-violet-600',
            bg: 'bg-violet-50',
            steps: [
              'The MVP covers only the Gospel of John',
              'Next priority: the rest of the New Testament (27 books)',
              'Data format is the same — copy /data/john.json as a template',
              'Open an issue to coordinate before starting a new book',
            ],
          },
          {
            icon: Users,
            title: 'Support the project financially',
            color: 'text-emerald-700',
            bg: 'bg-emerald-50',
            steps: [
              'This project is free, open-source, and ad-free',
              'Hosting, domain, and maintenance costs are real',
              'Consider sponsoring via GitHub Sponsors or Open Collective',
              'Even $5/month helps keep the lights on',
            ],
          },
        ].map(({ icon: Icon, title, color, bg, steps }) => (
          <div key={title} className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h2 className="font-semibold text-zinc-900">{title}</h2>
            </div>
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-500">
                  <span className={`font-mono text-xs ${color} mt-0.5 flex-shrink-0`}>{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* Data format example */}
      <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Data Format Example</p>
        <pre className="overflow-x-auto text-xs text-zinc-500 leading-relaxed bg-zinc-50 rounded-lg p-4">
{`{
  "reference": "John 3:16",
  "confidence": "green",
  "greek_manuscripts": 1650,
  "latin_manuscripts": 8000,
  "earliest_manuscript": {
    "name": "P66",
    "date": "~175 AD",
    "location": "Bodmer Library, Geneva"
  },
  "earliest_church_father_citation": {
    "author": "Origen",
    "date": "~230 AD"
  },
  "variants": [],
  "plain_english_summary": "..."
}`}
        </pre>
      </div>

      <div className="mt-8 flex gap-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
        >
          View on GitHub
        </a>
        <Link href="/about" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-zinc-400 transition-colors">
          Read the methodology
        </Link>
      </div>
    </div>
  )
}
