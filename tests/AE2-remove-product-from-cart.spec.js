import { test, expect } from '@playwright/test';

test('AE3: Видалення товару Blue Tshirt з кошика', async ({ page }) => {

  // 1. Відкриваємо каталог
  await page.goto('https://academybugs.com/find-bugs/');

  // 2. Переходимо на сторінку товару
  await page.getByRole('link', { name: 'Blue Tshirt' }).click();

  // 3. Додаємо товар у кошик
  await Promise.all([
    page.waitForURL('**/my-cart/**'),
    page.getByRole('button', { name: /add to cart/i }).click(),
  ]);

  // 4. Переконуємось, що товар є в кошику
  const cartItem = page.locator('.ec_cartitem_details', {
    hasText: 'Blue Tshirt',
  });
  await expect(cartItem).toBeVisible();

  // 5. Натискаємо кнопку видалення товару (іконка хрестика)
  await cartItem.locator('a, button').first().click();

  // 6. Перевіряємо, що товар зник з кошика
  await expect(
    page.locator('.ec_cartitem_details', { hasText: 'Blue Tshirt' })
  ).toHaveCount(0);
});
