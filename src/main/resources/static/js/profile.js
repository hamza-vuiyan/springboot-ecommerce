const loggedInUser = getLoggedInUser();

if (!loggedInUser || !loggedInUser.id) {
    alert("No customer found. Please login.");
    window.location.href = "/index.html";
}

const customerId = loggedInUser ? loggedInUser.id : null;

// Load user info
function loadUserInfo() {
    fetch(`/api/customer/${customerId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch user info");
            return res.json();
        })
        .then(data => {
            const user = data.customer || data;
            const container = document.getElementById("userInfo");
            container.innerHTML = `
                <p class="mb-1"><strong>Name:</strong> ${user.name || "-"}</p>
                <p class="mb-1"><strong>Email:</strong> ${user.email || "-"}</p>
                <p class="mb-0"><strong>Role:</strong> ${user.role || "-"}</p>
            `;
        })
        .catch(err => {
            console.error(err);
            alert("User data not found.");
        });
}

function renderProfileCartItem(item) {
    const product = item.product;
    return `
        <div class="cart-item d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div class="d-flex align-items-center gap-3">
                <img class="item-thumb" src="${product.imageUrl || ""}" alt="${product.name || "Product"}">
                <div>
                    <h3 class="h6 mb-1">${product.name || "Product"}</h3>
                    <div class="small text-secondary">Price: ${formatPrice(product.price)} BDT</div>
                    <div class="small text-secondary">Quantity: ${item.quantity}</div>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="buyProduct(${item.id}, ${product.id})">Buy</button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `;
}

// Load user's cart items
function loadUserCart() {
    fetch(`/api/cart/${customerId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load cart items");
            return res.json();
        })
        .then(cartItems => {
            const container = document.getElementById("userCart");
            let total = 0;

            if (!cartItems.length) {
                container.innerHTML = '<div class="empty-state">Your cart is empty.</div>';
                return;
            }

            container.innerHTML = cartItems.map(item => {
                total += Number(item.product.price) * Number(item.quantity);
                return renderProfileCartItem(item);
            }).join("");

            container.innerHTML += `<div class="total-box mt-3">Total Price: ${formatPrice(total)} BDT</div>`;
        })
        .catch(err => {
            console.error(err);
            alert("Failed to load cart items.");
        });
}

// Remove item from cart
function removeFromCart(cartItemId) {
    const button = event.target;
    setLoading(button, true);
    
    fetch(`/api/cart/remove/${cartItemId}`, { method: "DELETE" })
        .then(res => {
            if (!res.ok) throw new Error("Failed to remove item from cart");
            setLoading(button, false);
            loadUserCart();
        })
        .catch(err => {
            setLoading(button, false);
            alert(err.message);
        });
}

function buyProduct(cartItemId, productId) {
    const button = event.target;
    setLoading(button, true);
    setTimeout(() => {
        window.location.href = `/checkout.html?cartItemId=${cartItemId}&productId=${productId}`;
    }, 300);
}

// Load data on page load
loadUserInfo();
loadUserCart();