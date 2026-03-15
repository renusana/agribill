// Hidden paragraph  functionality

function toggleText() {

    let moreText = document.getElementById("extraText");
    let btn = document.getElementById("toggleBtn");

    if (moreText.style.display === "none") {
        moreText.style.display = "block";
        btn.innerText = "Learn Less";
    } else {
        moreText.style.display = "none";
        btn.innerText = "Learn More";
    }

}

// Counter Animation

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;

        const increment = target / 200;

        if (current < target) {

            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCounter, 10);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});
