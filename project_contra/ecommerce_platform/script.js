// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        price: 99.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        title: "Men's T-Shirt",
        price: 29.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 4,
        title: "Women's Dress",
        price: 49.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500"
    },
    {
        id: 5,
        title: "Coffee Maker",
        price: 79.99,
        category: "home",
        image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
        id: 6,
        title: "Desk Lamp",
        price: 39.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500"
    }
];

// Cart state
let cart = [];
let currentCategory = 'all';

// DOM Elements
const productsGrid = document.querySelector('.products-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const subtotalElement = document.querySelector('.subtotal');
const filterButtons = document.querySelectorAll('.filter-btn');
const toast = document.querySelector('.toast');

// Initialize the app
function init() {
    renderProducts();
    setupEventListeners();
}

// Render products based on current category
function renderProducts() {
    productsGrid.innerHTML = '';
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    return card;
}

// Create cart item element
function createCartItem(product, quantity) {
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="cart-item-details">
            <h4>${product.title}</h4>
            <p>$${product.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="quantity-btn decrease" data-id="${product.id}">-</button>
                <span class="quantity">${quantity}</span>
                <button class="quantity-btn increase" data-id="${product.id}">+</button>
            </div>
        </div>
        <button class="remove-item" data-id="${product.id}">&times;</button>
    `;
    return item;
}

// Update cart UI
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const cartItem = createCartItem(product, item.quantity);
            cartItemsContainer.appendChild(cartItem);
            total += product.price * item.quantity;
            itemCount += item.quantity;
        }
    });

    cartCount.textContent = itemCount;
    subtotalElement.textContent = `$${total.toFixed(2)}`;
}

// Show toast notification
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add product to cart
function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    updateCart();
    showToast();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update product quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Cart icon click
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });

    // Close cart button
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            renderProducts();
        });
    });

    // Add to cart buttons
    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    // Cart item controls
    cartItemsContainer.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        
        if (e.target.classList.contains('decrease')) {
            updateQuantity(productId, -1);
        } else if (e.target.classList.contains('increase')) {
            updateQuantity(productId, 1);
        } else if (e.target.classList.contains('remove-item')) {
            removeFromCart(productId);
        }
    });
}

// Initialize the app
init();
