class LoginPage {
  constructor(page) {
    this.page = page;
    // Locators for the login screen
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginBtn = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginBtn);
  }

  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).textContent();
  }
}

module.exports = { LoginPage };