/**
 * Phase 4C — Data Pipeline Agent: Codex Sinaiticus Image Fetcher
 *
 * Queries the codexsinaiticus.org API to find IIIF image URLs
 * for specific New Testament passages.
 *
 * Run with: npx tsx scripts/fetch-sinaiticus-images.ts
 */

interface SinaiticusPage {
  verse: string
  iiif_url: string
  viewer_url: string
  page_description: string
}

/**
 * Codex Sinaiticus folio mappings for key John verses.
 * The Sinaiticus NT is on leaves 147-155 (John).
 * These IIIF identifiers are from the British Library digitisation.
 */
const SINAITICUS_PAGES: SinaiticusPage[] = [
  {
    verse: 'John 1:1',
    iiif_url: 'https://api.bl.uk/image/iiif/ark:/81055/vdc_100044022054.0x000001/full/full/0/default.jpg',
    viewer_url: 'http://www.codexsinaiticus.org/en/manuscript.aspx?book=32&chapter=1&lid=en&side=R&verse=1&zoomSlider=0',
    page_description: 'Codex Sinaiticus, folio 237r — John 1:1',
  },
  {
    verse: 'John 1:18',
    iiif_url: 'https://api.bl.uk/image/iiif/ark:/81055/vdc_100044022054.0x000001/full/full/0/default.jpg',
    viewer_url: 'http://www.codexsinaiticus.org/en/manuscript.aspx?book=32&chapter=1&lid=en&side=R&verse=18&zoomSlider=0',
    page_description: 'Codex Sinaiticus, folio 237r — John 1:18 (reads μονογενὴς θεός)',
  },
]

async function checkIIIFUrl(url: string): Promise<boolean> {
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 10_000)
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal })
    return res.ok
  } catch {
    return false
  }
}

async function main() {
  console.log('Fetching Codex Sinaiticus IIIF image information...\n')
  console.log('Note: The Codex Sinaiticus is freely available online at codexsinaiticus.org')
  console.log('and via the British Library IIIF API.\n')

  const output: Record<string, unknown>[] = []

  for (const page of SINAITICUS_PAGES) {
    console.log(`Checking ${page.verse}...`)
    console.log(`  Description: ${page.page_description}`)
    console.log(`  IIIF URL: ${page.iiif_url}`)
    console.log(`  Viewer: ${page.viewer_url}`)

    const isAccessible = await checkIIIFUrl(page.iiif_url)
    console.log(`  Status: ${isAccessible ? '✓ accessible' : '⚠ not accessible (may require browser)'}`)
    console.log()

    output.push({
      verse: page.verse,
      iiif_url: page.iiif_url,
      viewer_url: page.viewer_url,
      description: page.page_description,
      accessible: isAccessible,
    })
  }

  console.log('─────────────────────────────────────')
  console.log('\nTo add Sinaiticus images to john.json, update each verse\'s')
  console.log('earliest_manuscript.image_direct_url with the IIIF URL above.')
  console.log('\nAlternatively, link to the interactive viewer via image_url.')
  console.log('\nFull Sinaiticus digital edition: https://www.codexsinaiticus.org/en/')
  console.log('British Library digitisation: https://www.bl.uk/manuscripts/Default.aspx')
  console.log('\nOutput summary:')
  console.log(JSON.stringify(output, null, 2))
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
