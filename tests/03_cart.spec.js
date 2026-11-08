const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/01_LoginPage');
const { InventoryPage } = require('../pages/02_InventoryPage');
const { CartPage } = require('../pages/03_CartPage');

test.describe('Shopping Cart Actions', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Happy Path: Add item to cart and verify it appears', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    // Use Playwright's built-in visibility check
    await expect(cartPage.getCartItemLocator()).toBeVisible();
  });

  test('Edge Case: Remove item from cart and verify cart is empty', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();

    // Click remove button inside the cart
    await page.click('#remove-sauce-labs-backpack');
    
    // Verify cart item count badge disappears
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveCount(0);
  });
});