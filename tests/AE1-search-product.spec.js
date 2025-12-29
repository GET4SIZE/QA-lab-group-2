import { test, expect } from '@playwright/test';

test('AE1 TC-02: product search finds "Dark Grey Jeans"', async ({ page }) => {
  // 1. Відкрити сторінку товару (де є PRODUCT SEARCH)
  await page.goto('https://academybugs.com/store/dnk-yellow-shoes/');

  // 2. Прийняти cookies (якщо зʼявились)
  const acceptCookies = page.getByRole('button', { name: /accept cookies/i });
  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  // 3. Знайти поле PRODUCT SEARCH (це input type="text")
  const searchInput = page.locator(
    'input[name="ec_search"], input[placeholder*="Search" i]'
  ).first();

  await expect(searchInput).toBeVisible();

  // 4. Ввести назву товару
  const query = 'Dark Grey Jeans';
  await searchInput.fill(query);

  // 5. Натиснути кнопку Search
  const searchButton = page.getByRole('button', { name: /^search$/i });
  await searchButton.click();

  // 6. Перевірка: URL містить ec_search
  await expect(page).toHaveURL(/ec_search=Dark\+Grey\+Jeans/i);

  // 7. Перевірка: у результатах є товар
  const productTitle = page.getByRole('heading', {
    name: /dark grey jeans/i,
  });

  await expect(productTitle).toBeVisible();
});
