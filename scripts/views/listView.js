/**
 * listView.js responsible for:
 *  - generating the HTML on 'listView.html' page
 *  - grabbing the tasks from local storage (chrome storage) & building the text for the task
 *  - sorting the tasks from local storage in the way the user wants  
 */

/**
 * Event listener for the buttons on the listView page.
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Check if taskContainer exists (only on list view page)
    const taskContainer = document.getElementById('taskContainer');
    if (taskContainer) {
        console.log("taskContainer found");

        // Attach event listener to show tasks
        document.getElementById('show-tasks')?.addEventListener('click', function(event) {
            event.preventDefault();
            generateTasks();  // Call generateTasks to show stored tasks
        });

        document.getElementById('clear-tasks')?.addEventListener('click', function(event) {
            event.preventDefault();
            clearTasks();
        });

        document.getElementById('sort-deadline')?.addEventListener('click', function(event) {
            event.preventDefault();
            generateTasks('deadline');
        });

        document.getElementById('sort-alpha')?.addEventListener('click', function(event) {
            event.preventDefault();
            generateTasks('alpha');
        });
    }
});

/**
 * Builds the HTML for task View from local storage and updates taskView.html 
 */
function generateTasks(sortType) {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';  // Clear previous tasks

    // Load tasks from localStorage
    let tasks = loadTaskInLocalStorage();
    
    if (tasks.length === 0) {
        taskContainer.innerHTML = '<p>No tasks available</p>';
        return;
    }

    // Sort tasks based on sortType
    if (sortType === 'deadline') {
        tasks = sortDeadline(tasks);
    } else if (sortType === 'alpha') {
        tasks = sortAlpha(tasks);
    }

    tasks.forEach((task) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const taskEdit = document.createElement('a');
        taskEdit.className = 'edit';
        taskEdit.innerHTML = '&#x270E;';
        taskEdit.href = "../../html/pages/taskPage.html"

        const taskLabel = document.createElement('label');
        taskLabel.className = 'name';
        taskLabel.textContent = `Task ${task.id}: ${task.taskName}`;

        const taskDescription = document.createElement('p');
        taskDescription.className = 'description';
        taskDescription.textContent = `Description: ${task.taskDescription}`;

        const taskDate = document.createElement('p');
        taskDate.className = 'date';
        taskDate.textContent = `Due Date: ${task.date}`;

        const taskComplete = document.createElement('p');
        taskComplete.className = 'complete';
        taskComplete.textContent = `Completed: ${task.complete ? 'Yes' : 'No'}`;

        taskDiv.appendChild(taskLabel);
        taskDiv.appendChild(taskEdit);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(taskComplete);

        taskContainer.appendChild(taskDiv);
    });
}

/**
 * Clears the tasks in taskView.html
 */
function clearTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';
}

/**
 * Build the HTML taskDiv given an array of tasks.
 * @param {*} tasks 
 */
function buildTaskDiv(tasks) {
    // tasks.forEach((task, index) => {
    //     // etc.
    // }
}

/**
 * Sort the array of tasks by earliest-deadline-first.
 * @param {*} tasks 
 * @returns {*} The tasks sorted by deadline
 */
function sortDeadline(tasks) {
    return [...tasks].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });
}

/**
 * Sort the array of tasks alphabetically
 * @param {*} tasks 
 * @returns {*} The tasks sorted alphabetically
 */
function sortAlpha(tasks) {
    return [...tasks].sort((a, b) => {
        return a.taskName.localeCompare(b.taskName);
    });
}

/**
 * Sort the array of tasks in the order that the user added them.
 * @param {*} tasks 
 * @returns {*} The tasks sorted by date-added
 */
function sortDateAdded(tasks){
    let sortedTasks = tasks;
    return sortedTasks
}
