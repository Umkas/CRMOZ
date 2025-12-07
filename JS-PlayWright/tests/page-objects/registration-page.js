export class RegistrationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://demoqa.com/automation-practice-form';
 
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.mobile = page.locator('#userNumber');
    this.genderRadio = (gender) => page.locator(`input[name="gender"][value="${gender}"] + label`);

    this.submitButton = page.locator('#submit');
    this.modal = page.locator('.modal-content');
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    this.modalCell = (cell) => page.locator(`//td[normalize-space()="${cell}"]`);
  }

  async open() {
    await this.page.goto(this.url);
  }

  async fillRequiredFields({ firstName, lastName, gender, mobile, email }) {
    if (firstName) await this.firstName.fill(firstName);
    if (lastName) await this.lastName.fill(lastName);
    if (email !== undefined) await this.email.fill(email); 
    if (gender) await this.genderRadio(gender).click();
    if (mobile) await this.mobile.fill(mobile);
  }

  async submit() {
    await this.submitButton.click();
  }

  modalHasCell(text) {
    return this.modalCell(text);
  }
}