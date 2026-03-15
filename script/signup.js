// Signup form validation

document.getElementById("signupForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();

    if (name === "" || phone === "" || email === "") {
        alert("Please fill all fields");
        return;
    }

    let phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Enter valid 10 digit phone number");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        alert("Enter valid email address");
        return;
    }

    alert("Registration successful 🎉🎉!");

    document.getElementById("signupForm").reset();

});