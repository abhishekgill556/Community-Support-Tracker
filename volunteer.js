document.addEventListener('DOMContentLoaded', initializeVolunteerTracker);

/**
 * Initialize the Volunteer Tracker.
 */
function initializeVolunteerTracker() {
    const form = document.getElementById('volunteerForm');
    const tableBody = document.querySelector('#volunteerTable tbody');
    const totalHoursDisplay = document.getElementById('totalHours');

    // Load existing logs from localStorage
    loadLogs(tableBody, totalHoursDisplay);

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        handleFormSubmit(tableBody, totalHoursDisplay);
    });
}

/**
 * Handle form submission: validate, update table, and save to storage.
 */
function handleFormSubmit(tableBody, totalHoursDisplay) {
    const formData = collectFormData();
    const validationMessage = validateFormData(formData);

    if (validationMessage) {
        showFeedback(validationMessage, 'error');
        return;
    }

    addLog(tableBody, formData, totalHoursDisplay);
    saveLog(formData);
    showFeedback(`Logged ${formData.hoursVolunteered} hours for "${formData.charityName}".`, 'success');
    resetForm();
}

/**
 * Collect data from the form fields.
 */
function collectFormData() {
    return {
        charityName: getInputValue('charityName'),
        hoursVolunteered: parseFloat(getInputValue('hoursVolunteered')),
        volunteerDate: getInputValue('volunteerDate'),
        experienceRating: parseInt(getInputValue('experienceRating'), 10),
    };
}

/**
 * Validate the form data.
 */
function validateFormData(data) {
    if (!data.charityName || !data.volunteerDate || !data.hoursVolunteered || !data.experienceRating) {
        return 'All fields are required.';
    }
    if (data.hoursVolunteered <= 0) {
        return 'Hours must be greater than 0.';
    }
    if (data.experienceRating < 1 || data.experienceRating > 5) {
        return 'Rating must be between 1 and 5.';
    }
    return null;
}

/**
 * Add a log entry to the table.
 */
function addLog(tableBody, log, totalHoursDisplay) {
    const row = createTableRow(log);
    tableBody.appendChild(row);
    updateTotalHours(totalHoursDisplay, log.hoursVolunteered);
}

/**
 * Create a table row for the log.
 */
function createTableRow(log) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${log.charityName}</td>
        <td>${log.hoursVolunteered}</td>
        <td>${log.volunteerDate}</td>
        <td>${log.experienceRating}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    // Attach delete functionality
    const deleteButton = row.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => handleDelete(row, log));
    return row;
}

/**
 * Handle deleting a log entry.
 */
function handleDelete(row, log) {
    row.remove();
    removeLog(log);
    updateTotalHours(document.getElementById('totalHours'), -log.hoursVolunteered);
}

/**
 * Update the total hours displayed.
 */
function updateTotalHours(display, hours) {
    const currentTotal = parseFloat(display.textContent) || 0;
    const newTotal = currentTotal + hours;
    display.textContent = newTotal.toFixed(1); 
}

/**
 * Save a log to localStorage.
 */
function saveLog(log) {
    const logs = getLogs();
    logs.push(log);
    localStorage.setItem('volunteerLogs', JSON.stringify(logs));
}

/**
 * Load logs from localStorage and populate the table.
 */
function loadLogs(tableBody, totalHoursDisplay) {
    const logs = getLogs();
    logs.forEach((log) => addLog(tableBody, log, totalHoursDisplay));
}

/**
 * Remove a log from localStorage.
 */
function removeLog(logToRemove) {
    const logs = getLogs();
    const updatedLogs = logs.filter((log) => {
        return (
            log.charityName !== logToRemove.charityName ||
            log.volunteerDate !== logToRemove.volunteerDate
        );
    });
    localStorage.setItem('volunteerLogs', JSON.stringify(updatedLogs));
}

/**
 * Get all logs from localStorage.
 */
function getLogs() {
    return JSON.parse(localStorage.getItem('volunteerLogs')) || [];
}

/**
 * Display feedback to the user.
 */
function showFeedback(message, type) {
    const feedback = document.getElementById('formFeedback');
    feedback.textContent = message;
    feedback.className = type === 'success' ? 'feedback success' : 'feedback error';

    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = '';
    }, 4000);
}

/**
 * Reset the form fields.
 */
function resetForm() {
    document.getElementById('volunteerForm').reset();
}

/**
 * Get the value of a form field by ID.
 */
function getInputValue(id) {
    return document.getElementById(id).value.trim();
}

// Export all functions for testing
module.exports = {
    initializeVolunteerTracker,
    handleFormSubmit,
    collectFormData,
    validateFormData,
    addLog,
    createTableRow,
    removeLog,
    updateTotalHours,
    saveLog,
    loadLogs,
    getLogs,
    resetForm,
};

