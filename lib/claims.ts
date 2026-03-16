import claimsData from '@/data/claims.json'

export interface EvidencePoint {
  title: string
  detail: string
}

export interface ScholarlyQuote {
  quote: string
  scholar: string
  credentials: string
}

export interface Claim {
  slug: string
  claim: string
  verdict: 'REFUTED' | 'PARTIALLY TRUE' | 'MISLEADING' | 'TRUE BUT MISUNDERSTOOD'
  verdict_color: 'emerald' | 'amber' | 'red'
  short_answer: string
  full_explanation: string
  key_evidence: EvidencePoint[]
  relevant_manuscripts: string[]
  scholarly_quote: ScholarlyQuote
  related_verses: string[]
}

const claims = claimsData as Claim[]

export function getAllClaims(): Claim[] {
  return claims
}

export function getClaimBySlug(slug: string): Claim | null {
  return claims.find(c => c.slug === slug) || null
}
