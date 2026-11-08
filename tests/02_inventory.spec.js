const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/01_LoginPage');
const { InventoryPage } = require('../pages/02_InventoryPage');

test.describe('Inventory & Product Catalog', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Verify user can sort products by price (Low to High)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Select sort option: Price (low to high)
    await page.locator('.product_sort_container').selectOption('lohi');
    
    // Grab the first item price and verify it's the lowest
    const firstPrice = await page.locator('.inventory_item_price').first().textContent();
    expect(firstPrice).toBe('$7.99'); // Sauce Labs Onesie is cheapest
  });
});