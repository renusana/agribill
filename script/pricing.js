// contact sales form validation

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!form.checkValidity()) {

        form.classList.add("was-validated");

        alert("⚠ Please fill all required fields correctly.");

    } else {

        alert("✅ Form submitted successfully! Our sales team will contact you soon.");

        form.reset();
        form.classList.remove("was-validated");

        const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        modal.hide();
    }

});
