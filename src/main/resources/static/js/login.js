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
            console.log(data);
        });
}


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
            if(!response.ok) throw new Error('Invalid credentials');
            return response.json();
        })
        .then(data => {
            if(data.role === "ADMIN") window.location.href = "/admin.html";
            else window.location.href = "/customer.html";
        })
        .catch(err => alert(err.message));
}