// Support form validation

document.getElementById("supportForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if(name === "" || email === "" || message === ""){
        alert("Please fill all the fields.");
        return;
    }

    alert("Message sent successfully🎉🎉!");

    // Reset form
    document.getElementById("supportForm").reset();
});