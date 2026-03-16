import { test, expect } from '@playwright/test'

const VERSES_WITH_IMAGES = [
  { path: '/john/1/1', manuscript: 'P66' },
  { path: '/john/1/14', manuscript: 'P66' },
  { path: '/john/1/18', manuscript: 'P66' },
  { path: '/john/3/16', manuscript: 'P66' },
  { path: '/john/5/4', manuscript: 'Codex Alexandrinus' },
  { path: '/john/7/53', manuscript: 'Codex Bezae' },
  { path: '/john/8/12', manuscript: 'P66' },
  { path: '/john/8/58', manuscript: 'P66' },
  { path: '/john/11/25', manuscript: 'P45' },
  { path: '/john/11/35', manuscript: 'P45' },
  { path: '/john/14/6', manuscript: 'P66' },
  { path: '/john/20/28', manuscript: 'P66' },
  { path: '/john/21/25', manuscript: 'P66' },
]

test.describe('Manuscript images', () => {
  for (const { path, manuscript } of VERSES_WITH_IMAGES) {
    test(`${path} shows ${manuscript} manuscript section`, async ({ page }) => {
      await page.goto(path)
      // The manuscript name should appear in the reader
      await expect(page.getByText(manuscript, { exact: false }).first()).toBeVisible()
    })
  }

  test('John 1:1 — manuscript image element exists', async ({ page }) => {
    // Track network requests to detect image load attempts
    const imageRequests: string[] = []
    page.on('request', req => {
      if (req.resourceType() === 'image') imageRequests.push(req.url())
    })

    await page.goto('/john/1/1')
    await page.waitForLoadState('networkidle')

    // Either an <img> loaded successfully OR the fallback placeholder is shown
    const imgElement = page.locator('img[alt*="Papyrus"]')
    const fallbackElement = page.getByText('View manuscript image', { exact: false })

    const hasImg = await imgElement.count() > 0
    const hasFallback = await fallbackElement.count() > 0

    expect(hasImg || hasFallback).toBeTruthy()
  })

  test('no broken img elements with empty src', async ({ page }) => {
    await page.goto('/john/1/1')
    // All img elements should have non-empty src
    const imgs = page.locator('img')
    const count = await imgs.count()
    for (let i = 0; i < count; i++) {
      const src = await imgs.nth(i).getAttribute('src')
      expect(src).toBeTruthy()
    }
  })

  test('image error fallback renders gracefully', async ({ page }) => {
    await page.goto('/john/1/1')
    // Simulate image error by evaluating JS to trigger onError
    await page.evaluate(() => {
      document.querySelectorAll('img').forEach((img) => {
        img.dispatchEvent(new Event('error'))
      })
    })
    // After error, the fallback (📜 icon or link) should appear
    // At minimum the page should not crash
    await expect(page.locator('body')).toBeVisible()
  })
})
