// Product data
const products = [
    {
        id: 1,
        name: "Air Jordan 4 Retro Bred Reimagined",
        price: 15999.99, // Original price
        image: "1.jpg"
    },
    {
        id: 2,
        name: "Travis Scott x Air Jordan 1 Low OG",
        price: 45999.99,
        image: "2.jpg"
    },
    {
        id: 3,
        name: "Air Jordan 5 Reimagined",
        price: 2999.99,
        image: "3.jpg"
    },
    {
        id: 4,
        name: "Nike Air Foamposite One",
        price: 8999.99,
        image: "4 (1).jpg"
    },
    {
        id: 5,
        name: "Off-White x Nike Air Force 1",
        price: 8999.99,
        image: "5.jpg"
    },
    {
        id: 6,
        name: "Off-White x Air Jordan 1",
        price: 8999.99,
        image: "5 (2).jpg"
    },
    {
        id: 7,
        name: "adidas Anthony Edwards 1 Low",
        price: 8999.99,
        image: "6.jpg"
    },
    {
        id: 8,
        name: "ANTA KAI 1 Speed",
        price: 8999.99,
        image: "7.jpg"
    },
    {
        id: 9,
        name: "Unisex Curry 12 'Extraterrestrial' Basketball Shoes",
        price: 8999.99,
        image: "8.jpg"
    },
    {
        id: 10,
        name: "Nike Sabrina 2",
        price: 8999.99,
        image: "9.jpg"
    },
    {
        id: 11,
        name: "Nike Air Max 1 'Valentine's Day'",
        price: 8999.99,
        image: "10.jpg"
    },
    {
        id: 12,
        name: "Nike Zoom Kobe 6 Protro",
        price: 8999.99,
        image: "11.jpg"
    },
    {
        id: 13,
        name: "Prada x adidas Superstar",
        price: 8999.99,
        image: "12.jpg"
    },
    {
        id: 14,
        name: "Teenage Mutant Ninja Turtles x Puma MB.04",
        price: 8999.99,
        image: "13.jpg"
    },
    {
        id: 15,
        name: "Jordan Tatum 3",
        price: 8999.99,
        image: "14.jpg"
    },
    {
        id: 16,
        name: "SCOTTIE 3 - LEGACY",
        price: 8999.99,
        image: "15.jpg"
    }
];

// Function to generate random price below 10,000
function getRandomPrice() {
    return Math.floor(Math.random() * 9999) + 1; // Generates a price between 1 and 9999
}

// Shopping cart array
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// Function to format price with commas
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Function to format price
function formatPrice(price) {
    return '₱' + formatNumberWithCommas(price.toFixed(2));
}

// Function to render products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => {
        const price = getRandomPrice(); // Generate random price for display
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${formatPrice(price)}</p> <!-- Display random price -->
                    <button class="add-to-cart" onclick="addToCart(${product.id}, ${price})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Function to add item to cart
function addToCart(productId, price) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
    } else {
        cart.push({
            ...product,
            price: price, // Use the random price here
            quantity: 1 // Add new item to cart
        });
    }

    updateCart();
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); // Remove item from cart
    updateCart();
}

// Function to change item quantity
function changeQuantity(productId, amount) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            removeFromCart(productId); // Remove item if quantity is zero or less
        } else {
            updateCart(); // Update cart display
        }
    }
}

// Function to update cart display
function updateCart() {
    // Update cart items display
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">
                    ${formatPrice(item.price)} x <span class="item-quantity">${item.quantity}</span>
                </p>
            </div>
            <div class="quantity-controls">
                <button class="remove-item" onclick="changeQuantity(${item.id}, -1)">-</button>
                <button class="remove-item" onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </div>
        </div>
    `).join('');

    // Update total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: ${formatPrice(total)}`;

    // Update cart count
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
}

// Initial render of products
renderProducts();