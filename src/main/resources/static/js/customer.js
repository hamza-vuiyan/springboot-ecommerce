const role = localStorage.getItem("role");

if(role !== "CUSTOMER" && role !== "ADMIN") {
    alert("Please login first");
    window.location.href = "/index.html";
}

function goToProfile() {
    // Save current customerId in localStorage (already stored at login)
    const customerId = localStorage.getItem('userId');
    if (!customerId) {
        alert("Please login first!");
        window.location.href = "/index.html";
        return;
    }

    // Redirect to profile page
    window.location.href = `/profile.html?customerId=${customerId}`;
}


window.onload = function() {
    loadProducts("productList", true);
};


function addToCart(productId) {
    // Get customerId from URL
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('customerId');

    if (!customerId) {
        alert("Please login first!");
        window.location.href = "/index.html";
        return;
    }

    // Call backend API (quantity defaults to 1)
    fetch(`/api/cart/add/${customerId}/${productId}`, {
        method: 'POST'
    })
        .then(res => {
            if (!res.ok) throw new Error("Failed to add product to cart");
            return res.json();
        })
        .then(cart => {
            alert(`Product ${productId} added to cart!`);
        })
        .catch(err => {
            console.error(err);
            alert(err.message);
        });
}