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
} )