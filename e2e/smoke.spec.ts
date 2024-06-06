import { test } from '@playwright/test';

test('Smoke test', async ({ page }) => {
  await page.goto('/');

  if (process.env.CI) {
    await page.getByPlaceholder('Поиск Ctrl+K').fill('рассылки');
    await page.getByText('Email-рассылки Email-рассылки Email-рассылки Email-рассылки').click();
    await page.getByRole('link', { name: 'Sendsay docs' }).click();
  }

  await page
    .getByLabel("Toggle the collapsible sidebar category 'Часто задаваемые вопросы'")
    .click();
  await page.getByLabel("Toggle the collapsible sidebar category 'Работа с подписчиками'").click();
  await page.getByLabel("Toggle the collapsible sidebar category 'Импорт и экспорт'").click();
  await page.getByRole('link', { name: 'Импорт подписчиков', exact: true }).click();
  await page.getByRole('link', { name: 'Файл для импорта', exact: true }).click();
  await page.getByRole('link', { name: 'Экспорт в старом интерфейсе', exact: true }).click();
  await page.getByRole('link', { name: 'Экспорт данных и контактов', exact: true }).click();
  await page.getByRole('link', { name: 'Списки и сегменты', exact: true }).click();
  await page.getByRole('link', { name: 'Что такое список контактов', exact: true }).click();
  await page.getByRole('link', { name: 'Что такое сегмент контактов', exact: true }).click();
  await page.getByRole('img', { name: 'Group of conditions', exact: true }).click();
  await page.getByRole('img', { name: 'Group of conditions', exact: true }).click();
  await page.getByLabel('Скопировать в буфер обмена').nth(1).click();
  await page.getByRole('link', { name: 'Следующая страница Контакты »' }).click();
  await page
    .getByRole('link', { name: 'Как удалить контакты Как удалить один контакт у подписчика' })
    .click();
  await page.getByRole('link', { name: 'Интеграции' }).click();
  await page.getByRole('link', { name: 'Видеоуроки' }).click();
  await page
    .getByRole('main')
    .getByRole('link', { name: 'Импорт подписчиков', exact: true })
    .click();
  await page
    .frameLocator('iframe[title="VideoIframe"]')
    .getByLabel('Play', { exact: true })
    .click();
  await page
    .frameLocator('iframe[title="VideoIframe"]')
    .getByLabel('Pause keyboard shortcut k')
    .click();
  await page.getByRole('link', { name: 'Обновления' }).click();
  await page.getByRole('link', { name: '2022', exact: true }).click();
  await page.getByRole('link', { name: 'Декабрь 2022' }).click();
});
