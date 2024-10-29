
/**
 * Wait for the DOM to load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Load tasks from localStorage
    const tasks = loadTaskInLocalStorage();
    displayTasks(tasks);
});

/**
 * Function to display tasks on taskPage.html
 * @param {*} tasks 
 */
function displayTasks(tasks) {
    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-item';

        taskElement.innerHTML = `
            <h3>${task.taskName}</h3>
            <p>Description: ${task.taskDescription}</p>
            <p>Category: ${task.taskCategory}</p>
            <p>Due Date: ${task.date}</p>
            <p>Completed: ${task.complete ? 'Yes' : 'No'}</p>
            <p>Recurring: ${task.recurring ? 'Yes' : 'No'}</p>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="removeTask(${index})">Remove</button>
        `;

        taskContainer.appendChild(taskElement);
    });

    document.body.appendChild(taskContainer);
}

/**
 * Function to edit a task
 * @param {*} index 
 */
function editTask(index) {
    // Load tasks from localStorage
    const tasks = loadTaskInLocalStorage();
    const task = tasks[index];

    // Prompt user to edit task details (you may replace these prompts with form inputs if desired)
    const newTaskName = prompt("Edit Task Name:", task.taskName);
    const newTaskDescription = prompt("Edit Task Description:", task.taskDescription);
    const newTaskDate = prompt("Edit Due Date:", task.date);

    // Update task object with new values
    if (newTaskName !== null) task.taskName = newTaskName;
    if (newTaskDescription !== null) task.taskDescription = newTaskDescription;
    if (newTaskDate !== null) task.date = newTaskDate;

    // Save updated tasks array to localStorage
    tasks[index] = task;
    saveTasksToLocalStorage(tasks);

    // Refresh task display
    refreshTaskDisplay();
}

/**
 * Function to remove a task
 */
function removeTask(index) {
    // Load tasks from localStorage
    const tasks = loadTaskInLocalStorage();

    // Remove task from array
    tasks.splice(index, 1);

    // Save updated tasks array to localStorage
    saveTasksToLocalStorage(tasks);

    // Refresh task display
    refreshTaskDisplay();
}

/**
 * Helper function to save tasks to localStorage
 * @param {*} tasks 
 */
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Helper function to refresh task display
 */
function refreshTaskDisplay() {
    // Clear existing task display
    document.body.innerHTML = '';
    // Reload and display updated tasks
    displayTasks(loadTaskInLocalStorage());
}
