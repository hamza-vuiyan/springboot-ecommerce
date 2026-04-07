const role = localStorage.getItem("role");

if(role !== "CUSTOMER" && role !== "ADMIN") {
    alert("Please login first");
    window.location.href = "/index.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "/index.html";
}

window.onload = function() {
    loadProducts("productList", true);
};

function addToCart(id) {
    alert("Added product " + id + " to cart (demo)");
    // later we will store cart items in local storage or backend
}