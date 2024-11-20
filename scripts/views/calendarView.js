class Calendar {
    constructor() {
        this.date = new Date(); // Current date
        this.tasks = [];        // Array to store tasks
    }

    // Load tasks into the calendar
    loadTasks(tasks) {
        this.tasks = tasks;
    }

    // Render the calendar for the current month
    renderCalendar() {
        const monthNameElement = document.getElementById("monthName");
        const calendarDaysElement = document.getElementById("calendarDays");

        const currentMonth = this.date.getMonth();
        const currentYear = this.date.getFullYear();

        monthNameElement.innerText = this.date.toLocaleString("default", {
            month: "long",
            year: "numeric",
        });

        // Clear previous calendar days
        calendarDaysElement.innerHTML = "";

        // Get the first day and number of days in the month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add leading empty days
        for (let i = 0; i < firstDay; i++) {
            calendarDaysElement.innerHTML += `<div class="day empty"></div>`;
        }

        // Add days of the month
        for (let day = 1; day <= lastDate; day++) {
            const fullDate = this.formatDate(currentYear, currentMonth + 1, day);
            let classes = "day";

            if (this.hasTaskOnDate(fullDate)) {
                classes += " task-day";
            }

            calendarDaysElement.innerHTML += `<div class="${classes}" data-date="${fullDate}">${day}</div>`;
        }
    }

    // Navigate to the previous month
    prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1);
        this.renderCalendar();
    }

    // Navigate to the next month
    nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1);
        this.renderCalendar();
    }

    // Check if a task exists on a specific date
    hasTaskOnDate(dateString) {
        return this.tasks.some((task) => task.date === dateString);
    }

    // Format date as YYYY-MM-DD
    formatDate(year, month, day) {
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
}

// Export the Calendar class
module.exports = Calendar;
