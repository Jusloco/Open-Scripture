import Link from 'next/link'
import NextImage from 'next/image'
import { getBookData } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manuscripts — OpenScripture',
  description: 'Overview of the key manuscripts behind the Gospel of John — P52, P66, P75, P45, Codex Sinaiticus, Vaticanus, Alexandrinus, and Bezae.',
}

interface ManuscriptProfile {
  id: string
  name: string
  siglum: string
  date: string
  dateNum: number
  location: string
  material: string
  language: string
  imageUrl?: string
  institutionUrl?: string
  description: string
  johnnCoverage: string
  criticalRole: string
  confidence: 'primary' | 'secondary' | 'late'
}

const MANUSCRIPTS: ManuscriptProfile[] = [
  {
    id: 'p52',
    name: 'Papyrus 52',
    siglum: 'P52',
    date: '~100–150 AD',
    dateNum: 125,
    location: 'John Rylands Library, Manchester, UK',
    material: 'Papyrus',
    language: 'Greek',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/32/P52_recto.jpg',
    institutionUrl: 'https://www.library.manchester.ac.uk/rylands/',
    description: 'A business-card-sized fragment containing John 18:31–33 on one side and 18:37–38 on the other. The oldest known New Testament manuscript in existence.',
    johnnCoverage: 'John 18:31–33, 37–38',
    criticalRole: 'Proves the Gospel of John existed in Egypt within 50–75 years of composition. Sets the upper bound for how late John could have been written.',
    confidence: 'primary',
  },
  {
    id: 'p66',
    name: 'Papyrus Bodmer II',
    siglum: 'P66',
    date: '~175 AD',
    dateNum: 175,
    location: 'Bodmer Library, Cologny, Switzerland',
    material: 'Papyrus',
    language: 'Greek',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Papyrus_66_%28GA%29.jpg/500px-Papyrus_66_%28GA%29.jpg',
    institutionUrl: 'https://www.fondationbodmer.ch/',
    description: 'One of the most important and best-preserved papyri of the New Testament, containing most of the Gospel of John. Written in a clear scribal hand with occasional corrections.',
    johnnCoverage: 'John 1:1–6:11, 6:35b–14:26, fragments of 14–21',
    criticalRole: 'Primary witness to John 1:1 (Λόγος), 1:14, 1:18 (μονογενὴς θεός), 3:16, 8:12, 8:58, 14:6, 20:28, 21:25. Alongside P75, our oldest substantial witness to John.',
    confidence: 'primary',
  },
  {
    id: 'p75',
    name: 'Papyrus Bodmer XIV–XV',
    siglum: 'P75',
    date: '~175–225 AD',
    dateNum: 200,
    location: 'Vatican Library, Rome, Italy',
    material: 'Papyrus',
    language: 'Greek',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Papyrus_75a.gif/500px-Papyrus_75a.gif',
    institutionUrl: 'https://www.vaticanlibrary.va/',
    description: 'The most carefully copied of the early papyri, containing Luke and John. Its text is remarkably close to Codex Vaticanus, suggesting a careful scribal tradition.',
    johnnCoverage: 'John 1:1–15:8',
    criticalRole: 'Confirms the early reading of John 1:18 as μονογενὴς θεός ("only begotten God"). Its close relationship to Vaticanus shows the Alexandrian text-type was already standardized by ~200 AD.',
    confidence: 'primary',
  },
  {
    id: 'p45',
    name: 'Chester Beatty Papyrus I',
    siglum: 'P45',
    date: '~225–250 AD',
    dateNum: 237,
    location: 'Chester Beatty Library, Dublin, Ireland',
    material: 'Papyrus',
    language: 'Greek',
    institutionUrl: 'https://chesterbeatty.ie/',
    description: 'Part of the Chester Beatty collection acquired in 1930–31 — one of the most significant manuscript discoveries of the 20th century. Contains portions of all four Gospels and Acts.',
    johnnCoverage: 'John 10:7–25, 10:30–11:10, 11:18–36, 11:42–57',
    criticalRole: 'Our earliest witness to John 11:25 and 11:35. Confirms these verses\' text was stable by the mid-3rd century.',
    confidence: 'primary',
  },
  {
    id: 'vaticanus',
    name: 'Codex Vaticanus',
    siglum: 'B',
    date: '~300–325 AD',
    dateNum: 312,
    location: 'Vatican Apostolic Library, Vatican City',
    material: 'Vellum',
    language: 'Greek',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Codex_Vaticanus_B%2C_2Thess._3%2C11-18%2C_Hebr._1%2C1-2%2C2.jpg/500px-Codex_Vaticanus_B%2C_2Thess._3%2C11-18%2C_Hebr._1%2C1-2%2C2.jpg',
    institutionUrl: 'https://www.vaticanlibrary.va/',
    description: 'One of the two most authoritative manuscripts in New Testament textual criticism. Written on fine vellum in a careful uncial hand with three columns per page. Long held as a benchmark text.',
    johnnCoverage: 'Complete Gospel of John',
    criticalRole: 'Along with Sinaiticus, defines the Alexandrian text-type. Agrees with P75 on many readings. Does not contain the Pericope Adulterae (John 7:53–8:11) or the angel passage (John 5:3b–4).',
    confidence: 'primary',
  },
  {
    id: 'sinaiticus',
    name: 'Codex Sinaiticus',
    siglum: 'א',
    date: '~330–360 AD',
    dateNum: 345,
    location: 'British Library, London (majority); St. Catherine\'s Monastery, Sinai; Leipzig; St. Petersburg',
    material: 'Vellum',
    language: 'Greek',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Codex_Sinaiticus_John_21%2C7.JPG',
    institutionUrl: 'https://codexsinaiticus.org',
    description: 'The oldest complete New Testament manuscript in existence, discovered by Constantin von Tischendorf at St. Catherine\'s Monastery in 1844. Fully digitized and freely available at codexsinaiticus.org.',
    johnnCoverage: 'Complete Gospel of John',
    criticalRole: 'Along with Vaticanus, defines the Alexandrian text-type. Reads μονογενὴς θεός in 1:18. Omits Pericope Adulterae. Critical for all of John\'s key verses.',
    confidence: 'primary',
  },
  {
    id: 'alexandrinus',
    name: 'Codex Alexandrinus',
    siglum: 'A',
    date: '~400–440 AD',
    dateNum: 420,
    location: 'British Library, London, UK',
    material: 'Vellum',
    language: 'Greek',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Codex_Alexandrinus_J_1%2C1-7.PNG/500px-Codex_Alexandrinus_J_1%2C1-7.PNG',
    institutionUrl: 'https://www.bl.uk/manuscripts/FullDisplay.aspx?ref=Royal_MS_1_D_VIII',
    description: 'Donated to the King of England in 1627, one of the first great biblical manuscripts to reach the West. Contains almost the entire Bible in Greek. A Byzantine-type text for the Gospels.',
    johnnCoverage: 'Complete Gospel of John (with some lacunae)',
    criticalRole: 'Key witness for the Byzantine text-type. Notable for including John 5:3b–4 (the angel passage) which is absent from earlier manuscripts. Used as evidence for later scribal expansion.',
    confidence: 'secondary',
  },
  {
    id: 'bezae',
    name: 'Codex Bezae Cantabrigiensis',
    siglum: 'D',
    date: '~400 AD',
    dateNum: 400,
    location: 'Cambridge University Library, Cambridge, UK',
    material: 'Vellum',
    language: 'Greek and Latin (bilingual)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Codex_Bezae_0205.JPG/500px-Codex_Bezae_0205.JPG',
    institutionUrl: 'https://cudl.lib.cam.ac.uk/view/MS-NN-00002-00041/1',
    description: 'A bilingual codex in Greek and Latin, with a dramatically distinct text that is often longer than other manuscripts. Its unique readings make it a perennial subject of scholarly debate.',
    johnnCoverage: 'Complete Gospel of John (with unique variant readings)',
    criticalRole: 'One of the earliest manuscripts to include the Pericope Adulterae (John 7:53–8:11). Its Western text-type represents an alternative manuscript tradition, sometimes preserving ancient readings.',
    confidence: 'secondary',
  },
]

