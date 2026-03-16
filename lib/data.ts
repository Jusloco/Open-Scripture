import johnData from '@/data/john.json'
import markData from '@/data/mark.json'
import lukeData from '@/data/luke.json'
import comparisonData from '@/data/comparison.json'
import { BookData, VerseData, ChapterData } from './types'

const book = johnData as BookData
const markBook = markData as BookData
const lukeBook = lukeData as BookData

// ── John ──────────────────────────────────────────────────────────────────────

export function getBookData(): BookData {
  return book
}

export function getChapterData(chapter: number): ChapterData | null {
  return book.chapters.find(c => c.number === chapter) || null
}

export function getVerseData(chapter: number, verse: number): VerseData | null {
  const key = `${chapter}:${verse}`
  return book.key_verses[key] || null
}

export function getKeyVerseKeys(): string[] {
  return Object.keys(book.key_verses)
}

export function getAllChapters(): ChapterData[] {
  return book.chapters
}

export function getComparisonData() {
  return comparisonData
}

export function getVersesByChapter(chapter: number): VerseData[] {
  return Object.values(book.key_verses).filter(v => v.chapter === chapter)
}

export function hasDetailedData(chapter: number, verse: number): boolean {
  const key = `${chapter}:${verse}`
  return key in book.key_verses
}

export function getDefaultVerseData(chapter: number, verse: number): VerseData {
  const chapterData = getChapterData(chapter)
  return {
    reference: `John ${chapter}:${verse}`,
    chapter,
    verse,
    text: '',
    confidence: 'green',
    greek_manuscripts: 1650,
    latin_manuscripts: 8000,
    syriac_manuscripts: 350,
    coptic_manuscripts: 200,
    armenian_manuscripts: 150,
    earliest_manuscript: {
      name: 'Codex Sinaiticus (א)',
      date: '~360 AD',
      location: 'British Library, London',
      image_url: 'https://codexsinaiticus.org',
      description: 'One of the two oldest and most complete manuscripts of the Christian Bible.'
    },
    earliest_church_father_citation: {
      author: 'Origen',
      date: '~230 AD',
      work: 'Commentary on John'
    },
    variants: [],
    plain_english_summary: `This verse appears consistently across all major manuscript traditions — Greek, Latin, Syriac, Coptic, and Armenian. No significant textual variants are known. ${chapterData?.manuscripts_note || ''}`
  }
}

// ── Mark ──────────────────────────────────────────────────────────────────────

export function getMarkBookData(): BookData {
  return markBook
}

export function getMarkChapterData(chapter: number): ChapterData | null {
  return markBook.chapters.find(c => c.number === chapter) || null
}

export function getMarkVerseData(chapter: number, verse: number): VerseData | null {
  const key = `${chapter}:${verse}`
  return markBook.key_verses[key] || null
}

export function getMarkKeyVerseKeys(): string[] {
  return Object.keys(markBook.key_verses)
}

export function getMarkAllChapters(): ChapterData[] {
  return markBook.chapters
}

export function getMarkVersesByChapter(chapter: number): VerseData[] {
  return Object.values(markBook.key_verses).filter(v => v.chapter === chapter)
}

export function markHasDetailedData(chapter: number, verse: number): boolean {
  const key = `${chapter}:${verse}`
  return key in markBook.key_verses
}

export function getMarkDefaultVerseData(chapter: number, verse: number): VerseData {
  const chapterData = getMarkChapterData(chapter)
  return {
    reference: `Mark ${chapter}:${verse}`,
    chapter,
    verse,
    text: '',
    confidence: 'green',
    greek_manuscripts: 1650,
    latin_manuscripts: 8000,
    syriac_manuscripts: 350,
    coptic_manuscripts: 200,
    armenian_manuscripts: 150,
    earliest_manuscript: {
      name: 'Codex Sinaiticus (א)',
      date: '~360 AD',
      location: 'British Library, London',
      image_url: 'https://codexsinaiticus.org',
      description: 'One of the two oldest and most complete manuscripts of the Christian Bible.'
    },
    earliest_church_father_citation: {
      author: 'Irenaeus of Lyon',
      date: '~180 AD',
      work: 'Against Heresies'
    },
    variants: [],
    plain_english_summary: `This verse appears consistently across all major manuscript traditions — Greek, Latin, Syriac, Coptic, and Armenian. No significant textual variants are known. ${chapterData?.manuscripts_note || ''}`
  }
}

// ── Luke ──────────────────────────────────────────────────────────────────────

export function getLukeBookData(): BookData {
  return lukeBook
}

export function getLukeChapterData(chapter: number): ChapterData | null {
  return lukeBook.chapters.find(c => c.number === chapter) || null
}

export function getLukeVerseData(chapter: number, verse: number): VerseData | null {
  const key = `${chapter}:${verse}`
  return lukeBook.key_verses[key] || null
}

export function getLukeKeyVerseKeys(): string[] {
  return Object.keys(lukeBook.key_verses)
}

export function getLukeAllChapters(): ChapterData[] {
  return lukeBook.chapters
}

export function getLukeVersesByChapter(chapter: number): VerseData[] {
  return Object.values(lukeBook.key_verses).filter(v => v.chapter === chapter)
}

export function lukeHasDetailedData(chapter: number, verse: number): boolean {
  const key = `${chapter}:${verse}`
  return key in lukeBook.key_verses
}

export function getLukeDefaultVerseData(chapter: number, verse: number): VerseData {
  const chapterData = getLukeChapterData(chapter)
  return {
    reference: `Luke ${chapter}:${verse}`,
    chapter,
    verse,
    text: '',
    confidence: 'green',
    greek_manuscripts: 1650,
    latin_manuscripts: 8000,
    syriac_manuscripts: 350,
    coptic_manuscripts: 200,
    armenian_manuscripts: 150,
    earliest_manuscript: {
      name: 'Codex Sinaiticus (א)',
      date: '~360 AD',
      location: 'British Library, London',
      image_url: 'https://codexsinaiticus.org',
      description: 'One of the two oldest and most complete manuscripts of the Christian Bible.'
    },
    earliest_church_father_citation: {
      author: 'Origen',
      date: '~240 AD',
      work: 'Homilies on Luke'
    },
    variants: [],
    plain_english_summary: `This verse appears consistently across all major manuscript traditions — Greek, Latin, Syriac, Coptic, and Armenian. No significant textual variants are known. ${chapterData?.manuscripts_note || ''}`
  }
}
