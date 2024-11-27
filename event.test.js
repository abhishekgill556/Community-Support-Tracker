document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault();
 
    const eventName = document.getElementById('eventName').value.trim();
    const representativeName = document.getElementById('representativeName').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
 
    const feedback = document.getElementById('feedback');
    feedback.style.color = '#e74c3c'; // Default to red for errors
 
    // Validate inputs
    if (!eventName || !representativeName || !email || !role) {
        feedback.textContent = 'Please fill out all fields.';
        return;
    }
 
    if (!validateEmail(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        return;
    }
 
    // Create a temporary data object
    const formData = {
        eventName,
        representativeName,
        email,
        role
    };
 
    feedback.textContent = `Thank you, ${representativeName}, for signing up for "${eventName}" as a ${role}.`;
    feedback.style.color = '#2ecc71'; // Green for success
 
    console.log('Form Data:', formData);
 
    // Optionally reset the form
    document.getElementById('eventForm').reset();
});