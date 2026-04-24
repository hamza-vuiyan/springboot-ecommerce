const urlParams = new URLSearchParams(window.location.search);
const cartItemId = urlParams.get("cartItemId");
const productId = urlParams.get("productId");

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser || !loggedInUser.id) {
    alert("Please login first.");
    window.location.href = "/index.html";
}

function loadProductInfo() {
    if (!productId) {
        document.getElementById("productInfo").innerHTML = '<div class="empty-state">No product selected.</div>';
        return;
    }

    fetch(`/api/admin/products/${productId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load product");
            return res.json();
        })
        .then(product => {
            const container = document.getElementById("productInfo");

            container.innerHTML = `
                <div class="app-card info-card">
                    <div class="d-flex gap-3 flex-wrap align-items-center">
                        <img class="item-thumb" src="${product.imageUrl || ""}" alt="${product.name || "Product"}">
                        <div>
                            <h3 class="h5 mb-1">${product.name}</h3>
                            <p class="mb-1 text-secondary">${product.description || "No description."}</p>
                            <div class="small text-secondary">Price: ${Number(product.price || 0).toFixed(2)} BDT</div>
                            <div class="small text-secondary">Stock: ${product.stock ?? 0}</div>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(err => {
            document.getElementById("productInfo").innerHTML = `<div class="empty-state">${err.message}</div>`;
        });
}

function confirmPurchase() {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (!fullName || !email || !phone || !address) {
        alert("Please fill in all required delivery information.");
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Simple phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    const confirmButton = document.getElementById("confirmOrderBtn");
    setLoading(confirmButton, true);

    fetch("/api/order/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            customerId: loggedInUser.id,
            cartItemId: cartItemId,
            productId: productId,
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            notes: notes
        })
    })
        .then(res => {
            if (!res.ok) throw new Error("Purchase failed");
            return res.json();
        })
        .then(() => {
            alert("Order placed successfully.");
            window.location.href = "/profile.html";
        })
        .catch(err => {
            setLoading(confirmButton, false);
            alert(err.message);
        });
}

loadProductInfo();