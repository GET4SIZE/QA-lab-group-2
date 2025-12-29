import { test, expect } from '@playwright/test';

test('AE2: Добавление товара в корзину', async ({ page }) => {

  // 1. Відкриваємо каталог
  await page.goto('https://academybugs.com/find-bugs/');

  // 2. Переходимо на сторінку товару
  await page.getByRole('link', { name: 'Blue Tshirt' }).click();

  // 3. Натискаємо Add to Cart + чекаємо редірект у кошик
  await Promise.all([
    page.waitForURL('**/my-cart/**'),
    page.getByRole('button', { name: /add to cart/i }).click(),
  ]);

  // 4. Перевіряємо, що ми в кошику
  await expect(page).toHaveURL(/\/my-cart\/?/);

  // 5. Перевіряємо, що товар присутній у кошику
  const cartItem = page.locator('.ec_cartitem_details', {
    hasText: 'Blue Tshirt',
  });
  await expect(cartItem).toBeVisible();
});
