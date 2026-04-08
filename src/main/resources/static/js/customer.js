window.onload = function() {
    loadProducts("productList", true);
};

const role = localStorage.getItem("role");

// Check if user is logged in
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser || (loggedInUser.role !== "CUSTOMER" && loggedInUser.role !== "ADMIN")) {
    alert("Please login first");
    window.location.href = "/login.html";
}

const customerId = loggedInUser.id;


function addToCart(productId) {

    fetch(`/api/cart/add/${customerId}/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 1 }) // default 1 item
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to add to cart");
            return res.json();
        })
        .then(data => {
            alert("Product added to cart!");
        })
        .catch(err => alert(err.message));
}