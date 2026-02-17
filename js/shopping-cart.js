/*
=============
Shopping Cart Management
=============
*/

// Initialize cart from localStorage
const ShoppingCart = {
  storageKey: 'shoppingCart',
  
  // Get cart from localStorage
  getCart() {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  },

  // Save cart to localStorage
  saveCart(cart) {
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    this.updateCartCount();
  },

  // Add item to cart
  addToCart(product) {
    const cart = this.getCart();
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // Increase quantity if product exists
      existingItem.quantity = (existingItem.quantity || 1) + (product.quantity || 1);
    } else {
      // Add new product to cart
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1
      });
    }
    
    this.saveCart(cart);
    this.showNotification(`${product.title} added to cart!`);
  },

  // Remove item from cart
  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  },

  // Update item quantity
  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      item.quantity = Math.max(1, Math.min(10, quantity)); // Keep between 1-10
      this.saveCart(cart);
    }
  },

  // Get cart count
  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Update cart count in header
  updateCartCount() {
    const cartTotal = document.getElementById('cart__total');
    if (cartTotal) {
      cartTotal.textContent = this.getCartCount();
    }
  },

  // Show notification
  showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('cart-notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'cart-notification';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 10000;
        font-weight: bold;
      `;
      document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }
};

// Initialize "Add To Cart" buttons on product pages using event delegation
const initAddToCartButtons = () => {
  // Use event delegation on document to catch dynamically created buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.product__btn, .add');
    
    if (!btn) return; // Not a cart button
    
    e.preventDefault();
    
    // Find the product container (could be .product or nearest parent with product info)
    const productContainer = btn.closest('.product') || btn.closest('.product-detail__container');
    
    if (productContainer) {
      // Extract product data from different page types
      let product = {};

      // For product listings (product.html product cards)
      if (btn.classList.contains('product__btn')) {
        const footer = productContainer.querySelector('.product__footer');
        if (footer) {
          // Get product ID from data attribute, fallback to index
          product.id = productContainer.getAttribute('data-product-id') || `product-${Date.now()}-${Math.random()}`;
          product.title = footer.querySelector('h3')?.textContent || 'Unknown Product';
          product.price = parseFloat(footer.querySelector('.product__price h4')?.textContent?.replace('$', '') || 0);
          product.image = productContainer.querySelector('img')?.src || '';
          product.quantity = 1;
        }
      }
      // For detail page (product.html detail view)
      else if (btn.classList.contains('add')) {
        const detailContent = productContainer.querySelector('.product-detail__content');
        const counterInput = productContainer.querySelector('.counter-btn');

        if (detailContent) {
          // Extract product ID from URL or generate one
          const urlParams = new URLSearchParams(window.location.search);
          product.id = urlParams.get('id') || `product-${Date.now()}`;
          product.title = detailContent.querySelector('h3')?.textContent || 'Unknown Product';
          product.price = parseFloat(detailContent.querySelector('.price .new__price')?.textContent?.replace('$', '') || 0);
          product.image = document.querySelector('#pic')?.src || '';
          product.quantity = parseInt(counterInput?.value || 1);
        }
      }

      // Add to cart if we have product data
      if (product.title && product.price) {
        ShoppingCart.addToCart(product);
      }
    }
  });
};

// Load cart data on cart page and render items
const loadCartPage = () => {
  const tableBody = document.querySelector('table tbody');
  
  if (!tableBody) return; // Not on cart page

  const cart = ShoppingCart.getCart();

  // Clear existing rows (except headers)
  const rows = tableBody.querySelectorAll('tr');
  rows.forEach(row => row.remove());

  if (cart.length === 0) {
    // Show empty cart message
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="5" style="text-align: center; padding: 40px;">Your cart is empty</td>';
    tableBody.appendChild(emptyRow);
    updateCartTotals(0);
    return;
  }

  // Add cart items to table
  cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="product__thumbnail">
        <a href="#">
          <img src="${item.image}" alt="${item.title}">
        </a>
      </td>
      <td class="product__name">
        <a href="#">${item.title}</a>
        <br><br>
        <small>Variant/Size</small>
      </td>
      <td class="product__price">
        <div class="price">
          <span class="new__price">$${item.price.toFixed(2)}</span>
        </div>
      </td>
      <td class="product__quantity">
        <div class="input-counter">
          <div>
            <span class="minus-btn">
              <svg>
                <use xlink:href="./images/sprite.svg#icon-minus"></use>
              </svg>
            </span>
            <input type="text" min="1" value="${item.quantity}" max="10" class="counter-btn" data-product-id="${item.id}">
            <span class="plus-btn">
              <svg>
                <use xlink:href="./images/sprite.svg#icon-plus"></use>
              </svg>
            </span>
          </div>
        </div>
      </td>
      <td class="product__subtotal">
        <div class="price">
          <span class="new__price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <a href="#" class="remove__cart-item" data-product-id="${item.id}">
          <svg>
            <use xlink:href="./images/sprite.svg#icon-trash"></use>
          </svg>
        </a>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Re-initialize cart functionality
  initCart();
  updateCartTotals();
};

// Get quantity and update subtotal for each product
const updateCart = () => {
  const cartItems = document.querySelectorAll('table tbody tr');
  let cartSubtotal = 0;

  cartItems.forEach(item => {
    const quantityInput = item.querySelector('.counter-btn');
    const priceText = item.querySelector('.product__price .new__price')?.textContent;
    const price = parseFloat(priceText?.replace('$', '') || 0);
    const quantity = parseInt(quantityInput?.value) || 1;
    const itemTotal = price * quantity;

    // Update the product subtotal
    const subtotalSpan = item.querySelector('.product__subtotal .new__price');
    if (subtotalSpan) {
      subtotalSpan.textContent = `$${itemTotal.toFixed(2)}`;
    }

    cartSubtotal += itemTotal;
  });

  // Update cart totals
  updateCartTotals(cartSubtotal);
};

// Update cart totals including shipping
const updateCartTotals = (subtotal = 0) => {
  const shippingCheckbox = document.querySelector('.check__shipping input');
  const shippingCost = shippingCheckbox && shippingCheckbox.checked ? 7 : 0;
  const total = subtotal + shippingCost;

  // Update subtotal
  const subtotalSpan = document.querySelector('.cart__totals ul li:first-child .new__price');
  if (subtotalSpan) {
    subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Update shipping
  const shippingSpan = document.querySelector('.cart__totals ul li:nth-child(2) span');
  if (shippingSpan) {
    shippingSpan.textContent = `$${shippingCost}`;
  }

  // Update total
  const totalSpan = document.querySelector('.cart__totals ul li:last-child .new__price');
  if (totalSpan) {
    totalSpan.textContent = `$${total.toFixed(2)}`;
  }
};

// Initialize cart event listeners
const initCart = () => {
  const plusBtns = document.querySelectorAll('.plus-btn');
  const minusBtns = document.querySelectorAll('.minus-btn');
  const shippingCheckbox = document.querySelector('.check__shipping input');

  // Plus button click handler
  plusBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const counterInput = btn.parentElement.querySelector('.counter-btn');
      let currentValue = parseInt(counterInput.value) || 1;
      const productId = counterInput.dataset.productId;
      
      if (currentValue < 10) {
        currentValue++;
        counterInput.value = currentValue;
        if (productId) ShoppingCart.updateQuantity(productId, currentValue);
        updateCart();
      }
    });
  });

  // Minus button click handler
  minusBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const counterInput = btn.parentElement.querySelector('.counter-btn');
      let currentValue = parseInt(counterInput.value) || 1;
      const productId = counterInput.dataset.productId;
      
      if (currentValue > 1) {
        currentValue--;
        counterInput.value = currentValue;
        if (productId) ShoppingCart.updateQuantity(productId, currentValue);
        updateCart();
      }
    });
  });

  // Shipping checkbox handler
  if (shippingCheckbox) {
    shippingCheckbox.removeEventListener('change', updateCart);
    shippingCheckbox.addEventListener('change', updateCart);
  }

  // Handle direct input in counter field
  const counterInputs = document.querySelectorAll('.counter-btn');
  counterInputs.forEach(input => {
    input.addEventListener('change', () => {
      let value = parseInt(input.value) || 1;
      const productId = input.dataset.productId;
      
      if (value < 1) {
        value = 1;
        input.value = value;
      } else if (value > 10) {
        value = 10;
        input.value = value;
      }
      
      if (productId) ShoppingCart.updateQuantity(productId, value);
      updateCart();
    });
  });

  // Remove item functionality
  const removeButtons = document.querySelectorAll('.remove__cart-item');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = btn.dataset.productId;
      if (productId) {
        ShoppingCart.removeFromCart(productId);
        btn.closest('tr').remove();
        updateCart();
      }
    });
  });
};

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ShoppingCart.updateCartCount();
    initAddToCartButtons();
    loadCartPage();
  });
} else {
  ShoppingCart.updateCartCount();
  initAddToCartButtons();
  loadCartPage();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ShoppingCart, updateCart, updateCartTotals, initCart };
}
