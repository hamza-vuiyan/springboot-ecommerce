function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser"));
}

function formatPrice(value) {
    const amount = Number(value || 0);
    return amount.toFixed(2);
}

function setLoading(element, loading = true) {
    if (loading) {
        element.classList.add('loading');
        element.disabled = true;
        element.dataset.originalText = element.innerText;
        element.innerText = '';
    } else {
        element.classList.remove('loading');
        element.disabled = false;
        element.innerText = element.dataset.originalText || 'Unknown';
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "/index.html";
}

function updateCommonLinks() {
    const user = getLoggedInUser();

    const profileLink = document.getElementById("profileLink");
    if (profileLink) {
        profileLink.href = "/profile.html";
    }

    const cartLink = document.getElementById("cartLink");
    if (cartLink) {
        cartLink.href = "/cart.html";
    }

    if (user && user.id) {
        localStorage.setItem("userId", user.id);
    }
}

function renderProductCard(product, showButton) {
    const stockStatus = product.stock === 0 ? 'out' : product.stock <= 10 ? 'low' : '';
    const stockLabel = product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`;

    return `
        <article class="product-card" data-name="${(product.name || "").toLowerCase()}">
            <img class="product-image" src="${product.imageUrl || ""}" alt="${product.name || "Product"}">
            <div class="product-body">
                <h3 class="product-name">${product.name || "Unnamed Product"}</h3>
                <p class="product-description">${product.description || "No description available."}</p>
                <div class="meta-row">
                    <span class="price-tag">${formatPrice(product.price)} BDT</span>
                    <span class="stock-tag ${stockStatus}">${stockLabel}</span>
                </div>
                ${showButton ? `<button class="btn btn-dark btn-sm mt-3 w-100" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>Add to Cart</button>` : ""}
            </div>
        </article>
    `;
}

function loadProducts(containerId, options = {}) {
    const showButton = options.showButton !== false;

    fetch("/api/admin/products")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            return response.json();
        })
        .then(products => {
            const container = document.getElementById(containerId);
            if (!container) return;

            if (!products.length) {
                container.innerHTML = '<div class="empty-state">No products found.</div>';
                return;
            }

            container.innerHTML = products.map(product => renderProductCard(product, showButton)).join("");
        })
        .then(() => {
            document.querySelectorAll("#productList .product-card").forEach(card => {
                const title = card.querySelector("h5"); // adjust if different
                if (title) {
                    card.dataset.name = title.textContent.toLowerCase();
                }
            });
        })
        .catch(error => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `<div class="empty-state">${error.message}</div>`;
            }
        });
}


updateCommonLinks();
