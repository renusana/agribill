
// Product container functionality

let itemCount = document.querySelectorAll("tbody tr").length;

/* ADD PRODUCT ROW */

document.getElementById("addItemBtn").addEventListener("click", addItem);

function addItem() {

    itemCount++;

    let table = document.querySelector("tbody");

    let row = document.createElement("tr");

    row.innerHTML = `
    <td class="text-center">${itemCount}</td>

    <td>
        <input type="text" class="form-control product">
    </td>

    <td>
        <input type="number" class="form-control rate" value="0">
    </td>

    <td>
        <input type="number" class="form-control qty" value="0">
    </td>

    <td class="text-center total">₹ 0.00</td>

    <td class="text-center">
        <button class="btn btn-danger btn-sm delete">
        <i class="bi bi-trash"></i>
        </button>
    </td>
    `;

    table.appendChild(row);
}


/* DELETE ROW */

document.addEventListener("click", function (e) {

    if (e.target.closest(".delete")) {

        e.target.closest("tr").remove();
        calculateTotal();

    }

});

/* CALCULATE PRODUCT TOTAL */

document.addEventListener("input", function (e) {

    if (e.target.classList.contains("rate") || e.target.classList.contains("qty")) {

        let row = e.target.closest("tr");

        let rate = row.querySelector(".rate").value || 0;

        let qty = row.querySelector(".qty").value || 0;

        let total = rate * qty;

        row.querySelector(".total").innerText = "₹ " + total.toFixed(2);

        calculateTotal();
    }

});

// Shipping total
function calculateTotal() {

    let totals = document.querySelectorAll(".total");

    let subtotal = 0;

    totals.forEach(t => {
        subtotal += parseFloat(t.innerText.replace("₹", "")) || 0;
    });

    document.getElementById("subtotal").innerText = "₹ " + subtotal.toFixed(2);

    let extra = parseFloat(document.getElementById("extraCharge")?.value) || 0;
    let discount = parseFloat(document.getElementById("discount")?.value) || 0;
    let tax = parseFloat(document.getElementById("tax")?.value) || 0;
    let shipping = parseFloat(document.getElementById("shipping")?.value) || 0;
    let paid = parseFloat(document.getElementById("paidAmount")?.value) || 0;

    let discountAmount = subtotal * (discount / 100);
    let taxAmount = subtotal * (tax / 100);

    let grandTotal = subtotal + extra + taxAmount + shipping - discountAmount;

    document.getElementById("grandTotal").innerText = "₹ " + grandTotal.toFixed(2);

    let balance = grandTotal - paid;

    document.getElementById("balanceAmount").innerText = "₹ " + balance.toFixed(2);
}

// Calculate total
document.querySelectorAll("#extraCharge,#discount,#tax,#shipping,#paidAmount")
    .forEach(input => {

        input.addEventListener("input", calculateTotal);

    });

// Signature and Seal Upload Preview
document.querySelectorAll('input[type="file"]').forEach(input => {

    input.addEventListener("change", function () {

        let file = this.files[0];

        let reader = new FileReader();

        reader.onload = e => {

            let img = document.createElement("img");

            img.src = e.target.result;

            img.style.width = "120px";

            this.parentElement.appendChild(img);

        }

        reader.readAsDataURL(file);

    });

});

document.getElementById("generateInvoice").addEventListener("click", function () {

    let company = document.querySelector('input[placeholder="Company Name"]').value;
    let client = document.querySelector('input[placeholder="Client Name"]').value;

    if (company === "" || client === "") {
        alert("Please fill Company and Client details");
        return;
    }

    let signatureFile = document.getElementById("signatureUpload").files[0];
    let logoFile = document.getElementById("logoUpload").files[0];

    let signatureData = "";
    let logoData = "";

    if (logoFile) {

        let reader = new FileReader();

        reader.onload = function (e) {

            logoData = e.target.result;
            processSignature();

        };

        reader.readAsDataURL(logoFile);

    } else {

        processSignature();

    }

    function processSignature() {

        if (signatureFile) {

            let reader = new FileReader();

            reader.onload = function (e) {

                signatureData = e.target.result;
                saveInvoice(signatureData, logoData);

            };

            reader.readAsDataURL(signatureFile);

        } else {

            saveInvoice("", logoData);

        }

    }

});
// Generating invoice bill function
function saveInvoice(signature, logo) {

    let invoiceData = {
        logo: logo,

        invoiceNo: document.getElementById("invoiceNoInput").value,
        invoiceDate: document.getElementById("invoiceDateInput").value,
        dueDate: document.getElementById("dueDateInput").value,

        companyName: document.querySelector('input[placeholder="Company Name"]').value,
        companyAddress: document.querySelectorAll('input[placeholder="Address (Optional)"]')[0].value,
        companyCity: document.querySelectorAll('input[placeholder="City (Optional)"]')[0].value,
        companyState: document.querySelectorAll('input[placeholder="State (Optional)"]')[0].value,
        companyPostal: document.querySelectorAll('input[placeholder="Postal Code (Optional)"]')[0].value,

        clientName: document.querySelector('input[placeholder="Client Name"]').value,
        clientAddress: document.querySelectorAll('input[placeholder="Address (Optional)"]')[1].value,
        clientCity: document.querySelectorAll('input[placeholder="City (Optional)"]')[1].value,
        clientState: document.querySelectorAll('input[placeholder="State (Optional)"]')[1].value,
        clientPostal: document.querySelectorAll('input[placeholder="Postal Code (Optional)"]')[1].value,

        bankName: document.getElementById("bankName").value,
        accountHolder: document.getElementById("accountHolder").value,
        accountNumber: document.getElementById("accountNumber").value,
        ifscCode: document.getElementById("ifscCode").value,

        terms: document.getElementById("terms").value,
        notes: document.getElementById("notes").value,

        signature: signature,

        // ⭐ ADD THESE LINES
        additionalCharges: document.getElementById("extraCharge")?.value || 0,
        discountPercent: document.getElementById("discount")?.value || 0,
        taxAmount: document.getElementById("tax")?.value || 0,
        shippingAmount: document.getElementById("shipping")?.value || 0,
        totalAmount: document.getElementById("grandTotal")?.innerText.replace("₹","") || 0,
        balanceAmount: document.getElementById("balanceAmount")?.innerText.replace("₹","") || 0,
        paymentStatus: "Pending",

        products: []
    };

    document.querySelectorAll("tbody tr").forEach((row, index) => {

        let product = row.querySelector(".product")?.value || "";
        let rate = row.querySelector(".rate")?.value || 0;
        let qty = row.querySelector(".qty")?.value || 0;

        if (product !== "") {
            invoiceData.products.push({
                sno: index + 1,
                name: product,
                rate: rate,
                qty: qty,
                amount: rate * qty
            });
        }

    });

    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));

    window.location.href = "invoicebill.html";
}


function checkCompanyDetails() {

    let company = document.getElementById("companyName").value.trim();

    if (company === "") {

        alert("⚠ Please fill the Company Details first!");
        return false;

    }

    return true;
}

