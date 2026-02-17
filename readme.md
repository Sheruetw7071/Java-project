# Flash Phone Finds - E-Commerce Store

A modern, fully functional e-commerce web application for buying phones and accessories.

## Features

- 🛒 **Shopping Cart** - Add products to cart with persistent localStorage
- 📱 **Product Catalog** - Browse all products with filters
- 💰 **Dynamic Pricing** - Real-time total calculation
- 🎨 **Responsive Design** - Works on all screen sizes
- ⚡ **Fast API** - Backend powered by Express.js

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

To verify installation:
```bash
node --version
npm --version
```

## Installation

### 1. Clone or Extract the Project
```bash
cd d:\UC-13804
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Verify Installation
All dependencies should be installed. Key packages:
- **Frontend**: Glide.js (carousel), AOS (animations)
- **Backend**: Express, CORS

## Running the Application

### Start the Backend Server

```bash
cd backend
node server.js
```

**Output:**
```
Server running at http://localhost:5000
API endpoint: /api/products
```

Keep this terminal window open while testing.

### Open the Frontend

In a new terminal or browser, navigate to:
```
http://localhost:5000
```

Or simply open `index.html` directly in your browser (note: some features may require the server).

## Project Structure

```
UC-13804/
├── index.html              # Home page
├── product.html            # Products catalog
├── cart.html               # Shopping cart
├── styles.css              # Global styles
├── package.json            # Frontend dependencies
├── jest.config.js          # Testing configuration
│
├── js/                     # Frontend JavaScript
│   ├── index.js            # Navigation & main functionality
│   ├── products.js         # Product fetching & display
│   ├── shopping-cart.js    # Cart management
│   ├── slider.js           # Image slider
│   └── setupTests.js       # Test setup
│
├── backend/                # Backend API
│   ├── server.js           # Express server
│   ├── package.json        # Backend dependencies
│   ├── routes/
│   │   └── products.js     # Product routes
│   ├── data/
│   │   └── products.json   # Product database
│   └── __tests__/
│       └── routes.test.js  # API tests
│
└── images/                 # Product images
    └── products/
        ├── iphone/
        ├── sumsung/
        └── headphone/
```

## Usage

### 1. **Browse Products**
- Go to `product.html` or click "Products" in the navigation
- Products load from the backend API
- Filter by category or search

### 2. **Add to Cart**
- Click "Add To Cart" on any product
- Quantity increases automatically if added twice
- Cart counter updates in the header

### 3. **Manage Cart**
- Go to `cart.html` to view your cart
- Adjust quantities with +/- buttons
- Remove items by clicking the trash icon
- Check shipping option to add $7 fee
- Totals calculate in real-time

### 4. **Cart Persistence**
- Products are saved in browser's localStorage
- Your cart persists across browser sessions
- Clear cache to reset the cart

## API Endpoints

### Get All Products
```
GET http://localhost:5000/api/products
```

**Response:**
```json
{
  "products": [
    {
      "id": 1,
      "title": "Apple iPhone 11",
      "price": 299.99,
      "image": "./images/products/iphone/iphone1.jpeg",
      "category": "Featured Products"
    },
    ...
  ]
}
```

## Available Scripts

### Run Tests
```bash
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

## Troubleshooting

### Issue: Port 5000 Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: Module Not Found
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install

# For backend
cd backend
rm -r node_modules package-lock.json
npm install
```

### Issue: Images Not Loading
- Verify image paths in `backend/data/products.json`
- Images should be in `images/products/` directory
- Paths are relative from the root directory

### Issue: Cart Not Persisting
- Check if localStorage is enabled in browser
- Clear browser cache and try again
- Check browser console for errors (F12 → Console)

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ Internet Explorer (not supported)

## Performance

- Initial load: ~500ms
- Product fetch: ~200ms
- Cart operations: Real-time (instant)

## Development

### Adding New Products
Edit `backend/data/products.json`:
```json
{
  "id": 26,
  "title": "New Product",
  "price": 399.99,
  "image": "./images/products/category/product.jpeg",
  "category": "Featured Products"
}
```

### Modifying Cart Logic
Edit `js/shopping-cart.js`:
- `ShoppingCart.addToCart()` - Add product logic
- `ShoppingCart.removeFromCart()` - Remove product logic
- `updateCart()` - Recalculate totals

### Styling Updates
Edit `styles.css` for design changes.

## Future Enhancements

- [ ] User authentication & accounts
- [ ] Product search functionality
- [ ] Wishlist feature
- [ ] Product reviews & ratings
- [ ] Checkout process
- [ ] Payment gateway integration
- [ ] Order history
- [ ] Admin dashboard
- [ ] Inventory management

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console (F12) for errors
3. Verify backend is running on port 5000
4. Ensure all dependencies are installed

## License

This project is provided as-is for development and learning purposes.

---

**Last Updated:** February 17, 2026
