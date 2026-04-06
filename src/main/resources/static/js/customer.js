function loadProducts() {
    fetch('/api/admin/products') // same API as admin
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("productList");
            container.innerHTML = "";

            products.forEach(product => {
                container.innerHTML += `
                    <div style="border:1px solid black; padding:10px; margin:10px;">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: ${product.stock}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
            });
        });
}

window.onload = function() {
    loadProducts();
};

function addToCart(id) {
    alert("Added product " + id + " to cart (demo)");
    // later we will store cart items in local storage or backend
}