// Login form validation

document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please enter username and password");
        return;
    }

    alert("Login Successful 🎉🎉");

});