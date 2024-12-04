document.addEventListener('DOMContentLoaded', () => {
    setupEventForm();
});
 
function setupEventForm() {
    const form = document.getElementById('eventForm');
    const feedback = document.getElementById('feedback');
    const participantList = document.getElementById('participantList');
 
    form.addEventListener('submit', (event) => {
        event.preventDefault();
 
        const formData = getFormData();
        const validationMessage = validateFormData(formData);
 
        if (validationMessage) {
            displayFeedback(feedback, validationMessage, 'error');
            return;
        }
 
        addParticipant(participantList, formData);
        displayFeedback(
            feedback,
            `Thank you, ${formData.representativeName}, for signing up for "${formData.eventName}" as a ${formData.role}.`,
            'success'
        );
 
        form.reset();
    });
}
 
function getFormData() {
    return {
        eventName: document.getElementById('eventName').value.trim(),
        representativeName: document.getElementById('representativeName').value.trim(),
        email: document.getElementById('email').value.trim(),
        role: document.getElementById('role').value,
    };
}
 
function validateFormData(data) {
    if (!data.eventName || !data.representativeName || !data.email || !data.role) {
        return 'All fields are required.';
    }
    if (!isValidEmail(data.email)) {
        return 'Please enter a valid email address.';
    }
    return null;
}
 
function addParticipant(listElement, data) {
    const listItem = document.createElement('li');
    const textSpan = document.createElement('span');
 
    textSpan.innerHTML = `
        <strong>${data.representativeName}</strong> signed up for <em>${data.eventName}</em> as a ${data.role}
        (<a href="mailto:${data.email}">${data.email}</a>).
    `;
 
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
        listElement.removeChild(listItem);
    });
 
    listItem.appendChild(textSpan);
    listItem.appendChild(deleteButton);
    listElement.appendChild(listItem);
}
 
function displayFeedback(element, message, type) {
    element.textContent = message;
    element.style.color = type === 'success' ? '#2ecc71' : '#e74c3c';
}
 
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
 
module.exports = {
    setupEventForm,
    getFormData,
    validateFormData,
    addParticipant,
    displayFeedback,
    isValidEmail,
};