/* All task modifying related functions:
*     - Adding a task
*     - Removing a task
*     - Modifying a task
*     - Sorting tasks (deadline, alphabetical, etc)
*/


document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: task");

    document.getElementById('submit-task-button')?.addEventListener('click', function(event) {
        addTask(event);
    });
});

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

let dynamicTaskArray = loadTaskInLocalStorage();

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(dynamicTaskArray));
}

function loadTaskInLocalStorage() {
    let loadTask = localStorage.getItem("tasks");

    if (loadTask == null) {
        console.log("No tasks found in local storage.");
        return [];
    } else {
        return JSON.parse(loadTask);
    }
}

function createTask(taskName, taskDescription, taskCategory, date, complete, recurring) {
    return {taskName, taskDescription, taskCategory, date, complete, recurring};
}
