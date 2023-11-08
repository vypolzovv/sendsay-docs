import { test } from '@playwright/test';

test('Publish', async ({ page }) => {
  await page.goto('https://sendsay.ru/admin/docsupdate');

  const { PUBLISH_LOGIN, PUBLISH_PASSWORD } = process.env;

  await page.fill("[name='credential_0']", PUBLISH_LOGIN);
  await page.fill("[name='credential_1']", PUBLISH_PASSWORD);

  await page.getByRole('button').click();

  await page.waitForSelector('text=Wait 180 secs and check');
  await page.screenshot({ path: 'playwright-artifacts/result.png' });
});
