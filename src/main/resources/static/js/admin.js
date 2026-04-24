// Check if user is logged in
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || loggedInUser.role !== "ADMIN") {
    alert("Admin access only.");
    window.location.href = "/index.html";
}

let editProductId = null;

function logout() {
    localStorage.clear();
    window.location.href = "/index.html";
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("imageUrl").value = "";
    editProductId = null;
    document.getElementById("saveProductBtn").innerText = "Save Product";
}

function loadProducts() {
    fetch("/api/admin/products")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load products");
            return response.json();
        })
        .then(products => {
            const table = document.getElementById("productTableBody");
            table.innerHTML = "";

            if (!products.length) {
                table.innerHTML = '<tr><td colspan="6" class="text-center text-secondary">No products found</td></tr>';
                return;
            }

            products.forEach(product => {
                table.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td><img src="${product.imageUrl || ""}" alt="${product.name || "Product"}" width="60" height="60" style="object-fit:cover;border:1px solid #dee2e6;border-radius:4px;"></td>
                    <td>${product.name || "-"}</td>
                    <td>${Number(product.price || 0).toFixed(2)}</td>
                    <td>${product.stock ?? 0}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-secondary me-1" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                </tr>
                `;
            });
        })
        .catch(err => alert(err.message));
}

function addProduct() {
    const product = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("description").value.trim(),
        price: Number(document.getElementById("price").value),
        stock: Number(document.getElementById("stock").value),
        imageUrl: document.getElementById("imageUrl").value.trim()
    };

    if (!product.name || Number.isNaN(product.price) || Number.isNaN(product.stock)) {
        alert("Please fill valid product name, price, and stock.");
        return;
    }

    const button = document.getElementById("saveProductBtn");
    setLoading(button, true);

    let url = "/api/admin/products/add";
    let method = "POST";

    if (editProductId !== null) {
        url = `/api/admin/products/${editProductId}`;
        method = "PUT";
    }

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to save product");
            return response.json();
        })
        .then(() => {
            alert(editProductId ? "Product updated." : "Product added.");
            setLoading(button, false);
            resetForm();
            loadProducts();
        })
        .catch(err => {
            setLoading(button, false);
            alert(err.message);
        });
}

function editProduct(id) {
    fetch(`/api/admin/products/${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch product");
            return response.json();
        })
        .then(product => {
            document.getElementById("name").value = product.name || "";
            document.getElementById("description").value = product.description || "";
            document.getElementById("price").value = product.price ?? "";
            document.getElementById("stock").value = product.stock ?? "";
            document.getElementById("imageUrl").value = product.imageUrl || "";
            editProductId = product.id;
            document.getElementById("saveProductBtn").innerText = "Update Product";
        })
        .catch(err => alert(err.message));
}

function deleteProduct(id) {
    const confirmed = confirm("Delete this product?");
    if (!confirmed) return;

    const button = event.target;
    setLoading(button, true);

    fetch(`/api/admin/products/${id}`, { method: "DELETE" })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete product");
            alert("Product deleted.");
            setLoading(button, false);
            loadProducts();
        })
        .catch(err => {
            setLoading(button, false);
            alert(err.message);
        });
}

function loadDeliveries() {
    fetch("/api/admin/deliveries")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load deliveries");
            return response.json();
        })
        .then(deliveries => {
            const table = document.getElementById("deliveryTableBody");
            table.innerHTML = "";

            if (!deliveries.length) {
                table.innerHTML = '<tr><td colspan="8" class="text-center text-secondary">No deliveries found</td></tr>';
                return;
            }

            deliveries.forEach(delivery => {
                const orderDate = new Date(delivery.orderDate).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                table.innerHTML += `
                <tr>
                    <td>${delivery.id}</td>
                    <td>${delivery.fullName || "-"}</td>
                    <td>${delivery.email || "-"}</td>
                    <td>${delivery.phone || "-"}</td>
                    <td>${delivery.address || "-"}</td>
                    <td>${Number(delivery.amount || 0).toFixed(2)}</td>
                    <td>${orderDate}</td>
                    <td>${delivery.notes ? delivery.notes.substring(0, 30) + (delivery.notes.length > 30 ? '...' : '') : "-"}</td>
                </tr>
                `;
            });
        })
        .catch(err => {
            console.error(err);
            const table = document.getElementById("deliveryTableBody");
            table.innerHTML = '<tr><td colspan="8" class="text-center text-danger">' + err.message + '</td></tr>';
        });
}

window.onload = function() {
    loadProducts();
    loadDeliveries();
};
