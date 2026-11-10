// spec: specs/demoblaze-cart.md
// seed: agentic-testing/tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catalog category filtering', () => {
  test('should show only products from the selected category', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await expect(page).toHaveTitle(/STORE/);

    const phonesCategory = page.getByRole('link', { name: 'Phones', exact: true });
    const laptopsCategory = page.getByRole('link', { name: 'Laptops', exact: true });
    const monitorsCategory = page.getByRole('link', { name: 'Monitors', exact: true });
    const samsungGalaxyS6 = page
      .getByRole('link', { name: 'Samsung galaxy s6', exact: true })
      .first();
    const sonyVaioI5 = page.getByRole('link', { name: 'Sony vaio i5', exact: true });
    const macBookAir = page.getByRole('link', { name: 'MacBook air', exact: true });
    const appleMonitor24 = page.getByRole('link', {
      name: 'Apple monitor 24',
      exact: true,
    });
    const asusFullHD = page.getByRole('link', { name: 'ASUS Full HD', exact: true });

    await expect(phonesCategory).toBeVisible();
    await expect(laptopsCategory).toBeVisible();
    await expect(monitorsCategory).toBeVisible();

    await phonesCategory.click();
    await expect(samsungGalaxyS6).toBeVisible();
    await expect(sonyVaioI5).toBeHidden();
    await expect(appleMonitor24).toBeHidden();

    await laptopsCategory.click();
    await expect(sonyVaioI5).toBeVisible();
    await expect(macBookAir).toBeVisible();
    await expect(samsungGalaxyS6).toBeHidden();
    await expect(appleMonitor24).toBeHidden();

    await monitorsCategory.click();
    await expect(appleMonitor24).toBeVisible();
    await expect(asusFullHD).toBeVisible();
    await expect(samsungGalaxyS6).toBeHidden();
    await expect(sonyVaioI5).toBeHidden();

    await phonesCategory.click();
    await expect(samsungGalaxyS6).toBeVisible();
    await expect(sonyVaioI5).toBeHidden();
    await expect(appleMonitor24).toBeHidden();
  });
});

test.describe('Product details and cart', () => {
  test('should add a product and display it in the cart', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await expect(page).toHaveTitle(/STORE/);

    await page.getByRole('link', { name: 'Phones', exact: true }).click();

    const samsungGalaxyS6 = page.getByRole('link', {
      name: 'Samsung galaxy s6',
      exact: true,
    });
    await expect(samsungGalaxyS6).toBeVisible();
    await samsungGalaxyS6.click();

    await expect(
      page.getByRole('heading', { name: 'Samsung galaxy s6', exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: '$360 *includes tax' })).toBeVisible();

    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('link', { name: 'Add to cart', exact: true }).click();
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Product added');
    await dialog.accept();
    await expect(
      page.getByRole('heading', { name: 'Samsung galaxy s6', exact: true }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    const productRow = page.getByRole('row').filter({ hasText: 'Samsung galaxy s6' });
    await expect(productRow).toBeVisible();
    await expect(productRow).toContainText('360');
    await expect(page.getByRole('heading', { name: '360', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Place Order', exact: true })).toBeVisible();
  });

  test('should remove the only product from the cart', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await expect(page).toHaveTitle(/STORE/);

    await page.getByRole('link', { name: 'Phones', exact: true }).click();

    const samsungGalaxyS6 = page
      .getByRole('link', { name: 'Samsung galaxy s6', exact: true })
      .first();
    await expect(samsungGalaxyS6).toBeVisible();
    await samsungGalaxyS6.click();

    await expect(
      page.getByRole('heading', { name: 'Samsung galaxy s6', exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: '$360 *includes tax' })).toBeVisible();

    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('link', { name: 'Add to cart', exact: true }).click();
    const dialog = await dialogPromise;
    expect(dialog.message()).toBe('Product added');
    await dialog.accept();
    await expect(
      page.getByRole('heading', { name: 'Samsung galaxy s6', exact: true }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    const productRow = page.getByRole('row').filter({ hasText: 'Samsung galaxy s6' });
    await expect(productRow).toBeVisible();
    await expect(productRow).toContainText('360');
    await expect(page.getByRole('heading', { name: '360', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Place Order', exact: true })).toBeVisible();

    await productRow.getByRole('link', { name: 'Delete', exact: true }).click();
    await expect(productRow).toBeHidden();
    await expect(page.getByRole('heading').filter({ hasText: /^(?:0)?$/ })).toHaveText('');
    await expect(page.getByRole('button', { name: 'Place Order', exact: true })).toBeVisible();
  });

  test('should add products from different categories', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await expect(page).toHaveTitle(/STORE/);

    await page.getByRole('link', { name: 'Phones', exact: true }).click();
    const samsungGalaxyS6 = page
      .getByRole('link', { name: 'Samsung galaxy s6', exact: true })
      .first();
    await expect(samsungGalaxyS6).toBeVisible();
    await samsungGalaxyS6.click();

    await expect(
      page.getByRole('heading', { name: 'Samsung galaxy s6', exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: '$360 *includes tax' })).toBeVisible();
    const samsungDialogPromise = page.waitForEvent('dialog');
    await page.getByRole('link', { name: 'Add to cart', exact: true }).click();
    const samsungDialog = await samsungDialogPromise;
    expect(samsungDialog.message()).toBe('Product added');
    await samsungDialog.accept();
    await expect(
      page.getByRole('heading', { name: 'Samsung galaxy s6', exact: true }),
    ).toBeVisible();

    await page.goto('https://www.demoblaze.com/');
    await expect(page).toHaveTitle(/STORE/);
    await page.getByRole('link', { name: 'Laptops', exact: true }).click();
    const sonyVaioI5 = page.getByRole('link', { name: 'Sony vaio i5', exact: true });
    await expect(sonyVaioI5).toBeVisible();
    await sonyVaioI5.click();

    await expect(
      page.getByRole('heading', { name: 'Sony vaio i5', exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: '$790 *includes tax' })).toBeVisible();
    const sonyDialogPromise = page.waitForEvent('dialog');
    await page.getByRole('link', { name: 'Add to cart', exact: true }).click();
    const sonyDialog = await sonyDialogPromise;
    expect(sonyDialog.message()).toBe('Product added');
    await sonyDialog.accept();
    await expect(
      page.getByRole('heading', { name: 'Sony vaio i5', exact: true }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    const samsungRow = page.getByRole('row').filter({ hasText: 'Samsung galaxy s6' });
    const sonyRow = page.getByRole('row').filter({ hasText: 'Sony vaio i5' });
    await expect(samsungRow).toBeVisible();
    await expect(samsungRow).toContainText('360');
    await expect(sonyRow).toBeVisible();
    await expect(sonyRow).toContainText('790');
    await expect(page.getByRole('heading', { name: '1150', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Place Order', exact: true })).toBeVisible();
  });
});
