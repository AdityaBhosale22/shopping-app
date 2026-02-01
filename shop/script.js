// State Management
let allProducts = [];
let currentFilters = {
    search: '',
    category: 'all',
    colors: [],
    priceRanges: []
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Check Login (Keep your original logic)
    if (!localStorage.getItem("currentUser")) {
        // alert("Please login to access your profile");
        // window.location.href = "../login.html";
        // Note: Commented out for your local testing
    }

    await loadProducts();
    setupEventListeners();
    updateCartCount();
});

async function loadProducts() {
    const cached = localStorage.getItem("products");
    if (cached) {
        allProducts = JSON.parse(cached);
    } else {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        
        // Add random variants as you did before
        const colors = ['red', 'blue', 'green', 'black', 'white'];
        const sizes = ['S', 'M', 'L', 'XL'];
        
        allProducts = data.map(p => ({
            ...p,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: sizes[Math.floor(Math.random() * sizes.length)]
        }));
        
        localStorage.setItem("products", JSON.stringify(allProducts));
    }
    renderProducts(allProducts);
}

function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.length ? '' : '<p class="text-gray-400">No products found.</p>';

    products.forEach(product => {
        const card = `
            <div class="bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                <div class="h-48 mb-4 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                    <img src="${product.image}" alt="${product.title}" class="h-32 object-contain group-hover:scale-110 transition-transform">
                </div>
                <div class="space-y-2">
                    <div class="flex justify-between items-start">
                        <h4 class="font-semibold text-sm truncate w-2/3">${product.title}</h4>
                        <span class="font-bold">$${product.price}</span>
                    </div>
                    <div class="flex justify-between text-[10px] text-gray-500 uppercase tracking-widest">
                        <span>Size: ${product.size}</span>
                        <span>Color: ${product.color}</span>
                    </div>
                    <div class="text-xs text-yellow-500">★ ${product.rating.rate}</div>
                    <button onclick="addToCart(${product.id})" class="w-full bg-black text-white py-2 rounded-lg text-sm mt-4 hover:bg-gray-800 active:scale-95 transition-all">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', card);
    });
}

// Filter Logic
function setupEventListeners() {
    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase();
        applyFilters();
    });

    // Color Checkboxes
    document.querySelectorAll('.filter-check').forEach(box => {
        box.addEventListener('change', () => {
            currentFilters.colors = Array.from(document.querySelectorAll('.filter-check:checked')).map(cb => cb.value);
            applyFilters();
        });
    });
}

function filterByCategory(cat) {
    currentFilters.category = cat;
    
    // UI Update for buttons
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('filter-active', 'bg-black', 'text-white');
        btn.classList.add('border-gray-200');
    });
    event.target.classList.add('filter-active', 'bg-black', 'text-white');
    
    applyFilters();
}

function applyFilters() {
    let filtered = allProducts;

    // Filter by Category
    if (currentFilters.category !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilters.category);
    }

    // Filter by Search
    if (currentFilters.search) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(currentFilters.search));
    }

    // Filter by Colors
    if (currentFilters.colors.length > 0) {
        filtered = filtered.filter(p => currentFilters.colors.includes(p.color));
    }

    renderProducts(filtered);
}

// Cart Logic
function addToCart(id) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const product = allProducts.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cart-count').innerText = cart.length;
}