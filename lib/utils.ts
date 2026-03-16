import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ConfidenceLevel } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function confidenceLabel(level: ConfidenceLevel): string {
  switch (level) {
    case 'green': return 'Textually Secure'
    case 'yellow': return 'Minor Variant'
    case 'red': return 'Bracketed / Disputed'
  }
}

export function confidenceDescription(level: ConfidenceLevel): string {
  switch (level) {
    case 'green': return 'Near-universal agreement across all manuscript traditions.'
    case 'yellow': return 'Small differences exist — spelling, word order, or minor phrasing. No meaningful change to content.'
    case 'red': return 'This passage does not appear in the earliest manuscripts and is likely a later addition.'
  }
}

export function totalManuscripts(verse: { greek_manuscripts: number; latin_manuscripts: number; syriac_manuscripts?: number; coptic_manuscripts?: number; armenian_manuscripts?: number }): number {
  return (verse.greek_manuscripts || 0) +
    (verse.latin_manuscripts || 0) +
    (verse.syriac_manuscripts || 0) +
    (verse.coptic_manuscripts || 0) +
    (verse.armenian_manuscripts || 0)
}
