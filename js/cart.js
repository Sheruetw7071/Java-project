/*
=============
Cart Functionality
=============
*/

// Get quantity and update subtotal for each product
const updateCart = () => {
  const cartItems = document.querySelectorAll('table tbody tr');
  let cartSubtotal = 0;

  cartItems.forEach(item => {
    const quantityInput = item.querySelector('.counter-btn');
    const priceText = item.querySelector('.product__price .new__price').textContent;
    const price = parseFloat(priceText.replace('$', ''));
    const quantity = parseInt(quantityInput.value) || 1;
    const itemTotal = price * quantity;

    // Update the product subtotal
    const subtotalSpan = item.querySelector('.product__subtotal .new__price');
    subtotalSpan.textContent = `$${itemTotal.toFixed(2)}`;

    cartSubtotal += itemTotal;
  });

  // Update cart totals
  updateCartTotals(cartSubtotal);
};

// Update cart totals including shipping
const updateCartTotals = (subtotal) => {
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
      
      if (currentValue < 10) {
        counterInput.value = currentValue + 1;
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
      
      if (currentValue > 1) {
        counterInput.value = currentValue - 1;
        updateCart();
      }
    });
  });

  // Shipping checkbox handler
  if (shippingCheckbox) {
    shippingCheckbox.addEventListener('change', updateCart);
  }

  // Handle direct input in counter field
  const counterInputs = document.querySelectorAll('.counter-btn');
  counterInputs.forEach(input => {
    input.addEventListener('change', () => {
      let value = parseInt(input.value) || 1;
      
      if (value < 1) {
        input.value = 1;
      } else if (value > 10) {
        input.value = 10;
      }
      
      updateCart();
    });
  });

  // Remove item functionality
  const removeButtons = document.querySelectorAll('.remove__cart-item');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.closest('tr').remove();
      updateCart();
    });
  });
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCart);
} else {
  initCart();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { updateCart, updateCartTotals, initCart };
}
