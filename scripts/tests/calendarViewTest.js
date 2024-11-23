// Import necessary libraries
const { JSDOM } = require("jsdom");
const Calendar = require("../views/calendarView.js"); // Adjust path as necessary

// Setup Chai for Mocha
let chaiExpect;
try {
    const { expect } = require("chai"); // For Mocha
    chaiExpect = expect;
} catch (err) {
    // Jest has its own `expect`
}

// Mock DOM setup
const dom = new JSDOM(`<!DOCTYPE html>
    <div id="monthName"></div>
    <div id="calendarDays"></div>
    <button id="prevMonth"></button>
    <button id="nextMonth"></button>`);
global.document = dom.window.document;
global.window = dom.window;

describe("Calendar Tests", () => {
    let calendar;

    beforeEach(() => {
        calendar = new Calendar(); // Create a new instance for each test
    });

    // Helper function for unified assertions
    const assertEqual = (actual, expected) => {
        if (chaiExpect) {
            chaiExpect(actual).to.equal(expected); // Mocha
        } else {
            expect(actual).toBe(expected); // Jest
        }
    };

    const assertDeepEqual = (actual, expected) => {
        if (chaiExpect) {
            chaiExpect(actual).to.deep.equal(expected); // Mocha
        } else {
            expect(actual).toEqual(expected); // Jest
        }
    };

    // Test Initialization
    it("should initialize with the current date and no tasks", () => {
        const today = new Date();
        assertEqual(calendar.date.toDateString(), today.toDateString());
        assertDeepEqual(calendar.tasks, []); // Assuming `tasks` is an array
    });

    // Test nextMonth and prevMonth
    it("should handle year transitions in navigation", () => {
        calendar.date = new Date(2024, 11); // December 2024
        calendar.nextMonth(); // January 2025
        assertEqual(calendar.date.getMonth(), 0);
        assertEqual(calendar.date.getFullYear(), 2025);

        calendar.date = new Date(2025, 0); // January 2025
        calendar.prevMonth(); // December 2024
        assertEqual(calendar.date.getMonth(), 11);
        assertEqual(calendar.date.getFullYear(), 2024);
    });

    // Test loadTasks
    it("should load tasks and store them correctly", () => {
        const tasks = [
            { date: "2024-03-15", title: "Test Task 1" },
            { date: "2024-03-16", title: "Test Task 2" }
        ];
        calendar.loadTasks(tasks);
        assertDeepEqual(calendar.tasks, tasks);
    });

    // Test leap year
    it("should render February 2028 correctly (29 days in leap year)", () => {
        calendar.date = new Date(2028, 1); // February 2028
        calendar.renderCalendar();

        const calendarDaysElement = document.getElementById("calendarDays");
        const daysInFebruary = Array.from(calendarDaysElement.children).filter(
            (day) => !day.classList.contains("empty")
        ).length;

        assertEqual(daysInFebruary, 29);
    });

    // Test Task Marking
    it("should mark specific task dates", () => {
        const tasks = [
            { date: "2024-02-14", title: "Valentine's Day Task" },
            { date: "2024-12-25", title: "Christmas Task" }
        ];
        calendar.loadTasks(tasks);

        calendar.date = new Date(2024, 1); // February 2024
        calendar.renderCalendar();
        const calendarDaysElement = document.getElementById("calendarDays");
        const valentineDay = Array.from(calendarDaysElement.children).find(
            (day) => day.dataset.date === "2024-02-14"
        );
        if (chaiExpect) {
            chaiExpect(valentineDay).to.not.be.undefined;
            chaiExpect(valentineDay.classList.contains("task-day")).to.be.true;
        } else {
            expect(valentineDay).not.toBeUndefined();
            expect(valentineDay.classList.contains("task-day")).toBe(true);
        }

        calendar.date = new Date(2024, 11); // December 2024
        calendar.renderCalendar();
        const christmasDay = Array.from(calendarDaysElement.children).find(
            (day) => day.dataset.date === "2024-12-25"
        );
        if (chaiExpect) {
            chaiExpect(christmasDay).to.not.be.undefined;
            chaiExpect(christmasDay.classList.contains("task-day")).to.be.true;
        } else {
            expect(christmasDay).not.toBeUndefined();
            expect(christmasDay.classList.contains("task-day")).toBe(true);
        }
    });
});