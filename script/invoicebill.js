// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    const { jsPDF } = window.jspdf;

    // Get data from localStorage
    let data = JSON.parse(localStorage.getItem("invoiceData"));

    if (data) {

        // Logo
        if (data.logo) document.getElementById("logoImage").src = data.logo;

        // Invoice Details
        document.getElementById("invoiceNo").innerText = data.invoiceNo || "";
        document.getElementById("invoiceDate").innerText = data.invoiceDate || "";
        document.getElementById("dueDate").innerText = data.dueDate || "";

        // Company
        document.getElementById("companyName").innerText = data.companyName || "";
        document.getElementById("companyAddress").innerText = data.companyAddress || "";
        document.getElementById("companyCity").innerText = data.companyCity || "";
        document.getElementById("companyState").innerText = data.companyState || "";
        document.getElementById("companyPostal").innerText = data.companyPostal || "";

        // Client
        document.getElementById("clientName").innerText = data.clientName || "";
        document.getElementById("clientAddress").innerText = data.clientAddress || "";
        document.getElementById("clientCity").innerText = data.clientCity || "";
        document.getElementById("clientState").innerText = data.clientState || "";
        document.getElementById("clientPostal").innerText = data.clientPostal || "";

        // Bank
        document.getElementById("bankName").innerText = data.bankName || "";
        document.getElementById("accountHolder").innerText = data.accountHolder || "";
        document.getElementById("accountNumber").innerText = data.accountNumber || "";
        document.getElementById("ifscCode").innerText = data.ifscCode || "";

        // Terms & Notes
        document.getElementById("terms").innerText = data.terms || "";
        document.getElementById("notes").innerText = data.notes || "";

        // Signature
        if (data.signature) document.getElementById("signatureImage").src = data.signature;

        // Products Table
        let table = document.getElementById("productTable");
        if (data.products && table) {
            table.innerHTML = ""; // clear existing rows
            data.products.forEach(p => {
                table.innerHTML += `
                    <tr>
                        <td>${p.sno}</td>
                        <td>${p.name}</td>
                        <td>₹ ${p.rate}</td>
                        <td>${p.qty}</td>
                        <td>₹ ${p.amount}</td>
                    </tr>
                `;
            });
        }

        // Charges & Total
        document.getElementById("additionalCharges").innerText = "₹ " + (data.additionalCharges || 0);
        document.getElementById("discountPercent").innerText = (data.discountPercent || 0) + "%";
        document.getElementById("taxAmount").innerText = "₹ " + (data.taxAmount || 0);
        document.getElementById("shippingAmount").innerText = "₹ " + (data.shippingAmount || 0);
        document.getElementById("paymentStatus").innerText = data.paymentStatus || "Pending";
        document.getElementById("totalAmount").innerText = "₹ " + (data.totalAmount || 0);
        document.getElementById("balanceAmount").innerText = "₹ " + (data.balanceAmount || 0);
    }

    // -------------------
    // Button Functions
    // -------------------

    document.getElementById("downloadBtn").onclick = function () {

        html2canvas(document.querySelector("#invoiceBill"), {
            scale: 2
        }).then(canvas => {

            let imgData = canvas.toDataURL("image/png");

            let pdf = new jsPDF("p", "mm", "a4");

            let pdfWidth = pdf.internal.pageSize.getWidth();
            let pdfHeight = pdf.internal.pageSize.getHeight();

            let imgWidth = pdfWidth;
            let imgHeight = canvas.height * imgWidth / canvas.width;

            // If content height exceeds PDF page height → scale it
            if (imgHeight > pdfHeight) {
                imgHeight = pdfHeight - 10;
            }

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            pdf.save("invoice.pdf");
        });

    };

    // Print Invoice
    document.getElementById("printBtn").onclick = function () {
        window.print();
    };

    // Email Invoice
    document.getElementById("emailBtn").onclick = function () {
        let email = prompt("Enter email address");
        if (email) {
            window.location.href = `mailto:${email}?subject=Invoice&body=Please find attached invoice`;
        }
    };

});
