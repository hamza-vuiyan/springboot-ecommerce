const loggedInUser = getLoggedInUser();

if (!loggedInUser || !loggedInUser.id) {
    alert("Please login first.");
    window.location.href = "/index.html";
}

const customerId = loggedInUser ? loggedInUser.id : null;

function renderCartItem(item) {
    return `
        <div class="cart-item d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div class="d-flex align-items-center gap-3">
                <img class="item-thumb" src="${item.product.imageUrl || ""}" alt="${item.product.name || "Product"}">
                <div>
                    <h3 class="h6 mb-1">${item.product.name}</h3>
                    <div class="text-secondary small">Price: ${formatPrice(item.product.price)} BDT</div>
                    <div class="text-secondary small">Quantity: ${item.quantity}</div>
                </div>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary" onclick="buyItem(${item.id}, ${item.product.id})">Buy</button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>
    `;
}

function loadCart() {
    fetch(`/api/cart/${customerId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load cart");
            return res.json();
        })
        .then(cartItems => {
            const container = document.getElementById("cartContainer");
            let total = 0;

            if (!cartItems.length) {
                container.innerHTML = '<div class="empty-state">Your cart is empty.</div>';
                document.getElementById("totalPrice").innerText = "0.00";
                return;
            }

            container.innerHTML = cartItems.map(item => {
                total += Number(item.product.price) * Number(item.quantity);
                return renderCartItem(item);
            }).join("");

            document.getElementById("totalPrice").innerText = formatPrice(total);
        })
        .catch(err => {
            document.getElementById("cartContainer").innerHTML = `<div class="empty-state">${err.message}</div>`;
        });
}

function removeItem(cartId) {
    const button = event.target;
    setLoading(button, true);
    
    fetch(`/api/cart/remove/${cartId}`, { method: "DELETE" })
        .then(() => {
            setLoading(button, false);
            loadCart();
        })
        .catch(err => {
            setLoading(button, false);
            alert(err.message);
        });
}

function clearCart() {
    const button = event.target;
    setLoading(button, true);
    
    fetch(`/api/cart/clear/${customerId}`, { method: "DELETE" })
        .then(() => {
            setLoading(button, false);
            loadCart();
        })
        .catch(err => {
            setLoading(button, false);
            alert(err.message);
        });
}

function buyItem(cartItemId, productId) {
    const button = event.target;
    setLoading(button, true);
    setTimeout(() => {
        window.location.href = `/checkout.html?cartItemId=${cartItemId}&productId=${productId}`;
    }, 300);
}

// Load cart on page load
loadCart();