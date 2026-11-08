const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/01_LoginPage');
const { InventoryPage } = require('../pages/02_InventoryPage');
const { CartPage } = require('../pages/03_CartPage');
const { CheckoutInfoPage } = require('../pages/04_CheckoutInfoPage');
const { CheckoutOverviewPage } = require('../pages/05_CheckoutOverviewPage');

test.describe('Checkout Journey & Form Validation', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Happy Path: Complete end-to-end purchase flow', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfo = new CheckoutInfoPage(page);
    const checkoutOverview = new CheckoutOverviewPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutInfo.fillShippingInfo('Ahmed', 'Tester', '12345');
    await checkoutOverview.clickFinish();

    const successMsg = await checkoutOverview.getSuccessMessage();
    expect(successMsg).toBe('Thank you for your order!');
  });

  test('Negative Test: Leaving postal code blank during checkout shows error', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfo = new CheckoutInfoPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Fill only first and last name, leave postal code empty
    await page.fill('#first-name', 'Ahmed');
    await page.fill('#last-name', 'Tester');
    await page.click('#continue');

    // Verify error message pops up
    const errorMsg = await page.locator('[data-test="error"]').textContent();
    expect(errorMsg).toContain('Error: Postal Code is required');
  });
});