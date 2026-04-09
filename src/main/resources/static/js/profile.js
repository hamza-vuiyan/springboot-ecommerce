
// Logout function
function logout() {
    localStorage.clear();
    window.location.href = "/index.html";
}

// Get logged-in user from localStorage
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || !loggedInUser.id) {
    alert("No customer found. Please login.");
    window.location.href = "/index.html";
}

const customerId = loggedInUser.id;

// Load user info
function loadUserInfo() {
    fetch(`/api/customer/${customerId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch user info");
            return res.json();
        })
        .then(data => {
            // Adjust this depending on your API response
            // If your API returns { "customer": { ... } }:
            const user = data.customer || data;

            const container = document.getElementById("userInfo");
            container.innerHTML = `
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Role:</strong> ${user.role}</p>
            `;
        })
        .catch(err => {
            console.error(err);
            alert("User data not found");
        });
}

// Load user's cart items
function loadUserCart() {
    fetch(`/api/cart/${customerId}`)
        .then(res => res.json())
        .then(cartItems => {
            const container = document.getElementById("userCart");
            container.innerHTML = "";
            let total = 0;

            cartItems.forEach(item => {
                const product = item.product;
                const quantity = item.quantity;

                total += product.price * quantity;

                container.innerHTML += `
                    <div style="border:1px solid black; padding:10px; margin:10px;">
                        <img src="${product.imageUrl}" width="100"><br>
                        <h4>${product.name}</h4>
                        <p>Price: ${product.price}</p>
                        <p>Quantity: ${quantity}</p>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                        <button onclick="buyProduct(${item.id}, ${product.id})">Buy</button>
                    </div>
                `;
            });

            container.innerHTML += `<h4>Total Price: ${total} BDT</h4>`;
        })
        .catch(err => {
            console.error(err);
            alert("Failed to load cart items");
        });
}

// Remove item from cart
function removeFromCart(cartItemId) {
    fetch(`/api/cart/remove/${cartItemId}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to remove item from cart");
            return res.text(); // backend returns void
        })
        .then(() => {
            loadUserCart(); // reload cart after removal
        })
        .catch(err => alert(err.message));
}

function buyProduct(cartItemId, productId) {
    window.location.href = `/checkout.html?cartItemId=${cartItemId}&productId=${productId}`;
}

// Load data on page load
loadUserInfo();
loadUserCart();