const CONFIDENCE_STYLES = {
  primary: { border: 'border-amber-700/20', badge: 'bg-amber-700/10 text-amber-700', label: 'Primary witness' },
  secondary: { border: 'border-zinc-300', badge: 'bg-zinc-100 text-zinc-500', label: 'Secondary witness' },
  late: { border: 'border-zinc-200', badge: 'bg-zinc-50 text-zinc-400', label: 'Later tradition' },
}

export default function ManuscriptsPage() {
  const book = getBookData()
  const verseCount = Object.keys(book.key_verses).length

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">Key Manuscripts</p>
        <h1 className="text-3xl font-bold text-zinc-900 mb-3">
          The Witnesses Behind the Gospel of John
        </h1>
        <p className="text-zinc-500 max-w-2xl leading-relaxed">
          From a postcard-sized papyrus fragment in Manchester to the complete codices preserved
          in Rome, London, and Dublin — these are the manuscripts that transmit John&apos;s Gospel to us.
          Together they document {verseCount} key verses with unmatched historical depth.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { val: '~100 AD', label: 'Earliest fragment' },
          { val: '5,800+', label: 'Greek manuscripts' },
          { val: '1,650+', label: 'Containing John' },
          { val: '8', label: 'Major witnesses here' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-4 text-center">
            <p className="text-xl font-bold text-amber-700">{s.val}</p>
            <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Manuscript cards */}
      <div className="space-y-5">
        {MANUSCRIPTS.sort((a, b) => a.dateNum - b.dateNum).map(ms => {
          const styles = CONFIDENCE_STYLES[ms.confidence]
          return (
            <div
              key={ms.id}
              className={`rounded-xl border ${styles.border} bg-white overflow-hidden`}
            >
              {ms.imageUrl && (
                <div className="relative h-40 w-full bg-zinc-100 overflow-hidden">
                  <NextImage
                    src={ms.imageUrl}
                    alt={ms.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                  <span className="absolute bottom-2 left-3 text-white/80 text-xs font-mono">{ms.siglum} · {ms.date}</span>
                </div>
              )}
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl font-bold text-amber-700 font-serif">{ms.siglum}</span>
                      <h2 className="font-semibold text-zinc-900">{ms.name}</h2>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                      <span>{ms.date}</span>
                      <span>·</span>
                      <span>{ms.material}</span>
                      <span>·</span>
                      <span>{ms.language}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${styles.badge}`}>
                    {styles.label}
                  </span>
                </div>

                <p className="text-sm text-zinc-500 leading-relaxed mb-3">{ms.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="rounded-lg bg-zinc-50 border border-zinc-100 p-3">
                    <p className="text-xs font-semibold text-zinc-400 uppercase mb-1">John coverage</p>
                    <p className="text-sm text-zinc-700">{ms.johnnCoverage}</p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 border border-zinc-100 p-3">
                    <p className="text-xs font-semibold text-zinc-400 uppercase mb-1">Critical role</p>
                    <p className="text-sm text-zinc-700 leading-relaxed">{ms.criticalRole}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs text-zinc-500">{ms.location}</p>
                  {ms.institutionUrl && (
                    <a
                      href={ms.institutionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-700/70 hover:text-amber-700 transition-colors"
                    >
                      View at institution ↗
                    </a>
                  )}
                  <Link
                    href="/timeline"
                    className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors ml-auto"
                  >
                    See on timeline →
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/timeline"
          className="inline-block px-6 py-3 rounded-xl border border-amber-700/30 text-amber-700 hover:bg-amber-700/10 transition-colors text-sm"
        >
          View manuscripts on timeline →
        </Link>
      </div>
    </div>
  )
}
