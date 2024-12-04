// Initialize the Volunteer Tracker when the DOM is ready
document.addEventListener('DOMContentLoaded', initializeVolunteerTracker);

/**
 * Main Initialization: Set up the form and event listeners.
 */
function initializeVolunteerTracker() {
    const form = document.getElementById('volunteerForm');
    const feedback = document.getElementById('formFeedback');
    const totalHoursDisplay = document.getElementById('totalHours');
    const logList = document.getElementById('logList');

    let totalHours = 0; // Track the total volunteer hours

    // Attach form submission handler
    form.addEventListener('submit', (event) => handleFormSubmit(event, feedback, totalHoursDisplay, logList, totalHours));
}

/**
 * Handle form submission: Validate, process, and update the UI.
 */
function handleFormSubmit(event, feedback, totalHoursDisplay, logList, totalHours) {
    event.preventDefault();

    const formData = gatherFormData();
    const validation = validateFormData(formData);

    if (!validation.isValid) {
        displayFeedback(feedback, validation.message, 'error');
        return;
    }

    totalHours += formData.hoursVolunteered; // Update total hours
    updateTotalHours(totalHoursDisplay, totalHours);
    addLogEntry(logList, formData, totalHoursDisplay);

    displayFeedback(feedback, `Thank you for volunteering ${formData.hoursVolunteered} hours at "${formData.charityName}"!`, 'success');
    resetForm();
}

/**
 * Gather all input data from the form.
 * @returns {Object} Collected form data.
 */
function gatherFormData() {
    return {
        charityName: getInputValue('charityName'),
        hoursVolunteered: parseFloat(getInputValue('hoursVolunteered')),
        volunteerDate: getInputValue('volunteerDate'),
        experienceRating: parseInt(getInputValue('experienceRating'), 10),
    };
}

/**
 * Validate form data for required fields and correct values.
 * @returns {Object} Validation result.
 */
function validateFormData(data) {
    if (!data.charityName) return createError('Charity Name is required.');
    if (!isPositiveNumber(data.hoursVolunteered)) return createError('Hours must be a positive number.');
    if (!data.volunteerDate) return createError('Date is required.');
    if (!isValidRating(data.experienceRating)) return createError('Rating must be between 1 and 5.');
    return createSuccess();
}

/**
 * Add a new entry to the volunteer log.
 */
function addLogEntry(logList, formData, totalHoursDisplay) {
    const logItem = createLogItem(formData, totalHoursDisplay, logList);
    logList.appendChild(logItem);
}

/**
 * Create a log item element for the list.
 */
function createLogItem(formData, totalHoursDisplay, logList) {
    const logItem = document.createElement('li');
    logItem.textContent = `${formData.volunteerDate}: ${formData.hoursVolunteered} hours at "${formData.charityName}" (Rating: ${formData.experienceRating})`;

    const deleteButton = createDeleteButton(() => handleDelete(logItem, formData.hoursVolunteered, totalHoursDisplay, logList));
    logItem.appendChild(deleteButton);

    return logItem;
}

/**
 * Create a delete button for a log entry.
 */
function createDeleteButton(onClick) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.className = 'delete-button';
    button.addEventListener('click', onClick);
    return button;
}

/**
 * Handle deleting a log entry and updating the total hours.
 */
function handleDelete(logItem, hoursToRemove, totalHoursDisplay, logList) {
    const updatedTotal = parseFloat(totalHoursDisplay.textContent) - hoursToRemove;
    updateTotalHours(totalHoursDisplay, updatedTotal);
    logList.removeChild(logItem);
}

/**
 * Update the displayed total volunteer hours.
 */
function updateTotalHours(element, total) {
    element.textContent = total.toFixed(1); // Keep one decimal place for clarity
}

/**
 * Display feedback messages to the user.
 */
function displayFeedback(element, message, type) {
    element.textContent = message;
    element.className = type === 'success' ? 'feedback success' : 'feedback error';

    // Clear feedback after a few seconds
    setTimeout(() => {
        element.textContent = '';
        element.className = '';
    }, 4000);
}

/**
 * Reset the form to its default state.
 */
function resetForm() {
    document.getElementById('volunteerForm').reset();
}

/**
 * Get the value of an input field by ID.
 */
function getInputValue(id) {
    return document.getElementById(id).value.trim();
}

/**
 * Check if a number is positive.
 */
function isPositiveNumber(value) {
    return !isNaN(value) && value > 0;
}

/**
 * Validate if the rating is within the valid range.
 */
function isValidRating(value) {
    return !isNaN(value) && value >= 1 && value <= 5;
}

/**
 * Create an error result object.
 */
function createError(message) {
    return { isValid: false, message };
}

/**
 * Create a success result object.
 */
function createSuccess() {
    return { isValid: true };
}

// Export all functions for testing
module.exports = {
    initializeVolunteerTracker,
    handleFormSubmit,
    gatherFormData,
    validateFormData,
    addLogEntry,
    createLogItem,
    createDeleteButton,
    handleDelete,
    updateTotalHours,
    displayFeedback,
    resetForm,
    getInputValue,
    isPositiveNumber,
    isValidRating,
    createError,
    createSuccess,
};