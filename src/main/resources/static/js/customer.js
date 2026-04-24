window.onload = function() {
    loadProducts("productList", { showButton: true });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }
};

// Check if user is logged in
const loggedInUser = getLoggedInUser();

if (!loggedInUser || (loggedInUser.role !== "CUSTOMER" && loggedInUser.role !== "ADMIN")) {
    alert("Please login first.");
    window.location.href = "/index.html";
}

const customerId = loggedInUser ? loggedInUser.id : null;

function filterProducts() {
    const keyword = document.getElementById("searchInput").value.trim().toLowerCase();

    document.querySelectorAll("#productList .product-card").forEach(card => {
        const name = card.dataset.name || "";
        card.style.display = name.includes(keyword) ? "" : "none";
    });
}

function addToCart(productId) {
    fetch(`/api/cart/add/${customerId}/${productId}?quantity=1`, {
        method: "POST"
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to add to cart");
            return res.json();
        })
        .then(() => {
            alert("Product added to cart.");
        })
        .catch(err => alert(err.message));
}
