class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = '#checkout';
    this.cartItem = '.cart_item';
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutBtn);
  }

  // Returns the locator so the test file can assert on it directly
  getCartItemLocator() {
    return this.page.locator(this.cartItem);
  }
}

module.exports = { CartPage };