function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    const button = event.target;
    setLoading(button, true);

    const user = { email, password };

    fetch("/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (!response.ok) throw new Error("Invalid credentials");
            return response.json();
        })
        .then(data => {
            localStorage.setItem("loggedInUser", JSON.stringify(data));
            localStorage.setItem("userId", data.id);

            if (data.role === "ADMIN") {
                window.location.href = "/admin.html";
            } else {
                window.location.href = "/customer.html";
            }
        })
        .catch(err => {
            setLoading(button, false);
            alert(err.message);
        });
}

loadProducts("productList", { showButton: false });
