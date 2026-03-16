import Link from 'next/link'
import VerseSearchBar from '@/components/VerseSearchBar'
import { getBookData, getMarkBookData, getLukeBookData } from '@/lib/data'
import { BookOpen, Shield, Users, GitBranch } from 'lucide-react'

export default function HomePage() {
  const book = getBookData()
  const markBook = getMarkBookData()
  const lukeBook = getLukeBookData()

  const quickLinks = [
    { ref: 'John 1:1', href: '/john/1/1', desc: 'The most debated verse in the Bible' },
    { ref: 'John 3:16', href: '/john/3/16', desc: 'The most famous verse in the Bible' },
    { ref: 'John 7:53–8:11', href: '/john/7/53', desc: 'The woman caught in adultery' },
    { ref: 'John 11:35', href: '/john/11/35', desc: '"Jesus wept" — shortest verse' },
    { ref: 'John 14:6', href: '/john/14/6', desc: '"I am the way, the truth, and the life"' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#92400e15_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/20 bg-amber-700/5 px-3 py-1 text-xs text-amber-700 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
            Now covering John · Mark · Luke — {book.chapters.length + markBook.chapters.length + lukeBook.chapters.length} chapters · {Object.keys(book.key_verses).length + Object.keys(markBook.key_verses).length + Object.keys(lukeBook.key_verses).length}+ key verses documented
          </div>

          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl leading-tight mb-6">
            The Bible is the best-documented{' '}
            <span className="text-amber-700">ancient text</span>{' '}
            in history.
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-zinc-500 leading-relaxed mb-10">
            You should be able to verify that in 30 seconds. Look up any verse in the Gospel of John and see exactly what the manuscript evidence says — earliest copies, Church Father citations, and textual variants explained in plain English.
          </p>

          <VerseSearchBar />

          <p className="mt-4 text-sm text-zinc-400">
            Or browse the{' '}
            <Link href="/john" className="text-amber-700/70 hover:text-amber-700 underline underline-offset-2 transition-colors">
              full Gospel of John
            </Link>
          </p>
        </div>
      </section>

      {/* Quick links */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-6">
          Start with these verses
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all transition-transform duration-200"
            >
              <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors mb-1">{link.ref}</p>
              <p className="text-sm text-zinc-500">{link.desc}</p>
            </Link>
          ))}
          <Link
            href="/compare"
            className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all transition-transform duration-200"
          >
            <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors mb-1">NT vs. Caesar &amp; Plato</p>
            <p className="text-sm text-zinc-500">How does the NT compare to other ancient texts?</p>
          </Link>
          <Link
            href="/manuscripts"
            className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all transition-transform duration-200"
          >
            <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors mb-1">Key Manuscripts</p>
            <p className="text-sm text-zinc-500">P52, P66, Sinaiticus, Vaticanus and more</p>
          </Link>
          <Link
            href="/timeline"
            className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all transition-transform duration-200"
          >
            <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors mb-1">Manuscript Timeline</p>
            <p className="text-sm text-zinc-500">100 AD to 500 AD — visualized</p>
          </Link>
        </div>
      </section>

      {/* Browse by Book */}
      <section className="mx-auto max-w-4xl px-4 pb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-6">
          Browse by Book
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* John */}
          <Link
            href="/john"
            className="group rounded-xl border border-zinc-200 bg-white p-5 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">Gospel of John</p>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 font-medium">Live</span>
            </div>
            <p className="text-xs text-zinc-500 mb-3">21 chapters · {Object.keys(book.key_verses).length} key verses</p>
            <p className="text-xs text-zinc-400">Covers P52, P66, P75, the Pericope Adulterae, and more</p>
          </Link>

          {/* Mark */}
          <Link
            href="/mark"
            className="group rounded-xl border border-zinc-200 bg-white p-5 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">Gospel of Mark</p>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 font-medium">Live</span>
            </div>
            <p className="text-xs text-zinc-500 mb-3">16 chapters · {Object.keys(markBook.key_verses).length} key verses</p>
            <p className="text-xs text-zinc-400">Includes the disputed Long Ending (16:9–20) and Mark 1:1</p>
          </Link>

          {/* Luke */}
          <Link
            href="/luke"
            className="group rounded-xl border border-zinc-200 bg-white p-5 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">Gospel of Luke</p>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700 font-medium">Live</span>
            </div>
            <p className="text-xs text-zinc-500 mb-3">24 chapters · {Object.keys(lukeBook.key_verses).length} key verses</p>
            <p className="text-xs text-zinc-400">Covers the Bloody Sweat, &ldquo;Father forgive them,&rdquo; and more</p>
          </Link>

          {/* Coming Soon */}
          <div className="rounded-xl border border-zinc-200/50 bg-zinc-50 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-zinc-400">More Books</p>
              <span className="rounded-full bg-zinc-200 px-2 py-0.5 text-xs text-zinc-500 font-medium">Soon</span>
            </div>
            <p className="text-xs text-zinc-400 mb-3">Matthew, Acts, Romans, and more</p>
            <p className="text-xs text-zinc-300">Expanding to cover the full New Testament</p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-zinc-200 bg-zinc-100/50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <div className="animate-fade-in-up delay-100">
              <p className="text-3xl font-bold text-amber-700">25,000+</p>
              <p className="text-sm text-zinc-500 mt-1">Total manuscripts</p>
            </div>
            <div className="animate-fade-in-up delay-200">
              <p className="text-3xl font-bold text-amber-700">~100 AD</p>
              <p className="text-sm text-zinc-500 mt-1">Earliest fragment</p>
            </div>
            <div className="animate-fade-in-up delay-200">
              <p className="text-3xl font-bold text-amber-700">5,800+</p>
              <p className="text-sm text-zinc-500 mt-1">Greek manuscripts</p>
            </div>
            <div className="animate-fade-in-up delay-300">
              <p className="text-3xl font-bold text-amber-700">40+</p>
              <p className="text-sm text-zinc-500 mt-1">Languages &amp; dialects</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-2xl font-bold text-zinc-900 mb-10 text-center">How it works</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, title: 'Look up a verse', desc: 'Search by reference or browse chapter by chapter.' },
            { icon: Shield, title: 'See the evidence', desc: 'Manuscript counts, dates, earliest copies, and Church Father citations.' },
            { icon: GitBranch, title: 'Understand variants', desc: 'Plain-English explanations of textual differences — no jargon.' },
            { icon: Users, title: 'Radically honest', desc: 'Disputed passages are labeled and explained. That honesty builds trust.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-zinc-200 bg-white p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-700/10">
                <Icon className="h-5 w-5 text-amber-700" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-1">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Honesty callout */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <div className="flex items-start gap-3 mb-4">
            <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-500" />
            <h3 className="text-lg font-semibold text-zinc-900">Example of radical honesty: John 7:53–8:11</h3>
          </div>
          <blockquote className="text-zinc-700 leading-relaxed border-l-2 border-red-400/40 pl-4 italic mb-4">
            &quot;This passage — the woman caught in adultery — does not appear in the earliest manuscripts. It was likely added centuries later. That is why modern Bibles put it in brackets. No Christian doctrine stands or falls on this passage.&quot;
          </blockquote>
          <p className="text-sm text-zinc-500">
            This honesty is a feature, not a weakness. If a site is willing to say the hard thing, you can trust it when it says everything else is solid.
          </p>
          <Link href="/john/7/53" className="mt-4 inline-block text-sm text-amber-700 hover:text-amber-600 transition-colors">
            See the full evidence for John 7:53 →
          </Link>
        </div>
      </section>
    </div>
  )
}
