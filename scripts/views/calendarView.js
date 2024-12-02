document.addEventListener('DOMContentLoaded', function() {
    class Calendar {
        constructor() {
            this.date = new Date();       // Current date (used for determining the month and year)
            this.tasks = [];              // Array to store task objects
            this.activeModal = null;      // Track the currently active modal
            this.viewMode = 'monthly';    // Default view mode
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

        renderWeeklyView() {
            const calendarDaysElement = document.getElementById('calendarDays');
            calendarDaysElement.innerHTML = '';
        
            const startOfWeek = this.getStartOfWeek(new Date(this.date));
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
        
            const weekDates = Array.from({ length: 7 }, (_, i) => {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                return date;
            });
        
            const weekNameElement = document.getElementById('monthName');
            weekNameElement.innerText = `${startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' })}`;
        
            weekDates.forEach(date => {
                const fullDate = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
                const tasksForDay = this.getTasksOnDate(fullDate);
                let classes = "day weekly-view-day";
                const today = new Date();
        
                // Highlight current day
                if (date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() === today.getDate()) {
                    classes += " current-day";
                }
        
                if (tasksForDay.length > 0) {
                    classes += " task-day";
                }
        
                calendarDaysElement.innerHTML += `
                    <div class="${classes}" data-date="${fullDate}">
                        ${date.getDate()}
                        ${tasksForDay.length > 1 ? `<div class="task-indicator">${tasksForDay.length}</div>` : ''}
                    </div>`;
            });
        
            document.querySelectorAll('.weekly-view-day').forEach(dayElement => {
                dayElement.addEventListener('click', () => {
                    const dateString = dayElement.getAttribute('data-date');
                    if (dateString) {
                        this.clearExistingModal();
                        this.expandDay(dateString);
                    }
                });
            });
        }

        getStartOfWeek(date) {
            const dayIndex = date.getDay();
            const start = new Date(date);
            start.setDate(start.getDate() - dayIndex);
            return start;
        }

        prevMonthOrWeek() {
            if (this.viewMode === 'monthly') {
                this.date.setMonth(this.date.getMonth() - 1);
                this.renderCalendar();
            } else {
                this.date.setDate(this.date.getDate() - 7);
                this.renderWeeklyView();
            }
            this.clearExistingModal();
        }

        nextMonthOrWeek() {
            if (this.viewMode === 'monthly') {
                this.date.setMonth(this.date.getMonth() + 1);
                this.renderCalendar();
            } else {
                this.date.setDate(this.date.getDate() + 7);
                this.renderWeeklyView();
            }
            this.clearExistingModal();
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
                const tasksForDay = this.getTasksOnDate(dateString).sort((a, b) => new Date(a.date) - new Date(b.date));
                const taskList = tasksForDay.map(task => {
                    const taskDateTime = new Date(task.date);
                    const timeDisplay = taskDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return `
                        <li class="task-item">
                            <div class="task-info">
                                <strong>${timeDisplay ? timeDisplay + ' - ' : ''}${task.taskName}</strong>
                                <p>${task.taskDescription}</p>
                            </div>
                            <div class="task-actions">
                                <a href="../../html/pages/taskPage.html?taskId=${task.id}&source=calendar" class="edit-button">Edit</a>
                                <button class="delete-button" data-task-id="${task.id}">Delete</button>
                            </div>
                        </li>`;
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
            this.clearExistingModal();
            const modalContent = `
                <div class="modal">
                    <div class="modal-header">
                        <h3>Tasks for ${date}</h3>
                        <button id="closeModal" class="close-button">&times;</button>
                    </div>
                    <div class="modal-body">
                        <ul class="task-list">${taskList}</ul>
                    </div>
                </div>`;
            document.body.insertAdjacentHTML('beforeend', modalContent);
            this.activeModal = document.querySelector('.modal');
        
            // Close modal event
            document.getElementById('closeModal').addEventListener('click', () => {
                this.clearExistingModal();
            });
        
            // Add delete functionality
            document.querySelectorAll('.delete-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const taskId = parseInt(event.target.getAttribute('data-task-id'), 10);
                    this.deleteTask(taskId);
                    this.clearExistingModal();
                    this.renderCalendar(); // Refresh calendar view after deletion
                });
            });
        }
        
        /**
         * Deletes a task by ID and updates the task list.
         * @param {number} taskId - ID of the task to delete.
         */
        deleteTask(taskId) {
            const taskIndex = this.tasks.findIndex(task => task.id === taskId);
            const task = dynamicTaskArray.find((task) => task.id === taskId);
        
            if (taskIndex > -1) {
                task.reminderList.forEach((reminder, index) => {
                    chrome.runtime.sendMessage({
                        command: "delete",
                        id: Number(task.id),
                        name: task.taskName,
                        timeBefore: task.reminderList[index],
                    }, 
                    (response) => {
                        if (chrome.runtime.lastError) {
                            console.error("Error sending message:", chrome.runtime.lastError.message);
                        } else if (response?.status === 'received') {
                            console.log("Message successfully received by background.");
                        } else {
                            console.error("Unexpected response:", response);
                        }
                    });
                    
                });
                this.tasks.splice(taskIndex, 1);
                dynamicTaskArray = dynamicTaskArray.filter(task => task.id !== taskId);
                saveTasksToLocalStorage();
                alert('Task deleted successfully!');
            } else {
                alert('Error: Task not found.');
            }
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
            return this.tasks.filter(task => task.date.split(' ')[0] === dateString);
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
    document.getElementById('prevMonth').addEventListener('click', () => calendar.prevMonthOrWeek());
    document.getElementById('nextMonth').addEventListener('click', () => calendar.nextMonthOrWeek());

    const monthlyViewButton = document.getElementById('monthlyViewButton');
    const weeklyViewButton = document.getElementById('weeklyViewButton');

    monthlyViewButton.addEventListener('click', () => {
        calendar.viewMode = 'monthly';
        calendar.renderCalendar();
        monthlyViewButton.classList.add('active');
        weeklyViewButton.classList.remove('active');
    });

    weeklyViewButton.addEventListener('click', () => {
        calendar.viewMode = 'weekly';
        calendar.renderWeeklyView();
        weeklyViewButton.classList.add('active');
        monthlyViewButton.classList.remove('active');
    });
});
