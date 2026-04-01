const API_URL = "https://dummyjson.com/products";
const FEATURED_LIMIT = 4;

const elements = {
  apiStatus: document.getElementById("apiStatus"),
  loadingState: document.getElementById("loadingState"),
  errorState: document.getElementById("errorState"),
  featuredProducts: document.getElementById("featuredProducts"),
  productGrid: document.getElementById("productGrid"),
  categoryList: document.getElementById("categoryList"),
  productSummary: document.getElementById("productSummary"),
  productCount: document.getElementById("productCount"),
  featuredCount: document.getElementById("featuredCount"),
  topCategory: document.getElementById("topCategory"),
};

const appState = {
  products: [],
  featuredProducts: [],
  categories: [],
};

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function getProductImage(product) {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0];
  }

  return "https://via.placeholder.com/320x320?text=Product";
}

function getFeaturedProducts(products) {
  return [...products]
    .sort((firstProduct, secondProduct) => secondProduct.rating - firstProduct.rating)
    .slice(0, FEATURED_LIMIT);
}

function getCategories(products) {
  const categorySet = new Set(products.map((product) => product.category));
  return ["All Products", ...categorySet];
}

function getTopCategory(products) {
  const categoryCount = {};

  products.forEach((product) => {
    categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
  });

  const topEntry =
    Object.entries(categoryCount).sort((firstEntry, secondEntry) => secondEntry[1] - firstEntry[1])[0] || [];

  return topEntry[0] || "N/A";
}

function updateDashboardStats() {
  elements.productCount.textContent = String(appState.products.length);
  elements.featuredCount.textContent = String(appState.featuredProducts.length);
  elements.topCategory.textContent = getTopCategory(appState.products);
  elements.productSummary.textContent = `${appState.products.length} live products available across ${appState.categories.length - 1} categories.`;
}

function showLoadingState(isLoading) {
  elements.loadingState.classList.toggle("hidden", !isLoading);
  elements.productGrid.classList.toggle("hidden", isLoading);
  elements.featuredProducts.classList.toggle("hidden", isLoading);
}

function showErrorState(showError, message) {
  elements.errorState.classList.toggle("hidden", !showError);

  if (message) {
    elements.errorState.querySelector("p").textContent = message;
  }
}

function createFeaturedCard(product) {
  const card = document.createElement("article");
  card.className = "featured-card";

  card.innerHTML = `
    <span class="featured-badge">Featured</span>
    <div class="featured-card__image-wrap">
      <img
        class="featured-card__image"
        src="${getProductImage(product)}"
        alt="${product.title}"
        loading="lazy"
      />
    </div>
    <span class="product-tag">${product.category}</span>
    <h3 class="featured-card__title">${product.title}</h3>
    <div class="featured-card__footer">
      <div>
        <p class="price">${formatPrice(product.price)}</p>
        <span class="price-note">Discount ${product.discountPercentage.toFixed(0)}% off</span>
      </div>
      <span class="rating">★ ${product.rating.toFixed(1)}</span>
    </div>
  `;

  return card;
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-card__image-wrap">
      <img
        class="product-card__image"
        src="${getProductImage(product)}"
        alt="${product.title}"
        loading="lazy"
      />
    </div>
    <div class="product-meta">
      <span class="product-tag">${product.category}</span>
      <span class="rating">★ ${product.rating.toFixed(1)}</span>
    </div>
    <h3 class="product-card__title">${product.title}</h3>
    <p class="product-card__description">
      ${product.description.slice(0, 92)}${product.description.length > 92 ? "..." : ""}
    </p>
    <div class="product-card__footer">
      <div>
        <p class="price">${formatPrice(product.price)}</p>
        <span class="discount">${product.discountPercentage.toFixed(0)}% off</span>
      </div>
      <span class="product-tag">In Stock</span>
    </div>
  `;

  return card;
}

function renderFeaturedProducts(products) {
  elements.featuredProducts.innerHTML = "";

  products.forEach((product) => {
    elements.featuredProducts.appendChild(createFeaturedCard(product));
  });
}

function renderProductGrid(products) {
  elements.productGrid.innerHTML = "";

  products.forEach((product) => {
    elements.productGrid.appendChild(createProductCard(product));
  });
}

function renderCategories(categories) {
  elements.categoryList.innerHTML = "";

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === 0 ? "category-chip category-chip--active" : "category-chip";
    button.textContent = category;
    elements.categoryList.appendChild(button);
  });
}

async function fetchProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.products || !Array.isArray(data.products)) {
    throw new Error("Unexpected API response.");
  }

  return data.products;
}

async function initializeDashboard() {
  showLoadingState(true);
  showErrorState(false);
  elements.apiStatus.textContent = "Connecting...";

  try {
    const products = await fetchProducts();

    appState.products = products;
    appState.featuredProducts = getFeaturedProducts(products);
    appState.categories = getCategories(products);

    renderFeaturedProducts(appState.featuredProducts);
    renderProductGrid(appState.products);
    renderCategories(appState.categories);
    updateDashboardStats();

    elements.apiStatus.textContent = "Live Feed Ready";
    showLoadingState(false);
  } catch (error) {
    console.error("Error loading products:", error);
    elements.apiStatus.textContent = "Connection Failed";
    showLoadingState(false);
    showErrorState(true, "Unable to load products right now. Please check the public API and try again.");
    elements.productSummary.textContent = "Product data is currently unavailable.";
  }
}

initializeDashboard();
