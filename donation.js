// Set up the donation tracker when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setupDonationForm();
    setupDonationSummary();
});
 
// Keep track of the total donations and logs
let totalDonations = 0;
const donationLogs = [];
 
// Initialize the donation form
function setupDonationForm() {
    const form = document.getElementById('donationForm');
    const feedbackElement = document.getElementById('formFeedback');
 
    form.addEventListener('submit', (event) => {
        event.preventDefault();
 
        const donationData = gatherDonationData();
        const validation = validateDonationData(donationData);
 
        if (!validation.isValid) {
            displayNotification(feedbackElement, validation.message, 'error');
            return;
        }
 
        addDonation(donationData);
        displayNotification(
            feedbackElement,
            `Donation of $${formatCurrency(donationData.donationAmount)} to "${donationData.charityName}" recorded successfully!`,
            'success'
        );
 
        form.reset(); // Clear the form
    });
}
 
// Initialize the donation summary section
function setupDonationSummary() {
    const totalDisplay = document.getElementById('totalDonations');
    const logList = document.getElementById('donationList');
    updateTotalDonations(totalDisplay, 0); // Start with zero
}
 
// Collect data from the donation form
function gatherDonationData() {
    return {
        charityName: fetchInputValue('charityName'),
        donationAmount: parseFloat(fetchInputValue('donationAmount')),
        donationDate: fetchInputValue('donationDate'),
        donorMessage: fetchInputValue('donorMessage'),
    };
}
 
// Validate the collected donation data
function validateDonationData(data) {
    if (!data.charityName) return generateError('Please enter the name of the charity.');
    if (!isPositiveNumber(data.donationAmount)) return generateError('Donation amount must be greater than zero.');
    if (!isValidDate(data.donationDate)) return generateError('Please provide a valid donation date.');
 
    return generateSuccess();
}
 
// Add a donation entry
function addDonation(donation) {
    totalDonations += donation.donationAmount;
    donationLogs.push(donation);
 
    updateTotalDonations(document.getElementById('totalDonations'), totalDonations);
    appendDonationLog(donation, document.getElementById('donationList'));
}
 
// Update the total donation amount displayed
function updateTotalDonations(displayElement, total) {
    displayElement.textContent = formatCurrency(total);
}
 
// Append a new donation log to the summary section
function appendDonationLog(donation, listElement) {
    const logItem = document.createElement('li');
    logItem.innerHTML = `
        <span>${donation.donationDate}: $${formatCurrency(donation.donationAmount)} to "${donation.charityName}"</span>
    `;
 
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
        removeDonation(logItem, donation);
    });
 
    logItem.appendChild(deleteButton);
    listElement.appendChild(logItem);
}
 
// Remove a donation from the logs and update the total
function removeDonation(logItem, donation) {
    totalDonations -= donation.donationAmount;
    updateTotalDonations(document.getElementById('totalDonations'), totalDonations);
 
    const index = donationLogs.indexOf(donation);
    if (index > -1) donationLogs.splice(index, 1);
 
    logItem.remove(); // Remove the log visually
}
 
// Display a notification to the user
function displayNotification(element, message, type) {
    element.textContent = message;
    element.className = type === 'success' ? 'feedback success' : 'feedback error';
 
    // Auto-clear the notification after a few seconds
    setTimeout(() => {
        element.textContent = '';
        element.className = '';
    }, 4000);
}
 
// Fetch the value of an input field by its ID
function fetchInputValue(id) {
    return document.getElementById(id).value.trim();
}
 
// Check if a number is positive
function isPositiveNumber(value) {
    return !isNaN(value) && value > 0;
}
 
// Validate if a date string is valid
function isValidDate(dateString) {
    const parsedDate = new Date(dateString);
    return !isNaN(parsedDate) && /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}
 
// Format a number into currency format
function formatCurrency(amount) {
    return amount.toFixed(2);
}
 
// Generate an error response
function generateError(message) {
    return { isValid: false, message };
}
 
// Generate a success response
function generateSuccess() {
    return { isValid: true };
}
 
// Export functions for testing
module.exports = {
    setupDonationForm,
    setupDonationSummary,
    gatherDonationData,
    validateDonationData,
    addDonation,
    removeDonation,
    updateTotalDonations,
    appendDonationLog,
    displayNotification,
    fetchInputValue,
    isPositiveNumber,
    isValidDate,
    formatCurrency,
    generateError,
    generateSuccess,
};