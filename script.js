const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Utility: Save cart to sessionStorage
function saveCartToSession(cart) {
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Utility: Get cart from sessionStorage
function getCartFromSession() {
  const cart = sessionStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
}

// Render the product list with Add to Cart buttons
function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;

    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.onclick = () => addToCart(product);

    li.appendChild(addButton);
    productList.appendChild(li);
  });
}

// Render the cart items
function renderCart() {
  const cart = getCartFromSession();
  cartList.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart and update sessionStorage
function addToCart(product) {
  const cart = getCartFromSession();
  cart.push(product);
  saveCartToSession(cart);
  renderCart();
}

// Clear the cart and update sessionStorage
clearCartBtn.addEventListener("click", () => {
  sessionStorage.removeItem("shoppingCart");
  renderCart();
});

// Initialize on page load
window.onload = () => {
  renderProducts();
  renderCart(); // Load cart from sessionStorage on reload
};
