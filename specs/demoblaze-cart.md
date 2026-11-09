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
    - expect: Phone products appear in the catalog, including Samsung galaxy s6 at 360.
  3. Open Samsung galaxy s6 from the catalog.
    - expect: The product detail page shows Samsung galaxy s6.
    - expect: The product detail price is $360 *includes tax and matches the Samsung galaxy s6 price of 360 shown in the category list.
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
    - expect: The Place Order control is visible; do not activate it.

#### 2.3. should add the same product twice and remove one cart entry

**File:** `tests/demoblaze-cart.spec.js`

**Steps:**
  1. Open the Demoblaze home page in a fresh guest browser context, select Phones, and open Samsung galaxy s6.
    - expect: The product detail page shows Samsung galaxy s6 at $360 *includes tax.
  2. Select Add to cart twice, accepting the “Product added” alert after each addition.
    - expect: Each addition displays the “Product added” alert.
  3. Open Cart.
    - expect: Two Samsung galaxy s6 entries are listed, each priced 360.
    - expect: The cart total is 720.
    - expect: The Place Order control is visible; do not activate it.
  4. Delete one Samsung galaxy s6 entry.
    - expect: One Samsung galaxy s6 entry remains at price 360.
    - expect: The cart total updates to 360.
    - expect: The Place Order control remains visible; do not activate it.

#### 2.4. should remove the only product from the cart

**File:** `tests/demoblaze-cart.spec.js`

**Steps:**
  1. Open the Demoblaze home page in a fresh guest browser context, select Phones, and open Samsung galaxy s6.
    - expect: The product detail page shows Samsung galaxy s6 at $360 *includes tax.
  2. Select Add to cart and accept the “Product added” alert, then open Cart.
    - expect: Samsung galaxy s6 is listed at price 360.
    - expect: The cart total is 360.
    - expect: The Place Order control is visible; do not activate it.
  3. Delete Samsung galaxy s6 from the cart.
    - expect: The Samsung galaxy s6 row and its price are no longer displayed.
    - expect: The cart total is empty or zero.
    - expect: The Place Order control remains visible; do not activate it.

#### 2.5. should add two different products from the same category

**File:** `tests/demoblaze-cart.spec.js`

**Steps:**
  1. Open the Demoblaze home page in a fresh guest browser context and select Phones.
    - expect: Phone products include Samsung galaxy s6 at 360 and Nokia lumia 1520 at 820.
  2. Open Samsung galaxy s6, select Add to cart, and accept the “Product added” alert.
    - expect: The product is added to the cart.
  3. Return to the home page, select Phones, open Nokia lumia 1520, select Add to cart, and accept the “Product added” alert.
    - expect: Nokia lumia 1520 is added to the cart.
  4. Open Cart.
    - expect: Samsung galaxy s6 is listed at 360 and Nokia lumia 1520 at 820.
    - expect: The cart total is 1180.
    - expect: The Place Order control is visible; do not activate it.

#### 2.6. should add products from different categories

**File:** `tests/demoblaze-cart.spec.js`

**Steps:**
  1. Open the Demoblaze home page in a fresh guest browser context and select Phones.
    - expect: Samsung galaxy s6 is listed at 360.
  2. Open Samsung galaxy s6, select Add to cart, and accept the “Product added” alert.
    - expect: The product is added to the cart.
  3. Return to the home page, select Laptops, open Sony vaio i5, select Add to cart, and accept the “Product added” alert.
    - expect: Sony vaio i5 is listed at 790 in the Laptops category and is added to the cart.
  4. Open Cart.
    - expect: Samsung galaxy s6 is listed at 360 and Sony vaio i5 at 790.
    - expect: The cart total is 1150.
    - expect: The Place Order control is visible; do not activate it.
