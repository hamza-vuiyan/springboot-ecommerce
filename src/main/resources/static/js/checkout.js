const urlParams = new URLSearchParams(window.location.search);
const cartItemId = urlParams.get("cartItemId");
const productId = urlParams.get("productId");

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

function confirmPurchase() {
    const address = document.getElementById("address").value;

    if (!address) {
        alert("Please enter delivery address");
        return;
    }

    fetch(`/api/order/buy`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            customerId: loggedInUser.id,
            cartItemId: cartItemId,
            productId: productId,
            address: address
        })
    })
        .then(res => {
            if (!res.ok) throw new Error("Purchase failed");
            return res.json();
        })
        .then(data => {
            alert("Order placed successfully");
            window.location.href = "/profile.html";
        })
        .catch(err => alert(err.message));
}