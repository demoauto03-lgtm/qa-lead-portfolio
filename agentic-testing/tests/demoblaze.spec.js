import { test, expect } from '@playwright/test';

   test('Demoblaze home page loads', async ({ page }) => {
     await page.goto('https://www.demoblaze.com/');
     await expect(page).toHaveTitle(/STORE/);
     await expect(page.getByRole('link', { name: 'Phones' })).toBeVisible();
   });