// Patient Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("patientForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const patientData = {
                fullName: document.getElementById("fullName").value,
                surname: document.getElementById("surname").value,
                dob: document.getElementById("dob").value,
                email: document.getElementById("email").value,
                reason: "General Checkup",
                ward: "General Outpatient"
            };

            localStorage.setItem("patientData", JSON.stringify(patientData));
            window.location.href = "AppointmentForm.html";
        });
    }
});


// Generate Confirmation & PDF
function generateConfirmation() {
    const data = JSON.parse(localStorage.getItem("patientData"));
    const month = localStorage.getItem("month");
    const day = localStorage.getItem("day");
    const time = localStorage.getItem("time");

    const div = document.getElementById("confirmation");
    div.innerHTML = `
        <p><strong>Patient Name:</strong> ${data.fullName} ${data.surname}</p>
        <p><strong>ID No:</strong> ${data.idNumber}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Appointment:</strong> ${month} ${day} at ${time}</p>
        <p><strong>Reason for Visit:</strong> ${data.currentConditions}</p>
        <p><strong>Ward:</strong> ${data.ward}</p>
        <p><strong>Requirements:</strong> Please bring your Identity Document (ID) and any other requirements as prescribed.</p>
        <button id="downloadPdf">Download Form</button>
    `;
    const condition = Array.from(document.getElementById("currentConditions").selectedOptions)
    .map(option => option.value)
    .join(", ");
    

    document.getElementById("downloadPdf").addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text("Hospital Appointment Confirmation", 20, 20);

        doc.setFontSize(12);
        doc.text(`Patient Name: ${data.fullName} ${data.surname}`, 20, 40);
        doc.text(`ID No: ${data.idNumber}` , 20, 50);
        doc.text(`Appointment Date & Time: ${month} ${day} at ${time}`, 20, 60);
        doc.text(`Reason for Visit: ${data.reason}`, 20, 70);
        doc.text(`Ward: ${data.ward}`, 20, 80);

        doc.setFont("helvetica", "bold");
        doc.text("Please bring:", 20, 100);
        doc.setFont("helvetica", "normal");
        doc.text("- ID", 30, 110);
        doc.text("- Any other requirements as prescribed.", 30, 120);

        doc.save(`Appointment_${data.surname}_${month}${day}.pdf`);
    });
}


