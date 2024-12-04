const {
    collectFormData,
    validateFormData,
    addParticipant,
    deleteParticipant,
    getParticipants,
    loadParticipants,
} = require('./event');
 
describe('Event Signup Tests', () => {
    beforeEach(() => {
        // Mock the DOM
        document.body.innerHTML = `
            <form id="eventForm">
                <input id="eventName" />
                <input id="representativeName" />
                <input id="email" />
                <select id="role">
                    <option value="sponsor">Sponsor</option>
                    <option value="participant">Participant</option>
                </select>
            </form>
            <div id="feedback"></div>
            <table id="participantTable">
                <tbody></tbody>
            </table>
        `;
        localStorage.clear();
    });
 
    test('collectFormData gathers data correctly', () => {
        document.getElementById('eventName').value = 'Hackathon';
        document.getElementById('representativeName').value = 'Harman Sandhu';
        document.getElementById('email').value = 'harman@example.com';
        document.getElementById('role').value = 'sponsor';
 
        const data = collectFormData();
        expect(data).toEqual({
            eventName: 'Hackathon',
            representativeName: 'Harman Sandhu',
            email: 'harman@example.com',
            role: 'sponsor',
        });
    });
 
    test('validateFormData validates data correctly', () => {
        const validData = {
            eventName: 'Hackathon',
            representativeName: 'Harman Sandhu',
            email: 'harman@example.com',
            role: 'sponsor',
        };
        const invalidData = {
            eventName: '',
            representativeName: '',
            email: '',
            role: '',
        };
 
        expect(validateFormData(validData)).toBeNull();
        expect(validateFormData(invalidData)).toBe('Please fill out all fields.');
    });
 
    test('addParticipant stores data in localStorage', () => {
        const participant = {
            eventName: 'Hackathon',
            representativeName: 'Harman Sandhu',
            email: 'harman@example.com',
            role: 'sponsor',
        };
 
        addParticipant(participant);
        const participants = getParticipants();
        expect(participants.length).toBe(1);
        expect(participants[0]).toEqual(participant);
    });
 
    test('deleteParticipant removes data correctly', () => {
        const participant = {
            eventName: 'Hackathon',
            representativeName: 'Harman Sandhu',
            email: 'harman@example.com',
            role: 'sponsor',
        };
 
        addParticipant(participant);
        deleteParticipant(0);
        const participants = getParticipants();
        expect(participants.length).toBe(0);
    });
 
    test('loadParticipants populates the table', () => {
        const participant = {
            eventName: 'Hackathon',
            representativeName: 'Harman Sandhu',
            email: 'harman@example.com',
            role: 'sponsor',
        };
 
        addParticipant(participant);
        loadParticipants();
 
        const tableBody = document.querySelector('#participantTable tbody');
        expect(tableBody.children.length).toBe(1);
    });
});