import Link from 'next/link'
import VerseSearchBar from '@/components/VerseSearchBar'
import { getBookData, getMarkBookData, getLukeBookData } from '@/lib/data'
import { BookOpen, Shield, Users, GitBranch, Scroll, Map, BookText } from 'lucide-react'
import witnessesRaw from '@/data/manuscript-witnesses.json'

interface ManuscriptWitness {
  id: string
  date_year: number
  type: string
  language: string
}

export default function HomePage() {
  const book = getBookData()
  const markBook = getMarkBookData()
  const lukeBook = getLukeBookData()

  const witnesses = witnessesRaw as ManuscriptWitness[]
  const p52 = witnesses.find(w => w.id === 'p52')
  const greekCount = witnesses.filter(w => w.language === 'Greek').length

  const quickLinks = [
    { ref: 'John 1:1', href: '/john/1/1', desc: 'The most debated verse in the Bible' },
    { ref: 'John 3:16', href: '/john/3/16', desc: 'The most famous verse in the Bible' },
    { ref: 'John 7:53–8:11', href: '/john/7/53', desc: 'The woman caught in adultery' },
    { ref: 'John 11:35', href: '/john/11/35', desc: '"Jesus wept" — shortest verse' },
    { ref: 'John 14:6', href: '/john/14/6', desc: '"I am the way, the truth, and the life"' },
  ]

  return (
    <div>
      {/* Hero — dark, full-impact */}
      <section className="relative overflow-hidden bg-zinc-950 min-h-[85vh] flex items-center">
        {/* Faded manuscript background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/3/32/P52_recto.jpg)',
            opacity: 0.07,
          }}
        />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#92400e18_0%,_transparent_65%)]" />

        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-700/10 px-4 py-1.5 text-xs text-amber-400 mb-8 font-medium tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            5,800+ Greek manuscripts. Open access.
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight mb-6">
            The most documented text
            <br />
            <span className="text-amber-400">in ancient history.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-zinc-300 leading-relaxed mb-10">
            Every Bible manuscript ever found — in your browser, for free.
            <br className="hidden sm:block" />
            Judge the evidence yourself.
          </p>

          <VerseSearchBar />

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/john/1"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
            >
              Start with John 1 →
            </Link>
            <Link
              href="/manuscripts"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-400 hover:text-white transition-colors"
            >
              Explore the Manuscripts
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar — immediately below hero */}
      <section className="border-y border-zinc-200 bg-zinc-100/50">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <div>
              <p className="text-3xl font-bold text-amber-700">25,000+</p>
              <p className="text-sm text-zinc-500 mt-1">Total manuscripts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700">~100 AD</p>
              <p className="text-sm text-zinc-500 mt-1">Earliest fragment</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700">5,800+</p>
              <p className="text-sm text-zinc-500 mt-1">Greek manuscripts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700">40+</p>
              <p className="text-sm text-zinc-500 mt-1">Languages &amp; dialects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Claim vs. Evidence */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 mb-3">The claim vs. the evidence</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            You&rsquo;ve heard the skeptic talking points. Here&rsquo;s what the actual manuscripts say.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Skeptic claims */}
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 flex-shrink-0" />
              <h3 className="font-semibold text-zinc-800 text-lg">What skeptics say</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Scribes changed the text over centuries',
                "We don't have the originals",
                'The Bible has thousands of errors',
                'Constantine decided what was Scripture',
              ].map(claim => (
                <li key={claim} className="flex items-start gap-3 text-zinc-600 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {claim}
                </li>
              ))}
            </ul>
          </div>

          {/* Manuscript evidence */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-600 flex-shrink-0" />
              <h3 className="font-semibold text-zinc-800 text-lg">What the manuscripts show</h3>
            </div>
            <ul className="space-y-4">
              {[
                `P52 dates to ~${p52?.date_year ?? 125} AD — within 30 years of composition`,
                `${greekCount > 0 ? greekCount + '+' : '5,800+'} Greek copies agree on 99.5% of the text`,
                'Variants are catalogued, explained, and visible here',
                'No church council "invented" the core text',
              ].map(point => (
                <li key={point} className="flex items-start gap-3 text-zinc-700 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tools showcase */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-3">Explore the evidence yourself</h2>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Three tools. Zero paywalls. All built on primary sources.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700/10">
                <Scroll className="h-5 w-5 text-amber-700" />
              </div>
              <h3 className="font-semibold text-zinc-900 text-lg mb-2">Manuscript Viewer</h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                Open actual scans of 2nd-century papyri. See the ink, the handwriting, the history.
              </p>
              <Link
                href="/john/1"
                className="mt-5 inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-600 transition-colors"
              >
                Explore John 1 →
              </Link>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700/10">
                <Map className="h-5 w-5 text-amber-700" />
              </div>
              <h3 className="font-semibold text-zinc-900 text-lg mb-2">World Map</h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                91 manuscript locations plotted across the ancient world — Egypt, Rome, Constantinople, and beyond.
              </p>
              <Link
                href="/manuscripts"
                className="mt-5 inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-600 transition-colors"
              >
                Open the Manuscripts →
              </Link>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 flex flex-col">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700/10">
                <BookText className="h-5 w-5 text-amber-700" />
              </div>
              <h3 className="font-semibold text-zinc-900 text-lg mb-2">Verse Evidence</h3>
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                Every key verse: earliest copies, manuscript counts, Church Father citations, and variants explained plainly.
              </p>
              <Link
                href="/john/1/1"
                className="mt-5 inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-600 transition-colors"
              >
                Try John 1:1 →
              </Link>
            </div>
          </div>
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
              className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all duration-200"
            >
              <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors mb-1">{link.ref}</p>
              <p className="text-sm text-zinc-500">{link.desc}</p>
            </Link>
          ))}
          <Link
            href="/compare"
            className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all duration-200"
          >
            <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors mb-1">NT vs. Caesar &amp; Plato</p>
            <p className="text-sm text-zinc-500">How does the NT compare to other ancient texts?</p>
          </Link>
          <Link
            href="/manuscripts"
            className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all duration-200"
          >
            <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors mb-1">Key Manuscripts</p>
            <p className="text-sm text-zinc-500">P52, P66, Sinaiticus, Vaticanus and more</p>
          </Link>
          <Link
            href="/timeline"
            className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-amber-700/30 hover:bg-zinc-50 hover:scale-[1.02] transition-all duration-200"
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

      {/* Bottom CTA banner */}
      <section className="bg-zinc-950 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-amber-400 mb-4">
            Don&rsquo;t take anyone&rsquo;s word for it — including ours.
          </h2>
          <p className="text-zinc-300 text-lg mb-8">
            The manuscripts are here. Explore them yourself.
          </p>
          <Link
            href="/john/1"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-8 py-4 text-base font-semibold text-white hover:bg-amber-500 transition-colors"
          >
            Open John 1 — the most examined chapter in history →
          </Link>
        </div>
      </section>
    </div>
  )
}
