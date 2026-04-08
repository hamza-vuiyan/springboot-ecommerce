// Assuming customerId is stored in localStorage after login
const customerId = localStorage.getItem('userId');

function loadCart() {
    fetch(`/api/cart/${customerId}`)
        .then(res => res.json())
        .then(cartItems => {
            const container = document.getElementById("cartContainer");
            container.innerHTML = "";
            let total = 0;

            cartItems.forEach(item => {
                total += item.product.price * item.quantity;

                container.innerHTML += `
                    <div style="border:1px solid black; padding:10px; margin:10px;">
                        <img src="${item.product.imageUrl}" width="100"><br>
                        <h4>${item.product.name}</h4>
                        <p>Price: ${item.product.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <button onclick="removeItem(${item.id})">Remove</button>
                    </div>
                `;
            });

            document.getElementById("totalPrice").innerText = total;
        });
}

function removeItem(cartId) {
    fetch(`/api/cart/remove/${cartId}`, { method: 'DELETE' })
        .then(() => loadCart());
}

function clearCart() {
    fetch(`/api/cart/clear/${customerId}`, { method: 'DELETE' })
        .then(() => loadCart());
}

// Load cart on page load
loadCart();