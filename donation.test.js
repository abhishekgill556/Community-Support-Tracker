const { validateDonationForm } = require('./donation.js');

describe('Donation Tracker Tests', () => {
    test('should validate correct form data', () => {
        const formData = {
            charityName: 'Red Cross',
            donationAmount: 100,
            donationDate: '2024-11-27',
            donorMessage: 'Keep up the great work!',
        };

        const validation = validateDonationForm(formData);
        expect(validation.isValid).toBe(true);
        expect(validation.message).toBeUndefined(); // No error message
    });

    test('should flag missing charity name', () => {
        const formData = {
            charityName: '',
            donationAmount: 100,
            donationDate: '2024-11-27',
            donorMessage: '',
        };

        const validation = validateDonationForm(formData);
        expect(validation.isValid).toBe(false);
        expect(validation.message).toBe('Charity Name is required.');
    });

    test('should flag invalid donation amount', () => {
        const formData = {
            charityName: 'UNICEF',
            donationAmount: -50,
            donationDate: '2024-11-27',
            donorMessage: 'Great cause!',
        };

        const validation = validateDonationForm(formData);
        expect(validation.isValid).toBe(false);
        expect(validation.message).toBe('Donation Amount must be a positive number.');
    });

    test('should flag missing donation date', () => {
        const formData = {
            charityName: 'World Food Program',
            donationAmount: 200,
            donationDate: '',
            donorMessage: 'Thanks for helping!',
        };

        const validation = validateDonationForm(formData);
        expect(validation.isValid).toBe(false);
        expect(validation.message).toBe('Date of Donation is required.');
    });
});
