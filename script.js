// Navigation between pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Simple login
function login(event) {
    event.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if (user === "participant" && pass === "1234") {
        alert("Login Successful!");
        showPage('dashboard-page');
    } else {
        alert("Invalid credentials!");
    }
}

// Add participant dynamically
function addParticipant() {
    const name = prompt("Enter Participant Name:");
    const category = prompt("Enter Category:");
    const role = prompt("Enter Role:");
    if (name && category && role) {
        const table = document.querySelector("#participant-table tbody");
        const row = document.createElement("tr");
        row.innerHTML = `<td>${name}</td><td>${category}</td><td>${role}</td>`;
        table.appendChild(row);
    } else {
        alert("Please fill all fields!");
    }
}

// Show event summary
function showSummary() {
    const name = document.getElementById("client-name").value;
    const email = document.getElementById("client-email").value;
    const eventType = document.getElementById("event-type").value;
    const venue = document.getElementById("venue-type").value;
    const guests = document.getElementById("guest-count").value;
    const budget = document.getElementById("event-budget").value;

    const services = Array.from(document.querySelectorAll("#service-form input:checked"))
        .map(cb => cb.value)
        .join(", ") || "None";

    const participants = Array.from(document.querySelectorAll("#participant-table tbody tr"))
        .map(row => Array.from(row.children).map(td => td.innerText).join(" - "))
        .join("\n");

    const summaryText =
        `Client: ${name} (${email})
Event: ${eventType} at ${venue}
Guests: ${guests}
Budget: ₹${budget}
Services: ${services}

Participants:
${participants || "No participants added."}`;

    document.getElementById("summary").value = summaryText;
}

// Override showPage to update summary before displaying summary-page
const originalShowPage = showPage;
showPage = function(pageId) {
    if (pageId === 'summary-page') {
        showSummary();
    }
    originalShowPage(pageId);
};

// Finish button
function finish() {
    alert("Thank you for using EventEase!");
    window.location.reload();
}
