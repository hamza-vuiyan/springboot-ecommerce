function login() {
    const user = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    };

    fetch('/api/customer/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(user)
    })
        .then(response => {
            if (!response.ok) throw new Error('Invalid credentials');
            return response.json();
        })
        .then(data => {
            // Save entire user in localStorage
            localStorage.setItem("loggedInUser", JSON.stringify(data));

            // Redirect based on role
            if (data.role === "ADMIN") {
                window.location.href = "/admin.html";
            } else {
                window.location.href = "/customer.html";
            }
        })
        .catch(err => alert(err.message));
}

loadProducts("productList", true);