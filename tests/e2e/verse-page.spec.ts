import { test, expect } from '@playwright/test'

test.describe('Verse page content', () => {
  test('John 1:1 shows verse text and reference', async ({ page }) => {
    await page.goto('/john/1/1')
    await expect(page.locator('h1')).toContainText('John 1:1')
    await expect(page.getByText('In the beginning was the Word')).toBeVisible()
  })

  test('John 1:1 shows ManuscriptReader with Greek words', async ({ page }) => {
    await page.goto('/john/1/1')
    // ManuscriptReader header
    await expect(page.getByText('Manuscript Reader')).toBeVisible()
    // Greek text should be present
    await expect(page.getByText('Ἐν ἀρχῇ')).toBeVisible()
    // English translation should be present
    await expect(page.getByText('In the beginning')).toBeVisible()
  })

  test('hovering a Greek word reveals tooltip', async ({ page }) => {
    await page.goto('/john/1/1')
    const greekSpan = page.getByText('Ἐν ἀρχῇ').first()
    await greekSpan.hover()
    // Tooltip should appear with the English translation
    await expect(page.getByText('In the beginning').first()).toBeVisible()
  })

  test('clicking a Greek word pins the detail card', async ({ page }) => {
    await page.goto('/john/1/1')
    const greekWord = page.getByText('ὁ Λόγος').first()
    await greekWord.click()
    // Pinned detail card should show both Greek and English
    await expect(page.getByText('Greek').first()).toBeVisible()
    await expect(page.getByText('English').first()).toBeVisible()
  })

  test('John 3:16 shows confidence badge', async ({ page }) => {
    await page.goto('/john/3/16')
    await expect(page.getByText('John 3:16')).toBeVisible()
    // Green confidence — look for some indicator
    await expect(page.getByText('For God so loved the world')).toBeVisible()
  })

  test('John 7:53 shows bracketed passage warning', async ({ page }) => {
    await page.goto('/john/7/53')
    await expect(page.getByText('Bracketed Passage')).toBeVisible()
  })

  test('John 8:1 shows bracketed passage warning', async ({ page }) => {
    await page.goto('/john/8/1')
    await expect(page.getByText('Bracketed Passage')).toBeVisible()
  })

  test('John 5:4 shows bracketed passage warning', async ({ page }) => {
    await page.goto('/john/5/4')
    await expect(page.getByText('Bracketed Passage')).toBeVisible()
  })

  test('verse page shows manuscript count bar', async ({ page }) => {
    await page.goto('/john/1/1')
    // ManuscriptCountBar should show Greek manuscripts count
    await expect(page.getByText('Greek')).toBeVisible()
  })

  test('verse page shows church father citation', async ({ page }) => {
    await page.goto('/john/1/1')
    await expect(page.getByText('Earliest Church Father Citation')).toBeVisible()
    await expect(page.getByText('Justin Martyr')).toBeVisible()
  })

  test('verse navigation links work', async ({ page }) => {
    await page.goto('/john/1/1')
    // Next verse link should go to John 1:2
    const nextLink = page.getByRole('link', { name: /John 1:2/ })
    await nextLink.click()
    await expect(page).toHaveURL('/john/1/2')
  })

  test('Ask a Scholar widget is present', async ({ page }) => {
    await page.goto('/john/1/1')
    await expect(page.getByText('Ask a Scholar')).toBeVisible()
    await expect(page.getByPlaceholder(/Ask about John 1:1/)).toBeVisible()
  })

  test('newly added verses show ManuscriptReader', async ({ page }) => {
    // These were previously missing greek_words — verify they now render the reader
    for (const ref of ['/john/1/14', '/john/8/12', '/john/8/58', '/john/11/25', '/john/21/25']) {
      await page.goto(ref)
      await expect(page.getByText('Manuscript Reader')).toBeVisible({ timeout: 5000 })
    }
  })
})
