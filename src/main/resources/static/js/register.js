function register() {
    const customer = {
        name: document.getElementById("regName").value.trim(),
        email: document.getElementById("regEmail").value.trim(),
        password: document.getElementById("regPassword").value
    };

    if (!customer.name || !customer.email || !customer.password) {
        alert("Please fill all fields.");
        return;
    }

    const button = event.target;
    setLoading(button, true);

    fetch("/api/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok) throw new Error("Registration failed");
            return response.json();
        })
        .then(() => {
            alert("Registration successful. Please login.");
            window.location.href = "/index.html";
        })
        .catch(err => {
            setLoading(button, false);
            alert(err.message);
        });
}
