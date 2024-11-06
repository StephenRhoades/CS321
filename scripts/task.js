/* All task modifying related functions:
*     - Adding a task
*     - Removing a task
*     - Modifying a task
*     - Sorting tasks (deadline, alphabetical, etc)
*/

/**
 * Event Listener that loads DOM elements of extension webpage for use.
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: task");

    document.getElementById('submit-task-button')?.addEventListener('click', function(event) {
        addTask(event);
    });
});

/**
 * Adds and saves a task object based off the information filled out in the "add task" webpage form.
 * The function actives whenever the "submit" button on the "add task" webpage is clicked. 
 * @param {*} event A browser event. Mostly likely a click on a "submit" button.
 */
function addTask(event) {
    event.preventDefault();

    // Collect form data
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc'); 
    const taskDate = formData.get('task-date');
    // const taskRecur = formData.get('task-recur'); 

    const task = createTask(taskName, taskDesc, 'None', taskDate, false, false);

    console.log("Saving task:", task);

    // Add the new task to the task array and save it to localStorage
    dynamicTaskArray.push(task);
    saveTasksToLocalStorage();

    // Form submission or reset
    form.reset();  // This will clear the form after submitting
}

/**
 * Declares dynamicTaskArray field. It is created from tasks that have been
 * saved in local storage already.
 */
let dynamicTaskArray = loadTaskInLocalStorage();

/**
 * Function that saves the current dynamic array of tasks into local storage.
 */
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(dynamicTaskArray));
}

/**
 * Function that loads the dynamic array of tasks saved in local storage.
 */
function loadTaskInLocalStorage() {
    
    let loadTask = localStorage.getItem("tasks");

    if (loadTask == null) {
        console.log("No tasks found in local storage.");
        return [];
    } else {
        return JSON.parse(loadTask);
    }
}

/**
 * Function to create a task Object. This will also be used during modify, with any 
 * non-essential parameters being left blank or NULL.
 * @param {*} taskName Name of title of the task (Essential).
 * @param {*} taskDescription Description of the task.
 * @param {*} taskCategory The category or activity label the task falls under.
 * @param {*} date Date Object indicating the deadline the user has to finish the task (Essential).
 * @param {*} complete Whether boolean telling if the task has been completed or not (Essential).
 * @param {*} recurring Boolean indicating if the task is to be repeated added.
 * @returns Task object
 */
function createTask(taskName, taskDescription, taskCategory, date, complete, recurring) {
    return {taskName, taskDescription, taskCategory, date, complete, recurring};
}
