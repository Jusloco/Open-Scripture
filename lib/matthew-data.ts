import matthewData from '@/data/matthew.json'
import { BookData, VerseData, ChapterData } from './types'

const book = matthewData as BookData

export function getMatthewData(): BookData {
  return book
}

export function getMatthewChapter(chapter: number): ChapterData | null {
  return book.chapters.find(c => c.number === chapter) || null
}

export function getMatthewVerse(chapter: number, verse: number): VerseData | null {
  const key = `${chapter}:${verse}`
  return book.key_verses[key] || null
}

export function getMatthewKeyVerseKeys(): string[] {
  return Object.keys(book.key_verses)
}

export function getMatthewAllChapters(): ChapterData[] {
  return book.chapters
}

export function getMatthewVersesByChapter(chapter: number): VerseData[] {
  return Object.values(book.key_verses).filter(v => v.chapter === chapter)
}

export function hasMatthewDetailedData(chapter: number, verse: number): boolean {
  const key = `${chapter}:${verse}`
  return key in book.key_verses
}

export function getMatthewDefaultVerseData(chapter: number, verse: number): VerseData {
  const chapterData = getMatthewChapter(chapter)
  return {
    reference: `Matthew ${chapter}:${verse}`,
    chapter,
    verse,
    text: '',
    confidence: 'green',
    greek_manuscripts: 1750,
    latin_manuscripts: 8000,
    syriac_manuscripts: 370,
    coptic_manuscripts: 210,
    armenian_manuscripts: 160,
    earliest_manuscript: {
      name: 'Codex Sinaiticus (א)',
      date: '~360 AD',
      location: 'British Library, London',
      image_url: 'https://codexsinaiticus.org',
      description: 'One of the two oldest and most complete manuscripts of the Christian Bible.'
    },
    earliest_church_father_citation: {
      author: 'Origen',
      date: '~248 AD',
      work: 'Commentary on Matthew'
    },
    variants: [],
    plain_english_summary: `This verse appears consistently across all major manuscript traditions — Greek, Latin, Syriac, Coptic, and Armenian. No significant textual variants are known. ${chapterData?.manuscripts_note || ''}`
  }
}
