// Paragraph text hidden functionality

document.querySelectorAll(".toggle-text").forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault()

        let card = this.closest(".card")

        let shortText = card.querySelector(".short-text")
        let fullText = card.querySelector(".full-text")

        shortText.classList.toggle("d-none")
        fullText.classList.toggle("d-none")

        this.textContent =
            this.textContent === "Read More" ? "Read Less" : "Read More"

    })

})