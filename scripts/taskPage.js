
/**
 * Wait for the DOM to load
 */
document.addEventListener('DOMContentLoaded', function() {
    
});

/**
 * Function to display tasks on taskPage.html
 * @param {*} tasks 
 */
function displayTasks(tasks) {
    
}

/**
 * Function to edit a task
 * @param {*} index 
 */
function editTask(index) {
    

    // Refresh task display
    refreshTaskDisplay();
}

/**
 * Function to remove a task
 */
function removeTask(index) {

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
