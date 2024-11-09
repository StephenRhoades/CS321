document.addEventListener('DOMContentLoaded', function() {
    class Calendar {
        constructor() {
            this.date = new Date();       // Current date (used for determining the month and year)
            this.tasks = [];              // Array to store task objects
            this.activeModal = null;      // Track the currently active modal
        }

        /**
        *   Method to load tasks into the calendar
        *   @param {Task} tasks is an array of task with json formatted information
        */
        loadTasks(tasks) {
            this.tasks = tasks;
        }

        /**
        *   Method to render the calendar for the current month
        */
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
                const tasksForDay = this.getTasksOnDate(fullDate);

                // Check if this day has tasks
                if (tasksForDay.length > 0) {
                    classes += " task-day";
                }

                // Highlight current day
                if (currentYear === today.getFullYear() && currentMonth === today.getMonth() && day === today.getDate()) {
                    classes += " current-day";
                }

                calendarDaysElement.innerHTML += `
                    <div class="${classes}" data-date="${fullDate}">
                        ${day}
                        ${tasksForDay.length > 1 ? `<div class="task-indicator">${tasksForDay.length}</div>` : ''}
                    </div>`;
            }
            // Add click event listeners to day elements
            document.querySelectorAll('.day').forEach(dayElement => {
                dayElement.addEventListener('click', () => {
                    const dateString = dayElement.getAttribute('data-date');
                    if (dateString) {
                        this.clearExistingModal(); // Ensure only one modal is shown at a time
                        this.expandDay(dateString);
                    }
                });
            });
        }

        /**
        *   Method to navigate to the previous month
        */
        prevMonth() {
            this.date.setMonth(this.date.getMonth() - 1);
            this.clearExistingModal();
            this.renderCalendar();
        }

        /**
        *   Method to navigate to the next month
        */
        nextMonth() {
            this.date.setMonth(this.date.getMonth() + 1);
            this.clearExistingModal();
            this.renderCalendar();
        }

        /** 
        *   Utility method to check if a task exists on a given date
        *   @param {String} dateString is the associated date to check
        *   @return true if there is a task on the given date, false otherwise
        */
        hasTaskOnDate(dateString) {
            return this.tasks.some(task => task.date.split(' ')[0] === dateString);
        }

        /**
        *   Utility method to format the date as YYYY-MM-DD (used for task matching)
        *   @param {int} year is the 4 digit number for the selected year
        *   @param {String} month is the month
        *   @param {int} day is the day selected which should be limited to 1-31 but also checked based on the month (February only has 1-28 or 1-29)
        *   @return a string that has a standardized date formatting
        */
        formatDate(year, month, day) {
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
        
        /**
        *   Method to highlight the days in the calendar if there are tasks associated with the date.
        *   Should highlight color based on priority
        *   @param {String} dateString which is the selected day.
        */
        highlightDay(dateString) {
            currentTasks = [];
        }

        /**
        *   Method to show the selected day's tasks, if any
        *   Will link with html to get a task view to select a specific task on the day
        *   The selected task should be able to be modified, removed, or just viewed in more detail
        *   @param {String} dateString which is the selected day
        */
        expandDay(dateString) {
            if (this.hasTaskOnDate(dateString)) {
                const tasksForDay = this.getTasksOnDate(dateString);
                const taskList = tasksForDay.map(task => {
                    const timeDisplay = task.time ? task.time : '';
                    return `<li><strong>${timeDisplay ? timeDisplay + ' - ' : ''}${task.taskName}</strong><br>${task.taskDescription}</li>`;
                }).join('');
                this.showTaskModal(dateString, taskList);
            } else {
                alert('No tasks for this day.');
            }
        }

        /**
        *   Method to display tasks in a modal
        *   @param {String} date - The selected date
        *   @param {String} taskList - The list of tasks in HTML format
        */
        showTaskModal(date, taskList) {
            const modalContent = `
                <div class="modal">
                    <h3>Tasks for ${date}</h3>
                    <ul>${taskList}</ul>
                    <button id="closeModal">Close</button>
                </div>`;
            document.body.insertAdjacentHTML('beforeend', modalContent);
            this.activeModal = document.querySelector('.modal');

            document.getElementById('closeModal').addEventListener('click', () => {
                this.clearExistingModal();
            });
        }

        /**
        * Method to clear any existing modals to ensure only one is shown at a time
        */
        clearExistingModal() {
            if (this.activeModal) {
                this.activeModal.remove();
                this.activeModal = null;
            }
        }

        /**
        * Utility method to get tasks on a specific date
        * @param {String} dateString - The date to check
        * @return {Array} - List of tasks on that date
        */
        getTasksOnDate(dateString) {
            return this.tasks.filter(task => task.date === dateString);
        }
    }

    // Initialize the calendar
    const calendar = new Calendar();

    // Example tasks for demonstration purposes
    const exampleTasks = loadTaskInLocalStorage(); 
    
    // Load tasks into the calendar
    calendar.loadTasks(exampleTasks);

    // Render the initial calendar
    calendar.renderCalendar();

    // Set up navigation buttons
    document.getElementById('prevMonth').addEventListener('click', () => calendar.prevMonth());
    document.getElementById('nextMonth').addEventListener('click', () => calendar.nextMonth());
});
