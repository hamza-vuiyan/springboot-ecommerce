window.onload = function() {
    loadProducts("productList", true);
};

function addToCart(id) {
    alert("Added product " + id + " to cart (demo)");
    // later we will store cart items in local storage or backend
}