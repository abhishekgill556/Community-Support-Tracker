document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donationForm');
    const feedback = document.getElementById('formFeedback');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect form data
        const formData = {
            charityName: document.getElementById('charityName').value.trim(),
            donationAmount: parseFloat(document.getElementById('donationAmount').value),
            donationDate: document.getElementById('donationDate').value,
            donorMessage: document.getElementById('donorMessage').value.trim(),
        };

        // Validate form data
        const validationResult = validateDonationForm(formData);

        if (!validationResult.isValid) {
            displayFeedback(feedback, validationResult.message, 'error');
            return;
        }

        // If valid, display success message
        displayFeedback(feedback, `Thank you for your donation of $${formData.donationAmount.toFixed(2)} to "${formData.charityName}"!`, 'success');

        // reset the form Optionally 
        form.reset();
    });

    // Validation function
    function validateDonationForm(data) {
        if (!data.charityName) return { isValid: false, message: 'Charity Name is required.' };
        if (isNaN(data.donationAmount) || data.donationAmount <= 0) return { isValid: false, message: 'Donation Amount must be a positive number.' };
        if (!data.donationDate) return { isValid: false, message: 'Date of Donation is required.' };
        return { isValid: true };
    }

    // Feedback display function
    function displayFeedback(element, message, type) {
        element.textContent = message;
        element.className = type === 'success' ? 'feedback success' : 'feedback error';
    }
});
