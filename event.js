// Add event listener for form submission
if (typeof document !== "undefined") {
    document.getElementById('eventForm')?.addEventListener('submit', handleFormSubmit);
    document.addEventListener('DOMContentLoaded', loadParticipants);
}
 
// Collect form data
function collectFormData() {
    const eventName = document.getElementById('eventName').value.trim();
    const representativeName = document.getElementById('representativeName').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
 
    return { eventName, representativeName, email, role };
}
 
// Validate form data
function validateFormData(data) {
    if (!data.eventName || !data.representativeName || !data.email || !data.role) {
        return "Please fill out all fields.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return "Invalid email format.";
    }
    return null;
}
 
// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const feedback = document.getElementById('feedback');
    const formData = collectFormData();
 
    const validationError = validateFormData(formData);
    if (validationError) {
        feedback.textContent = validationError;
        feedback.style.color = "#e74c3c";
        return;
    }
 
    addParticipant(formData);
    feedback.textContent = `Thank you, ${formData.representativeName}, for signing up for "${formData.eventName}" as a ${formData.role}.`;
    feedback.style.color = "#2ecc71";
    document.getElementById('eventForm').reset();
}
 
// Add a participant to localStorage and table
function addParticipant(participant) {
    const participants = getParticipants();
    participants.push(participant);
    localStorage.setItem('participants', JSON.stringify(participants));
    updateParticipantTable();
}
 
// Load participants from localStorage and populate table
function loadParticipants() {
    updateParticipantTable();
}
 
// Get participants from localStorage
function getParticipants() {
    return JSON.parse(localStorage.getItem('participants')) || [];
}
 
// Update participant table
function updateParticipantTable() {
    const participants = getParticipants();
    const tableBody = document.querySelector('#participantTable tbody');
    tableBody.innerHTML = '';
 
    participants.forEach((participant, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${participant.eventName}</td>
            <td>${participant.representativeName}</td>
            <td>${participant.email}</td>
            <td>${participant.role}</td>
            <td><button class="delete-button" data-index="${index}">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
 
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            deleteParticipant(index);
        });
    });
}
 
// Delete a participant from localStorage and table
function deleteParticipant(index) {
    const participants = getParticipants();
    participants.splice(index, 1);
    localStorage.setItem('participants', JSON.stringify(participants));
    updateParticipantTable();
}
 
// Export functions for testing
module.exports = {
    collectFormData,
    validateFormData,
    addParticipant,
    deleteParticipant,
    getParticipants,
    loadParticipants,
};