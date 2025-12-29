import { test, expect } from '@playwright/test';

test('AE1 TC-03: product details page shows title, price, qty and add-to-cart', async ({ page }) => {
  await page.goto('https://academybugs.com/store/dark-grey-jeans/');

  // cookies
  const acceptCookies = page.getByRole('button', { name: /accept cookies/i });
  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  // title (дубльований — беремо first)
  const title = page.getByRole('heading', { name: /dark grey jeans/i }).first();
  await expect(title).toBeVisible();

  // price 
  const price = page.locator('div.ec_details_price.ec_details_single_price:visible');
  await expect(price).toBeVisible();
  await expect(price).toContainText(/\$\s*\d+/);

  // qty
  const qty = page.locator('input.ec_quantity').first();
  await expect(qty).toBeVisible();

  // add to cart
  const addToCart = page.getByRole('button', { name: /add to cart/i });
  await expect(addToCart).toBeVisible();
});
