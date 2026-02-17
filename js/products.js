/*
=============
Fetch Products from API
=============
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Get products from backend API
const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data.products || [];
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
};

// Display products on page
const displayProductItems = (items) => {
  const categoryCenter = document.querySelector(".category__center");
  
  if (!categoryCenter) return;
  
  let displayProduct = items.map(product => `
    <div class="product category__products" data-product-id="${product.id}">
      <div class="product__header">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product__footer">
        <h3>${product.title}</h3>
        <div class="rating">
          <svg><use xlink:href="./images/sprite.svg#icon-star-full"></use></svg>
          <svg><use xlink:href="./images/sprite.svg#icon-star-full"></use></svg>
          <svg><use xlink:href="./images/sprite.svg#icon-star-full"></use></svg>
          <svg><use xlink:href="./images/sprite.svg#icon-star-full"></use></svg>
          <svg><use xlink:href="./images/sprite.svg#icon-star-empty"></use></svg>
        </div>
        <div class="product__price">
          <h4>$${product.price}</h4>
        </div>
        <a href="#"><button type="submit" class="product__btn">Add To Cart</button></a>
      </div>
      <ul>
        <li>
          <a data-tip="Quick View" data-place="left" href="#">
            <svg><use xlink:href="./images/sprite.svg#icon-eye"></use></svg>
          </a>
        </li>
        <li>
          <a data-tip="Add To Wishlist" data-place="left" href="#">
            <svg><use xlink:href="./images/sprite.svg#icon-heart-o"></use></svg>
          </a>
        </li>
        <li>
          <a data-tip="Add To Compare" data-place="left" href="#">
            <svg><use xlink:href="./images/sprite.svg#icon-loop2"></use></svg>
          </a>
        </li>
      </ul>
    </div>
  `);

  displayProduct = displayProduct.join("");
  categoryCenter.innerHTML = displayProduct;
};

// Load products when page loads
window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  if (products.length > 0) {
    displayProductItems(products);
  }
});

// Category filtering
const categoryCenter = document.querySelector(".category__center");
const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async e => {
    const target = e.target.closest(".section__title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // Remove active from buttons
      Array.from(filterBtn).forEach(btn => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Filter and display products
      if (id === "All Products") {
        displayProductItems(products);
      } else {
        const categoryProducts = products.filter(product => product.category === id);
        displayProductItems(categoryProducts);
      }
    }
  });
}

// Export for Node.js environments (testing)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getProducts, displayProductItems };
}
