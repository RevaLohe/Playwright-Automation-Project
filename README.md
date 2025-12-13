
```md
# Playwright Test Automation Framework (TypeScript)

A modern **web test automation framework** built using **Playwright with TypeScript**, following **Page Object Model (POM)** principles.  
This project is designed to demonstrate **real-world QA automation practices** with a clean, scalable, and maintainable structure.

> This repository currently contains the **Login module** as a starting point.  
> Additional modules and framework enhancements will be added incrementally.

---

## Tech Stack
- **Playwright**
- **TypeScript**
- **Node.js**
- **Page Object Model (POM)**

---

## 📂 Project Structure
```

playwright-web-automation/
│
├─ pages/              # Page Object classes
├─ selectors/          # Centralized locators
├─ test-data/          # Test data (users, configs)
├─ tests/              # Test specifications
├─ playwright.config.ts
└─ README.md

````

---

##  Current Features
- Login automation (Positive & Negative scenarios)
- Centralized and reusable locators
- Page Object Model implementation
- Clean test steps using Playwright `test.step`
- Robust assertions and validations
- Scalable project structure


## How to Run Tests

### Install dependencies
```bash
npm install
````

### Install Playwright browsers

```bash
npx playwright install
```

###  Run all tests

```bash
npx playwright test
```

###  Run tests with UI

```bash
npx playwright test --ui
```

---

##  Test Reports

Playwright HTML reports are generated automatically.

```bash
npx playwright show-report
```

---

##  Upcoming Enhancements

* Additional functional modules
* API validations
* Reusable utilities & helpers
* Environment-based execution
* CI/CD integration
* Advanced reporting & logging

---

##  Best Practices Followed

* Page Object Model (POM)
* Stable `data-test` selectors
* Separation of tests, pages, and data
* Readable and maintainable test flows
* Enterprise-style automation design

---

## 📄 License

### **Restricted License – All Rights Reserved**

This project is intended for **learning, demonstration, and portfolio purposes only**.

❌ **Redistribution, commercial use, or copying of this code without explicit permission is not allowed.**
❌ **Using this project directly in paid or client work is prohibited.**

If you wish to use or extend this project for other purposes, please contact the author.

---

##  Author

**Reva Lohe**
Automation Tester | SDET | Playwright | TypeScript

