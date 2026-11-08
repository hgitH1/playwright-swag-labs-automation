class CheckoutOverviewPage {
  constructor(page) {
    this.page = page;
    this.finishBtn = '#finish';
    this.successHeader = '.complete-header';
  }

  async clickFinish() {
    await this.page.click(this.finishBtn);
  }

  async getSuccessMessage() {
    return await this.page.locator(this.successHeader).textContent();
  }
}

module.exports = { CheckoutOverviewPage };