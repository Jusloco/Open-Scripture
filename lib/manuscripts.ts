import witnessData from '@/data/manuscript-witnesses.json'

export interface ManuscriptWitness {
  id: string
  siglum: string
  name: string
  full_name: string
  type: 'papyrus' | 'uncial' | 'minuscule' | 'lectionary' | 'version'
  language: string
  date_label: string
  date_year: number
  century: string
  books: string[]
  complete_book: boolean
  john_ranges?: [number, number, number, number][]
  repository: string
  origin?: string
  condition?: string
  significance?: string
  image_url?: string
  institution_url?: string
  text_type?: string
  ga_number?: string
}

const witnesses = witnessData as ManuscriptWitness[]

function isVerseInRange(ch: number, v: number, range: [number, number, number, number]): boolean {
  const [cs, vs, ce, ve] = range
  if (ch < cs || ch > ce) return false
  if (ch === cs && v < vs) return false
  if (ch === ce && v > ve) return false
  return true
}

export function getWitnessesForVerse(book: string, chapter: number, verse: number): ManuscriptWitness[] {
  return witnesses.filter(ms => {
    if (!ms.books.includes(book) && !ms.books.includes('NT') && !ms.books.includes('Gospels')) return false
    if (ms.books.includes('NT') || ms.books.includes('Gospels')) return true
    if (ms.complete_book && ms.books.includes(book)) return true
    if (book === 'John' && ms.john_ranges) {
      return ms.john_ranges.some(range => isVerseInRange(chapter, verse, range))
    }
    return ms.complete_book
  })
}

export function groupWitnessesByType(witnesses: ManuscriptWitness[]) {
  return {
    papyri: witnesses.filter(m => m.type === 'papyrus').sort((a, b) => a.date_year - b.date_year),
    uncials: witnesses.filter(m => m.type === 'uncial').sort((a, b) => a.date_year - b.date_year),
    minuscules: witnesses.filter(m => m.type === 'minuscule').sort((a, b) => a.date_year - b.date_year),
    lectionaries: witnesses.filter(m => m.type === 'lectionary'),
    versions: witnesses.filter(m => m.type === 'version').sort((a, b) => a.date_year - b.date_year),
  }
}

export function getImagedManuscripts(witnesses: ManuscriptWitness[]): ManuscriptWitness[] {
  return witnesses.filter(m => m.image_url).sort((a, b) => a.date_year - b.date_year)
}

export function getChapterManuscript(book: string, chapter: number): ManuscriptWitness | null {
  const candidates = getWitnessesForVerse(book, chapter, 1)
    .filter(m => m.image_url && (m.type === 'papyrus' || m.type === 'uncial'))
    .sort((a, b) => a.date_year - b.date_year)
  return candidates[0] || null
}
