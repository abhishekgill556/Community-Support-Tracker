document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('volunteerForm');
    const feedback = document.getElementById('formFeedback');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Collect
      const formData = {
        charityName: document.getElementById('charityName').value.trim(),
        hoursVolunteered: parseFloat(document.getElementById('hoursVolunteered').value),
        volunteerDate: document.getElementById('volunteerDate').value,
        experienceRating: parseInt(document.getElementById('experienceRating').value, 10),
      };
  
      // Validate
      const validationResult = validateVolunteerForm(formData);
  
      if (!validationResult.isValid) {
        displayFeedback(feedback, validationResult.message, 'error');
        return;
      }
  
      // If valid, display success message
      displayFeedback(feedback, `Thank you for volunteering ${formData.hoursVolunteered} hours at "${formData.charityName}"!`, 'success');
  
      // reset the form
      form.reset();
    });
  });
  
  // Validation function
  function validateVolunteerForm(data) {
    if (!data.charityName) return { isValid: false, message: 'Charity Name is required.' };
    if (isNaN(data.hoursVolunteered) || data.hoursVolunteered <= 0) return { isValid: false, message: 'Hours Volunteered must be a positive number.' };
    if (!data.volunteerDate) return { isValid: false, message: 'Date is required.' };
    if (isNaN(data.experienceRating) || data.experienceRating < 1 || data.experienceRating > 5) return { isValid: false, message: 'Experience Rating must be between 1 and 5.' };
    return { isValid: true };
  }
  
  // Feedback display function
  function displayFeedback(element, message, type) {
    element.textContent = message;
    element.className = type === 'success' ? 'feedback success' : 'feedback error';
  }
  
  // Assign functions to the window object for browser compatibility
  window.validateVolunteerForm = validateVolunteerForm;
  window.displayFeedback = displayFeedback;
  
  // Export functions for testing
  module.exports = { validateVolunteerForm, displayFeedback };
  