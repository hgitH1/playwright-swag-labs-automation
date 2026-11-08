class InventoryPage {
  constructor(page) {
    this.page = page;
    // Using standard data-test selectors provided by Swag Labs
    this.addToCartBackpackBtn = '#add-to-cart-sauce-labs-backpack';
    this.cartIcon = '.shopping_cart_link';
    this.itemTitle = '.title';
  }

  async addBackpackToCart() {
    await this.page.click(this.addToCartBackpackBtn);
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
  }

  async getPageTitle() {
    return await this.page.locator(this.itemTitle).textContent();
  }
}

module.exports = { InventoryPage };