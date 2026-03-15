// Contact form validation

document.getElementById("contactForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let firstName = document.getElementById("firstName").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let query = document.getElementById("query").value.trim();

    if (firstName === "" || email === "" || phone === "" || query === "") {
        alert("Please fill all required fields.");
        return;
    }

    alert("Message sent successfully 🎉🎉!");

    document.getElementById("contactForm").reset();

});
