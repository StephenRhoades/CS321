global.loadTaskInLocalStorage = () => {
    // Mock function to return example tasks
    return [
        { date: "2024-02-14", title: "Valentine's Day Task" }, // For February 2024
        { date: "2024-12-25", title: "Christmas Task" }       // For December 2024
    ];
};

const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><div id="monthName"></div><div id="calendarDays"></div><button id="prevMonth"></button><button id="nextMonth"></button>`);
global.document = dom.window.document;
global.window = dom.window;

const Calendar = require('../views/calendarView.js'); // Adjust path if necessary

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: calendarViewTest");
    testRenderSpecificMonth();
    testSpecificMonthNavigation();
    testSpecificTaskDays();
});

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

// Test rendering of February in a leap year (2028)
function testRenderSpecificMonth() {
    const calendar = new Calendar();
    calendar.date = new Date(2028, 1); // February 2028
    calendar.renderCalendar();

    const calendarDaysElement = document.getElementById('calendarDays');
    const daysInFebruary = Array.from(calendarDaysElement.children).filter(day => !day.classList.contains("empty")).length;

    assert(daysInFebruary === 29, "February in a leap year should have 29 days.");

    console.log("Test Render Specific Month: Passed");
}

// Test navigating from December to January and January to December
function testSpecificMonthNavigation() {
    const calendar = new Calendar();

    // Navigate from December to January
    calendar.date = new Date(2024, 11); // December 2024
    calendar.nextMonth(); //January 2025
    assert(calendar.date.getMonth() === 0 && calendar.date.getFullYear() === 2025, "Should navigate from December to January of the next year.");

    // Navigate back from January to December
    calendar.date = new Date(2024, 0); // January 2024
    calendar.prevMonth(); // December 2023
    assert(calendar.date.getMonth() === 11 && calendar.date.getFullYear() === 2023, "Should navigate from January to December of the previous year.");

    console.log("Test Specific Month Navigation: Passed");
}

// Test that specific task dates are marked
function testSpecificTaskDays() {
    const calendar = new Calendar();

    const tasks = [
        { date: "2024-02-14", title: "Valentine's Day Task" },
        { date: "2024-12-25", title: "Christmas Task" }
    ];
    calendar.loadTasks(tasks);

    // Render February 2024 and check if February 14th is marked
    calendar.date = new Date(2024, 1); // February 2024
    calendar.renderCalendar();

    const calendarDaysElement = document.getElementById('calendarDays');
    const valentineDay = Array.from(calendarDaysElement.children).find(day => day.dataset.date === "2024-02-14");
    assert(valentineDay && valentineDay.classList.contains("task-day"), "Valentine's Day should be marked as a task day.");

    // Render December 2024 and check if December 25th is marked
    calendar.date = new Date(2024, 11); // December 2024
    calendar.renderCalendar();

    const christmasDay = Array.from(calendarDaysElement.children).find(day => day.dataset.date === "2024-12-25");
    assert(christmasDay && christmasDay.classList.contains("task-day"), "Christmas should be marked as a task day.");

    console.log("Test Specific Task Days: Passed");
}



