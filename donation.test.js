const {
    collectFormData,
    validateFormData,
    updateTotalDonations,
    saveDonationToLocalStorage,
    loadDonations,
    removeDonationFromLocalStorage,
    getDonationsFromLocalStorage,
} = require("./donation");
 
describe("Donation Tracker Tests", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="donationForm">
                <input id="charityName" value="funds" />
                <input id="donationAmount" value="100" />
                <input id="donationDate" value="2024-12-01" />
                <textarea id="donorMessage">Thank you!</textarea>
            </form>
            <span id="totalDonations">0</span>
            <table id="donationTable">
                <tbody></tbody>
            </table>
        `;
        localStorage.clear();
    });
 
    test("collectFormData correctly gathers form input", () => {
        const data = collectFormData();
        expect(data).toEqual({
            charityName: "funds",
            donationAmount: 100,
            donationDate: "2024-12-01",
            donorMessage: "Thank you!",
        });
    });
 
    test("validateFormData validates correctly", () => {
        const validData = {
            charityName: "funds",
            donationAmount: 100,
            donationDate: "2024-12-01",
            donorMessage: "Thank you!",
        };
 
        const invalidData = {
            charityName: "",
            donationAmount: -1,
            donationDate: "",
            donorMessage: "",
        };
 
        expect(validateFormData(validData)).toBeNull();
        expect(validateFormData(invalidData)).toBe(
            "Please fill out all required fields."
        );
    });
 
    test("updateTotalDonations correctly calculates total", () => {
        const display = document.getElementById("totalDonations");
        updateTotalDonations(display, 100);
        expect(display.textContent).toBe("100.00");
 
        updateTotalDonations(display, -50);
        expect(display.textContent).toBe("50.00");
    });
 
    test("saveDonationToLocalStorage stores data correctly", () => {
        const donation = {
            charityName: "funds",
            donationAmount: 100,
            donationDate: "2024-12-01",
            donorMessage: "Thank you!",
        };
        saveDonationToLocalStorage(donation);
 
        const donations = JSON.parse(localStorage.getItem("donations"));
        expect(donations.length).toBe(1);
        expect(donations[0]).toEqual(donation);
    });
 
    test("removeDonationFromLocalStorage removes data correctly", () => {
        const donation = {
            charityName: "funds",
            donationAmount: 100,
            donationDate: "2024-12-01",
            donorMessage: "Thank you!",
        };
        saveDonationToLocalStorage(donation);
        removeDonationFromLocalStorage(donation);
 
        const donations = JSON.parse(localStorage.getItem("donations"));
        expect(donations.length).toBe(0);
    });
 
    test("loadDonations retrieves data from localStorage", () => {
        const tableBody = document.querySelector("#donationTable tbody");
        const totalDisplay = document.getElementById("totalDonations");
 
        const donation = {
            charityName: "funds",
            donationAmount: 100,
            donationDate: "2024-12-01",
            donorMessage: "Thank you!",
        };
        saveDonationToLocalStorage(donation);
        loadDonations(tableBody, totalDisplay);
 
        expect(tableBody.children.length).toBe(1);
        expect(totalDisplay.textContent).toBe("100.00");
    });
});