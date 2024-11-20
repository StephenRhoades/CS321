const { JSDOM } = require("jsdom");
const { expect } = require("chai");
const Calendar = require("../views/calendarView.js"); // Adjust path as necessary

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

    //Test Initialization
    it("should initialize with the current date and no tasks", () => {
        const today = new Date();
        expect(calendar.date.toDateString()).to.equal(today.toDateString());
        expect(calendar.tasks).to.deep.equal([]); // Assuming `tasks` is an array
    });

    //Test nextMonth and prevMonth
    it("should handle year transitions in navigation", () => {
        // Test December to January
        calendar.date = new Date(2024, 11); // December 2024
        calendar.nextMonth(); // January 2025
        expect(calendar.date.getMonth()).to.equal(0);
        expect(calendar.date.getFullYear()).to.equal(2025);
    
        // Test January to December
        calendar.date = new Date(2025, 0); // January 2025
        calendar.prevMonth(); // December 2024
        expect(calendar.date.getMonth()).to.equal(11);
        expect(calendar.date.getFullYear()).to.equal(2024);
    });

   
    //Test loadTasks
    it("should load tasks and store them correctly", () => {
        const tasks = [
            { date: "2024-03-15", title: "Test Task 1" },
            { date: "2024-03-16", title: "Test Task 2" }
        ];
        calendar.loadTasks(tasks);
        expect(calendar.tasks).to.deep.equal(tasks);
    });

    //Test leap year
    it("should render February 2028 correctly (29 days in leap year)", () => {
        calendar.date = new Date(2028, 1); // February 2028
        calendar.renderCalendar();

        const calendarDaysElement = document.getElementById("calendarDays");
        const daysInFebruary = Array.from(calendarDaysElement.children).filter(
            (day) => !day.classList.contains("empty")
        ).length;

        expect(daysInFebruary).to.equal(29);
    });
    
    //Test Rendering Edge Cases
    it("should render February correctly for leap and non-leap years", () => {
        // Leap year
        calendar.date = new Date(2028, 1); // February 2028
        calendar.renderCalendar();
        const daysInLeapFebruary = Array.from(
            document.getElementById("calendarDays").children
        ).filter((day) => !day.classList.contains("empty")).length;
        expect(daysInLeapFebruary).to.equal(29);
    
        // Non-leap year
        calendar.date = new Date(2023, 1); // February 2023
        calendar.renderCalendar();
        const daysInNonLeapFebruary = Array.from(
            document.getElementById("calendarDays").children
        ).filter((day) => !day.classList.contains("empty")).length;
        expect(daysInNonLeapFebruary).to.equal(28);
    });
    
    // Test nextMonth and prevMonth
    it("should navigate from December to January and January to December", () => {
        // Navigate from December to January
        calendar.date = new Date(2024, 11); // December 2024
        calendar.nextMonth(); // January 2025
        expect(calendar.date.getMonth()).to.equal(0);
        expect(calendar.date.getFullYear()).to.equal(2025);

        // Navigate back from January to December
        calendar.date = new Date(2024, 0); // January 2024
        calendar.prevMonth(); // December 2023
        expect(calendar.date.getMonth()).to.equal(11);
        expect(calendar.date.getFullYear()).to.equal(2023);
    });

    // Test nextMonth and prevMonth
    it("should navigate from April to May and May to April", () => {
        // Navigate from December to January
        calendar.date = new Date(2024, 3); // December 2024
        calendar.nextMonth(); // January 2025
        expect(calendar.date.getMonth()).to.equal(4);
        expect(calendar.date.getFullYear()).to.equal(2024);

        // Navigate back from January to December
        calendar.date = new Date(2024, 4); // January 2024
        calendar.prevMonth(); // December 2023
        expect(calendar.date.getMonth()).to.equal(3);
        expect(calendar.date.getFullYear()).to.equal(2024);
    });

    //Test Task Marking
    it("should mark specific task dates", () => {
        const tasks = [
            { date: "2024-02-14", title: "Valentine's Day Task" },
            { date: "2024-12-25", title: "Christmas Task" }
        ];
        calendar.loadTasks(tasks);

        // Render February 2024
        calendar.date = new Date(2024, 1); // February 2024
        calendar.renderCalendar();
        const calendarDaysElement = document.getElementById("calendarDays");
        const valentineDay = Array.from(calendarDaysElement.children).find(
            (day) => day.dataset.date === "2024-02-14"
        );
        expect(valentineDay).to.not.be.undefined;
        expect(valentineDay.classList.contains("task-day")).to.be.true;

        // Render December 2024
        calendar.date = new Date(2024, 11); // December 2024
        calendar.renderCalendar();
        const christmasDay = Array.from(calendarDaysElement.children).find(
            (day) => day.dataset.date === "2024-12-25"
        );
        expect(christmasDay).to.not.be.undefined;
        expect(christmasDay.classList.contains("task-day")).to.be.true;
    });

    
});
