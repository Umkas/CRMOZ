import { test, expect } from '@playwright/test';
import { RegistrationPage } from './page-objects/registration-page.js';
import { invalidEmails } from './data/invalid-emails.js';

test.describe('Automation Practice Form', () => {
  test('форма не відправляється при некоректному введенні даних (пусті поля)', async ({ page }) => {
    const form = new RegistrationPage(page);
    await form.open();

    await form.submit();
    // роблю перевірку, що модальне вікно із підтвердженням реєстрації не відкривається. 
    // як варіант, ще можна зробити перевірку checkValidity() для цього сайту або по старинці, що поле не пусте
    await expect(form.modal).toHaveCount(0);
  });


  // один з тестів свідомо падає - сайт приймає некоректний email.
  test.describe('валідація email', () => {
    for (const invalidEmail of invalidEmails) {
      test(`email "${invalidEmail}" вважається неваділним`, async ({ page }) => {
        const form = new RegistrationPage(page);
        await form.open();

        await form.fillRequiredFields({
          firstName: 'Dima',
          lastName: 'Test',
          gender: 'Male',
          mobile: '1234567890',
          email: invalidEmail,
        });

        await form.submit();

        // роблю перевірку, що модальне вікно із підтвердженням реєстрації не відкривається. 
        await expect(form.modal).toHaveCount(0);

      });
    }
  });

  test('успішна реєстрація з валідними даними', async ({ page }) => {
    const form = new RegistrationPage(page);
    await form.open();

    const firstName = 'Dima';
    const lastName = 'Yerchak';
    const email = 'test@example.com';

    await form.fillRequiredFields({
      firstName,
      lastName,
      gender: 'Male',
      mobile: '1234567890',
      email,
    });

    await form.submit();

    await expect(form.modal).toBeVisible();
    await expect(form.modalTitle).toBeVisible();

    await expect(form.modalHasCell(`${firstName} ${lastName}`)).toBeVisible();
    await expect(form.modalHasCell(email)).toBeVisible();
  });
});