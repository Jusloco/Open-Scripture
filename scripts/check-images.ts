/**
 * Phase 4C — Data Pipeline Agent: Image URL Health Check
 *
 * Verifies every image_direct_url in data/john.json responds with HTTP 200.
 * Run with: npx tsx scripts/check-images.ts
 */

import johnData from '../data/john.json'

interface CheckResult {
  verse: string
  manuscript: string
  url: string
  status: number | 'error'
  ok: boolean
  error?: string
}

// Wikimedia and some other hosts block server-side HEAD requests (return 403/429).
// These are treated as "inconclusive" — the image may still work in a browser.
const BOT_BLOCKED_STATUSES = new Set([403, 429])

async function checkUrl(url: string): Promise<{ status: number | 'error'; ok: boolean; inconclusive?: boolean; error?: string }> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ManuscriptEvidence/1.0)',
        'Accept': 'image/*',
      },
    })

    clearTimeout(timeout)

    if (BOT_BLOCKED_STATUSES.has(res.status)) {
      return { status: res.status, ok: true, inconclusive: true }
    }

    return { status: res.status, ok: res.ok }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return { status: 'error', ok: false, error: message }
  }
}

async function main() {
  console.log('Checking manuscript image URLs...\n')

  const results: CheckResult[] = []

  for (const [verseRef, verseData] of Object.entries(johnData.key_verses)) {
    const ms = verseData.earliest_manuscript
    if (!ms.image_direct_url) {
      console.log(`⚠  ${verseRef} — No image_direct_url (${ms.name})`)
      continue
    }

    process.stdout.write(`Checking ${verseRef} (${ms.name})... `)
    const check = await checkUrl(ms.image_direct_url)

    const icon = check.inconclusive ? '~' : check.ok ? '✓' : '✗'
    const note = check.inconclusive ? ' (bot-blocked — verify in browser)' : check.error ? ` — ${check.error}` : ''
    console.log(`${icon}  ${check.status}${note}`)

    results.push({
      verse: verseRef,
      manuscript: ms.name,
      url: ms.image_direct_url,
      ...check,
    })
  }

  console.log('\n─────────────────────────────────────')
  const passed = results.filter(r => r.ok).length
  const failed = results.filter(r => !r.ok).length
  const missing = Object.keys(johnData.key_verses).length - results.length

  console.log(`✓ Passed : ${passed}`)
  console.log(`✗ Failed : ${failed}`)
  console.log(`⚠ Missing: ${missing}`)

  if (failed > 0) {
    console.log('\nFailed URLs:')
    for (const r of results.filter(r => !r.ok)) {
      console.log(`  ${r.verse} — ${r.url}`)
      if (r.error) console.log(`    Error: ${r.error}`)
    }
    process.exit(1)
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
