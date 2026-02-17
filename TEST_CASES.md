# Flash Phone Finds - Test Cases & Data

## Test Environment Setup

**Prerequisites:**
- Backend server running on `http://localhost:5000`
- Browser with localStorage enabled
- All dependencies installed (`npm install`)

---

## TEST SUITE 1: Navigation & Page Load

### TC-101: Home Page Load
**Action:** Open `index.html` in browser  
**Expected Result:**
- Page loads without errors
- Header with navigation visible
- Hero banner displays
- Cart counter shows "0"
- All images load correctly

### TC-102: Navigation Links
**Action:** Click "Products" in navigation menu  
**Expected Result:**
- Page navigates to `product.html`
- URL shows product page
- Products fetch from API

### TC-103: Cart Link Navigation
**Action:** Click cart icon in header  
**Expected Result:**
- Navigate to `cart.html`
- Page displays cart table
- Current cart items visible

### TC-104: Mobile Menu Toggle
**Action:** Click hamburger menu icon on mobile (<768px)  
**Expected Result:**
- Navigation menu slides out from left
- Menu items visible and clickable
- Close button (X) appears

### TC-105: Mobile Menu Close
**Action:** Click close button (X) in mobile menu  
**Expected Result:**
- Menu slides back in
- Navigation disappears
- Page content visible

---

## TEST SUITE 2: Product Listing & Filtering

### TC-201: Products Page Load
**Action:** Navigate to `product.html`  
**Expected Result:**
- All 25 products load from API
- Each product shows:
  - Image
  - Product title
  - Star rating (4/5 stars)
  - Price ($)
  - "Add To Cart" button

### TC-202: Product Filter - Featured Products
**Action:** Click "Featured Products" filter button  
**Expected Result:**
- Product list updates immediately
- Only featured products display (8 products)
- Other categories hidden

### TC-203: Product Filter - Special Products
**Action:** Click "Special Products" filter button  
**Expected Result:**
- Product list updates
- Only special products display (9 products)
- Featured/Trending products hidden

### TC-204: Product Filter - Trending Products
**Action:** Click "Trending Products" filter button  
**Expected Result:**
- Product list updates
- Only trending products display (8 products)
- Other categories hidden

### TC-205: Product Filter - All Products
**Action:** Click "All Products" filter button  
**Expected Result:**
- All 25 products display again
- No filtering applied

### TC-206: Product Display Accuracy
**Action:** On product page, verify product details  
**Expected Result:**
- Apple iPhone 11 (ID: 6) = $760
- Samsung Galaxy (ID: 17) = $550
- Sony WH-CH510 (ID: 1) = $265
- All prices match backend API data

---

## TEST SUITE 3: Add to Cart - Single Product

### TC-301: Add Single Product to Cart
**Action:** 
1. Go to product page
2. Click "Add To Cart" on Apple iPhone 11 ($760)  
**Expected Result:**
- Green notification appears: "Apple iPhone 11 added to cart!"
- Cart counter in header increases from 0 to 1
- Notification disappears after 3 seconds

### TC-302: Add Different Product
**Action:**
1. Click "Add To Cart" on Samsung Galaxy ($550)  
**Expected Result:**
- Green notification: "Samsung Galaxy added to cart!"
- Cart counter increases to 2
- Two different products now in cart

### TC-303: Add Third Product
**Action:**
1. Click "Add To Cart" on Sony WH-CH510 ($265)  
**Expected Result:**
- Green notification: "Sony WH-CH510 added to cart!"
- Cart counter increases to 3

### TC-304: Add Same Product Twice
**Action:**
1. Go to product page
2. Click "Add To Cart" on Apple iPhone 11
3. Wait for notification to disappear
4. Click "Add To Cart" on the same Apple iPhone 11 again  
**Expected Result:**
- Two notifications appear (one after another)
- Cart counter shows 4 (1 from TC-301 + 1 from TC-303 + 2 from TC-304)
- **OR** in cart page, Apple iPhone 11 quantity = 2 (merged into single row)

