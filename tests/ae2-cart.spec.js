import { test, expect } from '@playwright/test';

test('AE2: Добавление товара в корзину', async ({ page }) => {
    // 1. Открываем сайт
    await page.goto('https://academybugs.com/find-bugs/');

    // 2. Кликаем на кроссовки (как в тесте коллеги)
    await page.getByRole('link', { name: 'DNK Yellow Shoes' }).click();

    // 3. Кликаем кнопку добавления в корзину (селектор по классу кнопки на этом сайте)
    await page.locator('.ec_add_to_cart').click();

    // 4. Проверяем, что появилась ссылка "View Cart" (значит товар в корзине)
    const viewCart = page.getByRole('link', { name: 'View Cart' });
    await expect(viewCart).toBeVisible();
});