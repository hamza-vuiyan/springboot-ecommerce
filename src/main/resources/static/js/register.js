function register() {
    const customer = {
        name: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        password: document.getElementById("regPassword").value
    };

    fetch('/api/customer/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(customer)
    })
        .then(response => response.json())
        .then(data => {
            alert("Registration successful! Please login.");
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 1000);
            console.log(data);
        });
}
