//install node.js, npm, and following dependencies
//$bash npm test
const { JSDOM } = require("jsdom");
const Calendar = require("../views/calendarView.js"); // Adjust the path if necessary

// Mock DOM setup for Jest
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
        // Create a new Calendar instance before each test
        calendar = new Calendar();
    });

    test("should initialize with the current date and no tasks", () => {
        const today = new Date();
        expect(calendar.date.toDateString()).toBe(today.toDateString());
        expect(calendar.tasks).toEqual([]); // Assuming `tasks` is an empty array by default
    });

    test("should handle year transitions in navigation", () => {
        calendar.date = new Date(2024, 11); // December 2024
        calendar.nextMonth(); // January 2025
        expect(calendar.date.getMonth()).toBe(0);
        expect(calendar.date.getFullYear()).toBe(2025);

        calendar.date = new Date(2025, 0); // January 2025
        calendar.prevMonth(); // December 2024
        expect(calendar.date.getMonth()).toBe(11);
        expect(calendar.date.getFullYear()).toBe(2024);
    });

    test("should load tasks and store them correctly", () => {
        const tasks = [
            { date: "2024-03-15", title: "Test Task 1" },
            { date: "2024-03-16", title: "Test Task 2" }
        ];
        calendar.loadTasks(tasks);
        expect(calendar.tasks).toEqual(tasks);
    });

    test("should render February 2028 correctly (29 days in leap year)", () => {
        calendar.date = new Date(2028, 1); // February 2028
        calendar.renderCalendar();

        const calendarDaysElement = document.getElementById("calendarDays");
        const daysInFebruary = Array.from(calendarDaysElement.children).filter(
            (day) => !day.classList.contains("empty")
        ).length;

        expect(daysInFebruary).toBe(29);
    });

    test("should mark specific task dates", () => {
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
        expect(valentineDay).not.toBeUndefined();
        expect(valentineDay.classList.contains("task-day")).toBe(true);
    
        calendar.date = new Date(2024, 11); // December 2024
        calendar.renderCalendar();
    
        const christmasDay = Array.from(calendarDaysElement.children).find(
            (day) => day.dataset.date === "2024-12-25"
        );
        expect(christmasDay).not.toBeUndefined();
        expect(christmasDay.classList.contains("task-day")).toBe(true);
    });
    
});
