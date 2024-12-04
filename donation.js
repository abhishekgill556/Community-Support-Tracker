document.addEventListener("DOMContentLoaded", initializeDonationTracker);
 
function initializeDonationTracker() {
    const form = document.getElementById("donationForm");
    const donationTableBody = document.querySelector("#donationTable tbody");
    const totalDonationsDisplay = document.getElementById("totalDonations");
 
    // Load donations from localStorage on page load
    loadDonations(donationTableBody, totalDonationsDisplay);
 
    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        handleFormSubmit(donationTableBody, totalDonationsDisplay);
    });
}
 
function handleFormSubmit(donationTableBody, totalDonationsDisplay) {
    const donationData = collectFormData();
    const validationMessage = validateFormData(donationData);
 
    if (validationMessage) {
        showFeedback(validationMessage, "error");
        return;
    }
 
    // Add donation to the table and update total
    addDonationToTable(donationTableBody, donationData, totalDonationsDisplay);
    saveDonationToLocalStorage(donationData);
 
    // Show success message and reset form
    showFeedback("Donation successfully added!", "success");
    resetForm();
}
 
function collectFormData() {
    return {
        charityName: document.getElementById("charityName").value.trim(),
        donationAmount: parseFloat(document.getElementById("donationAmount").value),
        donationDate: document.getElementById("donationDate").value,
        donorMessage: document.getElementById("donorMessage").value.trim(),
    };
}
 
function validateFormData(data) {
    if (!data.charityName || !data.donationAmount || !data.donationDate) {
        return "Please fill out all required fields.";
    }
    if (data.donationAmount <= 0 || isNaN(data.donationAmount)) {
        return "Donation amount must be a valid positive number.";
    }
    return null;
}
 
function addDonationToTable(donationTableBody, donation, totalDonationsDisplay) {
    const row = document.createElement("tr");
 
    row.innerHTML = `
        <td>${donation.charityName}</td>
        <td>$${donation.donationAmount.toFixed(2)}</td>
        <td>${donation.donationDate}</td>
        <td>${donation.donorMessage || "N/A"}</td>
        <td><button class="delete-button">Delete</button></td>
    `;
 
    // Add delete functionality to the button
    row.querySelector(".delete-button").addEventListener("click", () => {
        row.remove();
        removeDonationFromLocalStorage(donation);
        updateTotalDonations(totalDonationsDisplay, -donation.donationAmount);
    });
 
    donationTableBody.appendChild(row);
    updateTotalDonations(totalDonationsDisplay, donation.donationAmount);
}
 
function updateTotalDonations(display, amount) {
    const currentTotal = parseFloat(display.textContent) || 0;
    const newTotal = currentTotal + amount;
    display.textContent = newTotal.toFixed(2);
}
 
function saveDonationToLocalStorage(donation) {
    const donations = getDonationsFromLocalStorage();
    donations.push(donation);
    localStorage.setItem("donations", JSON.stringify(donations));
}
 
function loadDonations(donationTableBody, totalDonationsDisplay) {
    const donations = getDonationsFromLocalStorage();
    donations.forEach((donation) => {
        addDonationToTable(donationTableBody, donation, totalDonationsDisplay);
    });
}
 
function removeDonationFromLocalStorage(donationToRemove) {
    const donations = getDonationsFromLocalStorage();
    const updatedDonations = donations.filter((donation) => {
        return (
            donation.charityName !== donationToRemove.charityName ||
            donation.donationAmount !== donationToRemove.donationAmount ||
            donation.donationDate !== donationToRemove.donationDate
        );
    });
    localStorage.setItem("donations", JSON.stringify(updatedDonations));
}
 
function getDonationsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("donations")) || [];
}
 
function showFeedback(message, type) {
    const feedbackElement = document.getElementById("formFeedback");
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;
 
    setTimeout(() => {
        feedbackElement.textContent = "";
        feedbackElement.className = "";
    }, 4000);
}
 
function resetForm() {
    document.getElementById("donationForm").reset();
}
 
// Export functions for Jest testing
module.exports = {
    collectFormData,
    validateFormData,
    addDonationToTable,
    updateTotalDonations,
    saveDonationToLocalStorage,
    loadDonations,
    removeDonationFromLocalStorage,
    getDonationsFromLocalStorage,
};