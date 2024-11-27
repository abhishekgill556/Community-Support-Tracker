const { validateVolunteerForm, displayFeedback } = require('./volunteer');

describe('Volunteer Form Tests', () => {
  beforeEach(() => {
    // Set up a DOM environment for testing
    document.body.innerHTML = `
      <div id="formFeedback"></div>
    `;
  });

  // Test validation logic
  test('validateVolunteerForm validates form data correctly', () => {
    const validData = {
      charityName: 'Charity ABC',
      hoursVolunteered: 5,
      volunteerDate: '2024-11-27',
      experienceRating: 4,
    };

    const invalidData = {
      charityName: '',
      hoursVolunteered: -1,
      volunteerDate: '',
      experienceRating: 6,
    };

    expect(validateVolunteerForm(validData)).toEqual({ isValid: true });
    expect(validateVolunteerForm(invalidData)).toEqual({ isValid: false, message: 'Charity Name is required.' });
  });

  // Test feedback display logic
  test('displayFeedback updates feedback element correctly', () => {
    const feedbackElement = document.getElementById('formFeedback');

    displayFeedback(feedbackElement, 'Success!', 'success');
    expect(feedbackElement.textContent).toBe('Success!');
    expect(feedbackElement.className).toBe('feedback success');

    displayFeedback(feedbackElement, 'Error!', 'error');
    expect(feedbackElement.textContent).toBe('Error!');
    expect(feedbackElement.className).toBe('feedback error');
  });
});


