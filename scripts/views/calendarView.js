class Calendar {
    constructor() {
        this.date = new Date();       // Current date (used for determining the month and year)
        this.tasks = [];              // Array to store task objects
    }

    // Method to load tasks into the calendar
    loadTasks(tasks) {
        this.tasks = tasks;
    }

    // Method to render the calendar for the current month
    renderCalendar() {
        const monthNameElement = document.getElementById('monthName');
        const calendarDaysElement = document.getElementById('calendarDays');
        
        const currentMonth = this.date.getMonth();
        const currentYear = this.date.getFullYear();

        monthNameElement.innerText = this.date.toLocaleString('default', { month: 'long', year: 'numeric' });

        // Clear the calendar days
        calendarDaysElement.innerHTML = '';

        // Get the first and last day of the current month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Fill in previous month's trailing days if needed
        for (let i = 0; i < firstDay; i++) {
            calendarDaysElement.innerHTML += `<div class="day empty"></div>`;
        }

        // Fill in the current month's days
        for (let day = 1; day <= lastDate; day++) {
            const fullDate = this.formatDate(currentYear, currentMonth + 1, day);
            const today = new Date();
            let classes = "day";

            // Check if this day has tasks
            if (this.hasTaskOnDate(fullDate)) {
                classes += " task-day";
            }

            // Highlight current day
            if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate()) {
                classes += " current-day";
            }

            calendarDaysElement.innerHTML += `<div class="${classes}" data-date="${fullDate}">${day}</div>`;
        }
    }

    // Method to navigate to the previous month
    prevMonth() {
        this.date.setMonth(this.date.getMonth() - 1);
        this.renderCalendar();
    }

    // Method to navigate to the next month
    nextMonth() {
        this.date.setMonth(this.date.getMonth() + 1);
        this.renderCalendar();
    }

    // Utility method to check if a task exists on a given date
    hasTaskOnDate(dateString) {
        return this.tasks.some(task => task.deadline === dateString);
    }

    // Utility method to format the date as YYYY-MM-DD (used for task matching)
    formatDate(year, month, day) {
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    /**
    *    Method to highlight the days in the calendar if there are tasks associated with the date.
    *    Should highlight color based on priority
    */
    highlightDay(dateString){
        currentTasks = [];
        return null;
    }

    /**
    *    Method to show the selected day's tasks, if any
    */
    expandDay(dateString){
        if(hasTaskOnDate(dateString))
        {

        }
        return null;
    }
    
    /**
    *    Method to quick add from the calendar view
    *    Returns true if the task was added successfully, false otherwise
    */
    quickAdd(task){
        return true;
    }

    /**
    *    Method to change task from calendar using their title
    *    Returns true if the task was successfully changed, false otherwise
    */
    modifyTask(titleString){
        return false;
    }

    /**
    *    Method to remove task from calendar
    *    Returns the removed task
    */
    removeTask(titleString){
        return null;
    }
}

// Initialize the calendar
const calendar = new Calendar();

// Example tasks for demonstration purposes
const exampleTasks = [
    { id: 1, title: "Submit assignment", deadline: "2024-10-15", priority: 1, isComplete: false },
    { id: 2, title: "Project meeting", deadline: "2024-10-20", priority: 2, isComplete: false },
];

// Load tasks into the calendar
calendar.loadTasks(exampleTasks);

// Render the initial calendar
calendar.renderCalendar();

// Set up navigation buttons
document.getElementById('prevMonth').addEventListener('click', () => calendar.prevMonth());
document.getElementById('nextMonth').addEventListener('click', () => calendar.nextMonth());
