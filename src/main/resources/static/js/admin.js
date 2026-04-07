let editProductId = null; // global variable

function loadProducts() {
    fetch('/api/admin/products')
        .then(response => response.json())
        .then(products => {
            let table = document.getElementById("productTableBody");
            table.innerHTML = "";

            products.forEach(product => {
                table.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td><img src="${product.imageUrl}" width="80"></td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
                `;
            });
        });
}

function addProduct() {
    const product = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        imageUrl: document.getElementById("imageUrl").value
    };

    // Decide if adding or updating
    let url = '/api/admin/products/add';
    let method = 'POST';

    if(editProductId !== null) {
        url = `/api/admin/products/${editProductId}`;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => {
            alert(editProductId ? "Product Updated" : "Product Added");

            editProductId = null; // reset edit mode

            // Clear form
            document.getElementById("name").value = '';
            document.getElementById("description").value = '';
            document.getElementById("price").value = '';
            document.getElementById("stock").value = '';
            document.getElementById("imageUrl").value = '';

            loadProducts(); // refresh table
        });
}


function editProduct(id) {
    fetch(`/api/admin/products/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById("name").value = product.name;
            document.getElementById("description").value = product.description;
            document.getElementById("price").value = product.price;
            document.getElementById("stock").value = product.stock;
            document.getElementById("imageUrl").value = product.imageUrl;
            editProductId = product.id;
        });
}

function deleteProduct(id) {
    fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            alert("Product Deleted!");
            loadProducts();
        });
}

window.onload = function() {
    loadProducts(); // load products without "Add to Cart" button
};

