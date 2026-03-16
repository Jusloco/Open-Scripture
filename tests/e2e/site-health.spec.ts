import { test, expect } from '@playwright/test'

const KEY_VERSE_PAGES = [
  '/john/1/1',
  '/john/1/14',
  '/john/1/18',
  '/john/3/16',
  '/john/5/4',
  '/john/7/53',
  '/john/8/1',
  '/john/8/12',
  '/john/8/58',
  '/john/11/25',
  '/john/11/35',
  '/john/14/6',
  '/john/20/28',
  '/john/21/25',
]

test.describe('Site health', () => {
  test('home page loads', async ({ page }) => {
    const res = await page.goto('/')
    expect(res?.status()).toBeLessThan(400)
  })

  test('John index page loads', async ({ page }) => {
    const res = await page.goto('/john')
    expect(res?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })

  for (const path of KEY_VERSE_PAGES) {
    test(`${path} loads without error`, async ({ page }) => {
      const res = await page.goto(path)
      expect(res?.status()).toBeLessThan(400)
      // Page title should mention the verse reference
      const title = await page.title()
      expect(title).toMatch(/John \d+:\d+/)
    })
  }

  test('chapter page loads', async ({ page }) => {
    const res = await page.goto('/john/1')
    expect(res?.status()).toBeLessThan(400)
  })

  test('unknown verse returns 404', async ({ page }) => {
    const res = await page.goto('/john/99/99')
    expect(res?.status()).toBe(404)
  })
})
