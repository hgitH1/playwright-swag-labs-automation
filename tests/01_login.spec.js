const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/01_LoginPage');

test.describe('Login Feature - Validation & Security', () => {
  
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('Happy Path: Standard user can log in successfully', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Negative Test: Locked out user receives correct error message', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    // Verifying specific acceptance criteria for locked accounts
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Negative Test: Invalid password shows error', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password_123');
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Username and password do not match');
  });

  test('Edge Case: Empty username and password fields', async ({ page }) => {
    // Just click login without typing anything
    await page.click(loginPage.loginBtn);
    
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Username is required');
  });
});