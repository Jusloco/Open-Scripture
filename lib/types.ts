export type ConfidenceLevel = 'green' | 'yellow' | 'red'

export interface WordPair {
  greek: string
  english: string
}

export interface Manuscript {
  name: string
  date: string
  location: string
  image_url?: string
  image_direct_url?: string
  description?: string
}

export interface ChurchFatherCitation {
  author: string
  date: string
  work?: string
  quote?: string
}

export interface Variant {
  description: string
  manuscripts_supporting: string
  scholarly_consensus: string
  doctrinal_impact: string
}

export interface VerseData {
  reference: string
  chapter: number
  verse: number
  text: string
  confidence: ConfidenceLevel
  greek_manuscripts: number
  latin_manuscripts: number
  syriac_manuscripts?: number
  coptic_manuscripts?: number
  armenian_manuscripts?: number
  earliest_manuscript: Manuscript
  earliest_church_father_citation: ChurchFatherCitation
  variants: Variant[]
  plain_english_summary: string
  bracketed?: boolean
  bracket_note?: string
  greek_words?: WordPair[]
}

export interface ChapterData {
  number: number
  verse_count: number
  summary: string
  manuscripts_note?: string
  key_verses?: number[]
}

export interface BookData {
  book: string
  total_greek_manuscripts: number
  total_latin_manuscripts: number
  total_syriac_manuscripts: number
  total_all_languages: number
  earliest_complete_manuscript: string
  chapters: ChapterData[]
  key_verses: Record<string, VerseData>
}
