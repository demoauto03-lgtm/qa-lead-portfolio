# Demoblaze Product Browsing and Cart Test Plan

## Application Overview

Validate the guest product-browsing flow on Demoblaze: filter the catalog by Phones, Laptops, and Monitors; open a product detail page; add one product to the cart; and verify the cart row and total. The seed test opens https://www.demoblaze.com/ and checks the STORE title. Observed during exploration: category filtering updates the product set; Samsung galaxy s6 opens with a $360 price and description; Add to cart shows a native alert reading “Product added”; the cart then shows the Samsung galaxy s6 at 360 and a total of 360. Use a fresh guest browser context per test. Do not log in, sign up, or click Place Order.

## Test Scenarios

### 1. Catalog category filtering

**Seed:** `agentic-testing/tests/seed.spec.ts`

#### 1.1. should show only products from the selected category

**File:** `tests/demoblaze-cart.spec.js`

**Steps:**
  1. Open the Demoblaze home page using the seed setup.
    - expect: The page title matches STORE.
    - expect: The catalog and Phones, Laptops, and Monitors category links are visible.
  2. Select Phones in the category list and wait for the catalog to refresh.
    - expect: Phone products are shown, including Samsung galaxy s6.
    - expect: Laptop and monitor products are not shown in this category result.
  3. Select Laptops and wait for the catalog to refresh.
    - expect: Laptop products are shown, including Sony vaio i5 and MacBook air.
    - expect: Phone and monitor products are not shown in this category result.
  4. Select Monitors and wait for the catalog to refresh.
    - expect: Monitor products are shown, including Apple monitor 24 and ASUS Full HD.
    - expect: Phone and laptop products are not shown in this category result.
  5. Select Phones again.
    - expect: The phone result set returns and monitor products are no longer shown.

### 2. Product details and cart

**Seed:** `agentic-testing/tests/seed.spec.ts`

#### 2.1. should open a product detail page

**File:** `tests/demoblaze-cart.spec.js`

**Steps:**
  1. Open the Demoblaze home page in a fresh guest browser context.
    - expect: The page title matches STORE.
  2. Select Phones from the category list.
    - expect: Phone products appear in the catalog.
  3. Open Samsung galaxy s6 from the catalog.
    - expect: The product detail page shows Samsung galaxy s6.
    - expect: The displayed price is $360 *includes tax.
    - expect: A product description and an Add to cart link are visible.

#### 2.2. should add a product and display it in the cart

**File:** `tests/demoblaze-cart.spec.js`

**Steps:**
  1. Open the Demoblaze home page in a fresh guest browser context.
    - expect: The page title matches STORE.
  2. Select Phones, then open Samsung galaxy s6.
    - expect: The Samsung galaxy s6 product detail page is displayed with its $360 price.
  3. Select Add to cart and accept the native alert.
    - expect: A native alert with the message Product added is displayed.
    - expect: The alert closes and the product page remains available.
  4. Select Cart in the navigation.
    - expect: The cart lists Samsung galaxy s6 with price 360.
    - expect: The cart total is 360.
    - expect: The Place Order control may be visible; do not activate it.
