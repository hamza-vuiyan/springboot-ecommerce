function loadProducts(containerId, showButton = true) {
    fetch('/api/admin/products')
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById(containerId);
            container.innerHTML = "";

            products.forEach(product => {
                container.innerHTML += `
                    <div style="border:1px solid black; padding:10px; margin:10px;">
                        <img src="${product.imageUrl}" width="150"><br><br>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Stock: ${product.stock}</p>
                        ${showButton ? `<button onclick="addToCart(${product.id})">Add to Cart</button>` : ""}
                    </div>
                `;
            });
        });
}