### TC-305: Notification Styling
**Action:** Add product and observe notification  
**Expected Result:**
- Notification appears in top-right corner
- Green background (#4CAF50)
- White text
- Bold font
- Visible for exactly 3 seconds

---

## TEST SUITE 4: Shopping Cart Management

### TC-401: View Cart After Adding Products
**Action:**
1. Add 3 different products (from previous tests)
2. Click cart icon
3. Go to `cart.html`  
**Expected Result:**
- Cart page displays table with 3 rows
- Each row shows:
  - Product image thumbnail
  - Product name
  - Unit price ($)
  - Quantity (default 1)
  - Subtotal (price × quantity)
  - Remove button (trash icon)
- Cart counter in header shows 3

### TC-402: Increase Product Quantity
**Action:**
1. On cart page, find Apple iPhone 11 ($760)
2. Click + button next to quantity  
**Expected Result:**
- Quantity increases from 1 to 2
- Subtotal updates from $760 to $1,520
- Cart counter increases by 1

### TC-403: Decrease Product Quantity
**Action:**
1. Click - button on product with quantity 2  
**Expected Result:**
- Quantity decreases from 2 to 1
- Subtotal updates back to original price
- Cart counter decreases by 1

### TC-404: Minimum Quantity Protection
**Action:**
1. Find product with quantity 1
2. Click - button  
**Expected Result:**
- Quantity stays at 1 (doesn't go below)
- Subtotal unchanged
- No error message (graceful handling)

### TC-405: Maximum Quantity Protection
**Action:**
1. Find product with quantity 10
2. Click + button  
**Expected Result:**
- Quantity stays at 10 (doesn't exceed)
- Subtotal unchanged
- No error message

### TC-406: Manual Quantity Input
**Action:**
1. Click on quantity input field
2. Clear and type "5"
3. Press Enter/Tab  
**Expected Result:**
- Quantity updates to 5
- Subtotal recalculates (price × 5)
- Cart counter updates

### TC-407: Invalid Quantity Input
**Action:**
1. Click on quantity input field
2. Type "15" (exceeds max of 10)
3. Press Enter  
**Expected Result:**
- Quantity automatically corrects to 10
- No error message shown

### TC-408: Negative Quantity Protection
**Action:**
1. Click on quantity input field
2. Try to type "-5"  
**Expected Result:**
- Quantity defaults to 1
- Negative values not accepted

---

## TEST SUITE 5: Cart Calculations

### TC-501: Single Item Subtotal
**Test Data:** Apple iPhone 11 = $760 × 1 = $760  
**Action:** Add 1 product to cart  
**Expected Result:**
- Cart total shows $760.00
- Subtotal = $760.00
- No shipping charge (unchecked) = $0
- Grand total = $760.00

### TC-502: Multiple Items Subtotal
**Test Data:**
- Apple iPhone 11 = $760 × 1
- Samsung Galaxy = $550 × 2
- Sony WH-CH510 = $265 × 1  
**Action:** 
1. Add all products to cart
2. Adjust Samsung to quantity 2  
**Expected Result:**
- Subtotal = $760 + $1,100 + $265 = $2,125.00
- Shipping = $0
- Grand total = $2,125.00

### TC-503: Shipping Cost Applied
**Test Data:** Subtotal = $2,125.00  
**Action:**
1. Check "Shipping(+7$)" checkbox  
**Expected Result:**
- Shipping row shows $7.00
- Cart total updates to $2,132.00
- Formula: Subtotal + Shipping = Total

### TC-504: Shipping Cost Removed
**Action:**
1. Uncheck "Shipping(+7$)" checkbox  
**Expected Result:**
- Shipping row shows $0
- Grand total returns to subtotal ($2,125.00)

### TC-505: Real-time Total Update
**Action:**
1. Product in cart with quantity 1, price $760
2. Click + button 5 times  
**Expected Result:**
- After each click:
  - Quantity updates
  - Subtotal updates immediately
  - Grand total updates in real-time
- Final: quantity 6, subtotal $4,560.00

### TC-506: Price Formatting
**Action:** View any product price in cart  
**Expected Result:**
- All prices show as $X.XX format
- Always 2 decimal places
- Dollar sign prefix
- No commas for thousands (< $1000 in test data)

---

## TEST SUITE 6: Remove Items from Cart

### TC-601: Remove Single Item
**Action:**
1. Cart has 3 items
2. Click trash icon on Samsung Galaxy row  
**Expected Result:**
- Samsung Galaxy row disappears
- Cart now shows 2 items
- Cart counter decreases by 2 (was quantity 2)
- Subtotal recalculates without this item

### TC-602: Remove All Items
**Action:**
1. Repeatedly click trash icon until cart empty  
**Expected Result:**
- All rows disappear
- "Your cart is empty" message shows
- Cart counter shows 0
- Subtotal, shipping, total all show $0.00

### TC-603: Remove and Back Button
**Action:**
1. Cart has 1-2 items
2. Remove all items
3. Click browser back button  
**Expected Result:**
- Page doesn't navigate back (cart page stays)
- Or navigates to previous page correctly
- Cart remains empty

---

## TEST SUITE 7: Cart Persistence (LocalStorage)

### TC-701: Cart Persists on Page Refresh
**Action:**
1. Add products to cart (e.g., 3 items)
2. Press F5 or Ctrl+R to refresh page  
**Expected Result:**
- Page reloads
- Cart still shows same 3 items
- Quantities unchanged
- Cart counter still shows correct count

### TC-702: Cart Persists Across Pages
**Action:**
1. Add products to cart (2-3 items)
2. Go to home page (`index.html`)
3. Go back to product page (`product.html`)
4. Go to cart page (`cart.html`)  
**Expected Result:**
- Same products in cart across all pages
- Cart counter updates on each page
- Data persists through navigation

### TC-703: Cart Persists After Browser Close
**Action:**
1. Add 5 products to cart
2. Note the cart contents
3. **Close browser completely** (all windows/tabs)
4. Reopen browser
5. Navigate to `cart.html`  
**Expected Result:**
- All 5 products still in cart
- Same quantities
- Same prices
- Cart counter shows same total

### TC-704: Clear Browser Cache - Cart Lost
**Action:**
1. Add products to cart
2. Open DevTools (F12)
3. Go to Application → Storage → Local Storage
4. Clear all (delete the 'shoppingCart' entry)
5. Refresh page  
**Expected Result:**
- "Your cart is empty" message
- Cart counter shows 0
- All items gone

---

## TEST SUITE 8: Product Detail Page

### TC-801: Product Detail Load
**Action:** Open `product.html` directly  
**Expected Result:**
- Page displays single product details
- Product title: "Apple iPhone XR"
- Product price: $250.99
- Rating: 4/5 stars displayed
- Product images in carousel
- Description tab active
- Quantity counter visible
- "ADD TO CART" button visible

### TC-802: Product Image Carousel
**Action:**
1. On product detail page
2. Click different thumbnail images  
**Expected Result:**
- Main product image updates with clicked thumbnail
- Smooth transition
- All 5 iPhone images rotate correctly

### TC-803: Quantity Counter on Detail Page
**Action:**
1. Product detail page loaded
2. Click + button multiple times  
**Expected Result:**
- Quantity increases from 1 to 2, 3, 4...
- Subtotal price updates (price × quantity)
- Can go up to 10

### TC-804: Add to Cart from Detail Page
**Action:**
1. On product detail page
2. Set quantity to 3
3. Click "ADD TO CART" button  
**Expected Result:**
- Green notification: "Apple iPhone XR added to cart!"
- Cart counter increases by 3
- Product added with quantity 3

### TC-805: Description Tab
**Action:**
1. Click "Description" tab  
**Expected Result:**
- Tab active (highlighted)
- Shows "Product Overview" section
- Lists key features
- "In the Box" section visible
- "Our Guarantee" section visible
- 30-point inspection mentioned

### TC-806: Reviews Tab
**Action:**
1. Click "Reviews" tab  
**Expected Result:**
- Tab becomes active
- Shows "Customer Reviews" heading
- Displays 4/5 star rating

### TC-807: Shipping Details Tab
**Action:**
1. Click "Shipping Details" tab  
**Expected Result:**
- Tab becomes active
- Shows "Returns Policy" section
- Shows "Shipping" section
- Return information visible
- 30-day return window mentioned

---

## TEST SUITE 9: Related Products Carousel

### TC-901: Related Products Display
**Action:** Scroll down on product detail page  
**Expected Result:**
- "Related Products" section visible
- Carousel displays 6+ related products
- Each shows: image, name, rating, price, "Add To Cart" button

### TC-902: Carousel Navigation
**Action:**
1. Click right arrow on carousel  
**Expected Result:**
- Products slide to next set
- New products visible

### TC-903: Add Related Product to Cart
**Action:**
1. In related products carousel
2. Click "Add To Cart" on any product  
**Expected Result:**
- Green notification shows
- Cart counter increases
- Product added to cart

---

## TEST SUITE 10: Responsive Design

### TC-1001: Desktop View (1920px)
**Action:** Open on desktop at 1920×1080  
**Expected Result:**
- Page displays in full width
- All elements properly sized
- No horizontal scrollbar
- Navigation menu expanded

### TC-1002: Tablet View (768px)
**Action:** Open on tablet at 768×1024 (or resize browser)  
**Expected Result:**
- Layout adjusts for tablet
- Navigation may collapse to hamburger
- Products display in 2-3 columns
- Touch targets appropriately sized

### TC-1003: Mobile View (375px)
**Action:** Open on mobile at 375×667 (or resize browser)  
**Expected Result:**
- Single column layout
- Navigation collapsed to hamburger menu
- Products stack vertically
- All buttons easily tappable
- No horizontal scrolling
- Cart table displays vertically (scrollable)

### TC-1004: Mobile Cart Table
**Action:** View cart on mobile (375px width)  
**Expected Result:**
- Table displays in responsive format
- All columns visible (may stack)
- Quantity controls easily tappable
- Remove button accessible

---

## TEST SUITE 11: API Integration

### TC-1101: API Response Format
**Action:** Open DevTools (F12) → Network  
**Action:** Navigate to product page  
**Expected Result:**
- Request to `http://localhost:5000/api/products`
- Status: 200 OK
- Response shows JSON with 25 products
- Each product has: id, title, price, image, category

### TC-1102: API Response Data Accuracy
**Action:** Check API response in Network tab  
**Expected Result:**
```json
Sample product:
{
  "id": 6,
  "title": "Apple iPhone 11",
  "image": "./images/products/iphone/iphone3.jpeg",
  "price": 760,
  "category": "Featured Products"
}
```

### TC-1103: API Error Handling (Offline)
**Action:**
1. Disconnect internet/disable network
2. Refresh product page  
**Expected Result:**
- Page loads without crashing
- Products don't appear
- No JavaScript errors in console
- Graceful degradation

### TC-1104: API Performance
**Action:** Open DevTools (F12) → Network  
**Action:** Load product page and note loading time  
**Expected Result:**
- API response time < 500ms
- Page interactive within 2 seconds
- No blocking network requests

---

## TEST SUITE 12: Browser Console - No Errors

### TC-1201: Console on Home Page
**Action:**
1. Open `index.html`
2. Open DevTools (F12) → Console  
**Expected Result:**
- No red error messages
- No JavaScript exceptions
- No warnings about missing resources
- Only info/log messages if any

### TC-1202: Console on Product Page
**Action:**
1. Open `product.html`
2. Open DevTools (F12) → Console  
**Expected Result:**
- No red error messages
- No undefined variable errors
- API call logged (optional)
- Cart data logged (optional)

### TC-1203: Console on Cart Page
**Action:**
1. Add items to cart
2. Open `cart.html`
3. Open DevTools → Console  
**Expected Result:**
- No red error messages
- No console errors on quantity changes
- No errors on item removal

---

## TEST SUITE 13: Accessibility

### TC-1301: Tab Navigation
**Action:**
1. Press Tab repeatedly on home page  
**Expected Result:**
- Focus moves through all interactive elements
- Buttons, links highlighted with focus ring
- Logical tab order (left to right, top to bottom)

### TC-1302: Button Keyboard Access
**Action:**
1. Navigate to "Add To Cart" button with Tab
2. Press Enter  
**Expected Result:**
- Button is activated
- Product added to cart
- Notification appears

### TC-1303: Form Input Focus
**Action:**
1. Tab to quantity input field
2. Type new value
3. Tab away  
**Expected Result:**
- Input accepts keyboard input
- Subtotal updates
- Focus moves to next element

---

## TEST SUITE 14: Error Handling & Edge Cases

### TC-1401: Empty Cart Page Load
**Action:** Clear localStorage and open cart.html  
**Expected Result:**
- Message displays: "Your cart is empty"
- No errors shown
- Cart totals show $0.00
- Continue Shopping link visible

### TC-1402: Invalid Product ID
**Action:** Try to add product with invalid ID through console  
**Expected Result:**
- Cart still functions
- Invalid product not added
- No error message to user

### TC-1403: Rapid Add Button Clicks
**Action:**
1. Click "Add To Cart" button 10 times rapidly  
**Expected Result:**
- All 10 quantities added
- Cart counter shows 10
- Multiple notifications show
- No queue overflow
- System remains stable

### TC-1404: Rapid Quantity Plus Clicks
**Action:** On cart page, click + button 20 times rapidly  
**Expected Result:**
- Quantity caps at 10
- No JavaScript errors
- UI remains responsive
- No duplicate updates

---

## TEST DATA REFERENCE

### Products Available

| ID | Product | Price | Category |
|----|---------|-------|----------|
| 1 | Sony WH-CH510 | $265 | Special Products |
| 2 | Apple iPhone 11 | $300 | Special Products |
| 3 | Sony WH-CH510 | $265 | Special Products |
| 4 | Apple iPhone 11 | $850 | Special Products |
| 5 | Sony WH-CH510 | $250 | Special Products |
| 6 | Apple iPhone 11 | $760 | Featured Products |
| 7 | Sony WH-CH510 | $365 | Featured Products |
| 8 | Apple iPhone 11 | $290 | Featured Products |
| 9 | Sony WH-CH510 | $320 | Special Products |
| 10 | Apple iPhone 11 Pro | $385 | Special Products |
| 11 | Sony WH-CH510 | $475 | Special Products |
| 12 | Sony WH-CH510 | $850 | Special Products |
| 13 | Apple iPhone 11 | $800 | Trending Products |
| 14 | Sony WH-CH510 | $360 | Trending Products |
| 15 | Sony WH-CH510 | $305 | Trending Products |
| 16 | Samsung Galaxy | $400 | Special Products |
| 17 | Samsung Galaxy | $550 | Trending Products |
| 18 | Sony WH-CH510 | $630 | Trending Products |
| 19 | Sony WH-CH510 | $250 | Trending Products |
| 20 | Samsung Galaxy | $270 | Special Products |
| 21 | Sony WH-CH510 | $700 | Trending Products |
| 22 | Samsung Galaxy | $460 | Trending Products |
| 23 | Sony WH-CH510 | $600 | Featured Products |
| 24 | Samsung Galaxy | $500 | Featured Products |
| 25 | Samsung Galaxy | $450 | Special Products |

### Test Scenarios

**Scenario 1: Basic Shopping**
- Add Apple iPhone 11 ($760) × 1
- Expected cart total: $760.00

**Scenario 2: Multiple Items**
- Add Apple iPhone 11 ($760) × 1
- Add Samsung Galaxy ($550) × 2
- Add Sony WH-CH510 ($265) × 1
- Expected subtotal: $2,125.00
- With shipping: $2,132.00

**Scenario 3: Max Quantity**
- Add any product × 10 (maximum)
- Try to add more (should stay at 10)

**Scenario 4: Empty and Refill**
- Add 5 products
- Remove all
- Cart should show "Your cart is empty"
- Add 1 new product
- Cart should function normally

---

## Pass/Fail Criteria

### ✅ PASS
- All test cases execute as expected
- No JavaScript console errors
- All notifications display correctly
- Cart calculations accurate
- LocalStorage persistence works
- Responsive design functional
- API calls successful

### ❌ FAIL
- Any test case behaves differently than expected
- Console shows red errors
- Calculations incorrect
- Data doesn't persist
- Page crashes or becomes unresponsive
- API returns 500 error

---

## Notes for Testers

1. **Clear Cache Before Testing:** Delete localStorage entry 'shoppingCart' to start fresh
2. **Use DevTools:** F12 to check console and network
3. **Test All Browsers:** Chrome, Firefox, Safari, Edge
4. **Mobile Testing:** Use actual devices or browser device emulation
5. **Network Testing:** Test with slow network (Throttle in DevTools)
6. **Screenshot:** Capture any failures for documentation
7. **Repeat Tests:** Run through complete suite after each code change

---

**Last Updated:** February 17, 2026  
**Total Test Cases:** 114  
**Estimated Test Time:** 4-6 hours (automated) / 8-12 hours (manual)
