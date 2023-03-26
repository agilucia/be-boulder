import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('heading', { name: 'BE BOULDER' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();

  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page).toHaveURL('http://localhost:3000/locations');
});

test('login and register test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');

  await expect(page.getByRole('heading', { name: 'LOGIN' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Register here' })).toBeVisible();

  await page.getByRole('link', { name: 'Register here' }).click();

  await expect(page).toHaveURL('http://localhost:3000/register');

  await expect(page.getByRole('heading', { name: 'REGISTER' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();

  await page.getByRole('link', { name: 'Log in' }).click();

  await expect(page).toHaveURL('http://localhost:3000/login');
});
