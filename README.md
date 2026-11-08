## Swag Labs E2E Automation Framework 

A professional End-to-End (E2E) test automation framework built for **Swag Labs** (`https://www.saucedemo.com`) using **Playwright** and the **Page Object Model (POM)** 

---

## 🛠️Tech Stack & Tools
* **Test Automation Framework:** Playwright (JavaScript)
* **Design Pattern:** Page Object Model (POM)
* **Target Application:** [Swag Labs Demo Store](https://www.saucedemo.com)
* **CI/CD:** GitHub Actions (configured for automated pipeline runs)

---

## 📂 Project Architecture
```text
├── pages/                  # Page Object Model classes (Locators & Actions)
│   ├── 01_LoginPage.js
│   ├── 02_InventoryPage.js
│   ├── 03_CartPage.js
│   ├── 04_CheckoutInfoPage.js
│   └── 05_CheckoutOverviewPage.js
├── tests/                  # Test Specification files
│   ├── 01_login.spec.js
│   ├── 02_inventory.spec.js
│   ├── 03_cart.spec.js
│   └── 04_checkout.spec.js
├── playwright.config.js    # Playwright configuration file
└── package.json            # Project dependencies and scripts