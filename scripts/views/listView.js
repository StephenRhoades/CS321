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
    }
});

/**
 * Builds the HTML for task View from local storage and updates taskView.html 
 */
function generateTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';  // Clear previous tasks
    // localStorage.clear();

    // Load tasks from localStorage
    let tasks = loadTaskInLocalStorage();
    
    if (tasks.length === 0) {
        taskContainer.innerHTML = '<p>No tasks available</p>';
        return;
    }

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const taskLabel = document.createElement('label');
        taskLabel.textContent = `Task ${index + 1}: ${task.taskName}`;

        const taskDescription = document.createElement('p');
        taskDescription.textContent = `Description: ${task.taskDescription}`;

        const taskDate = document.createElement('p');
        taskDate.textContent = `Due Date: ${task.date}`;

        const taskComplete = document.createElement('p');
        taskComplete.textContent = `Completed: ${task.complete ? 'Yes' : 'No'}`;

        taskDiv.appendChild(taskLabel);
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
    let sortedTasks = tasks;
    return sortedTasks

}

/**
 * Sort the array of tasks alphabetically
 * @param {*} tasks 
 * @returns {*} The tasks sorted alphabetically
 */
function sortAlpha(tasks) {
    let sortedTasks = tasks;
    return sortedTasks
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
