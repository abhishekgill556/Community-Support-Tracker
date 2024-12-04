const {
  collectFormData,
  validateFormData,
  addLog,
  createTableRow,
  updateTotalHours,
  saveLog,
  loadLogs,
  removeLog,
  getLogs,
} = require('./volunteer');

describe('Volunteer Hours Tracker Tests', () => {
  beforeEach(() => {
      // Set up a mock DOM structure
      document.body.innerHTML = `
          <form id="volunteerForm">
              <input id="charityName" />
              <input id="hoursVolunteered" />
              <input id="volunteerDate" />
              <input id="experienceRating" />
          </form>
          <span id="totalHours">0</span>
          <table id="volunteerTable">
              <tbody></tbody>
          </table>
      `;

      // Clear localStorage before each test
      localStorage.clear();
  });

  test('collectFormData gathers data correctly', () => {
      document.getElementById('charityName').value = 'Charity A';
      document.getElementById('hoursVolunteered').value = '5';
      document.getElementById('volunteerDate').value = '2024-11-28';
      document.getElementById('experienceRating').value = '4';

      const formData = collectFormData();

      expect(formData).toEqual({
          charityName: 'Charity A',
          hoursVolunteered: 5,
          volunteerDate: '2024-11-28',
          experienceRating: 4,
      });
  });

  test('validateFormData validates input correctly', () => {
      const validData = {
          charityName: 'Charity B',
          hoursVolunteered: 3,
          volunteerDate: '2024-11-20',
          experienceRating: 5,
      };

      const invalidData = {
          charityName: '',
          hoursVolunteered: -2,
          volunteerDate: '',
          experienceRating: 6,
      };

      expect(validateFormData(validData)).toBeNull(); // No validation errors
      expect(validateFormData(invalidData)).toBe('All fields are required.');
  });

  test('addLog adds a new row to the table and updates total hours', () => {
      const tableBody = document.querySelector('#volunteerTable tbody');
      const totalHoursDisplay = document.getElementById('totalHours');
      const log = {
          charityName: 'Charity C',
          hoursVolunteered: 4,
          volunteerDate: '2024-11-15',
          experienceRating: 5,
      };

      addLog(tableBody, log, totalHoursDisplay);

      expect(tableBody.children.length).toBe(1);
      expect(totalHoursDisplay.textContent).toBe('4.0');
  });

  test('createTableRow creates a row with correct data', () => {
      const log = {
          charityName: 'Charity D',
          hoursVolunteered: 6,
          volunteerDate: '2024-11-30',
          experienceRating: 3,
      };

      const row = createTableRow(log);

      expect(row.querySelector('td').textContent).toBe('Charity D');
      expect(row.querySelectorAll('td')[1].textContent).toBe('6');
      expect(row.querySelectorAll('td')[2].textContent).toBe('2024-11-30');
      expect(row.querySelectorAll('td')[3].textContent).toBe('3');
      expect(row.querySelector('.delete-btn').textContent).toBe('Delete');
  });

  test('saveLog stores data in localStorage', () => {
      const log = {
          charityName: 'Charity E',
          hoursVolunteered: 2,
          volunteerDate: '2024-11-10',
          experienceRating: 4,
      };

      saveLog(log);

      const logs = JSON.parse(localStorage.getItem('volunteerLogs'));
      expect(logs.length).toBe(1);
      expect(logs[0]).toEqual(log);
  });

  test('loadLogs populates the table from localStorage', () => {
      const tableBody = document.querySelector('#volunteerTable tbody');
      const totalHoursDisplay = document.getElementById('totalHours');
      const logs = [
          {
              charityName: 'Charity F',
              hoursVolunteered: 3,
              volunteerDate: '2024-11-05',
              experienceRating: 5,
          },
      ];

      localStorage.setItem('volunteerLogs', JSON.stringify(logs));

      loadLogs(tableBody, totalHoursDisplay);

      expect(tableBody.children.length).toBe(1);
      expect(totalHoursDisplay.textContent).toBe('3.0');
  });

  test('removeLog removes a log from localStorage', () => {
      const log = {
          charityName: 'Charity G',
          hoursVolunteered: 4,
          volunteerDate: '2024-10-25',
          experienceRating: 3,
      };

      saveLog(log);
      removeLog(log);

      const logs = JSON.parse(localStorage.getItem('volunteerLogs'));
      expect(logs.length).toBe(0);
  });
});

