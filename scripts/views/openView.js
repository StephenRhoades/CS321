document.addEventListener('DOMContentLoaded', initializeOpenView);

function initializeOpenView() {
    setupRecurrenceDropdown();
    clearForm();  // Optional: Clears the form fields on page load
    prefillTaskFromQuery();
}

/**
 * Toggles the visibility of the recurrence dropdown for selecting repeat days.
 */
function setupRecurrenceDropdown() {
    const checkList = document.getElementById('task-recur');
    const anchor = checkList.getElementsByClassName('anchor')[0];

    anchor.onclick = function() {
        checkList.classList.toggle('visible');
    };
}

/**
 * Clears the task form fields on page load to provide a blank state.
 * (Optional: Use if you want the form to reset each time the page loads)
 */
function clearForm() {
    document.getElementById('myForm').reset();
}


function prefillTaskFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const task = params.get("task"); // Get the `task` parameter from the query string
    if (task) {
        const taskNameInput = document.getElementById("task-name"); // Use the actual `id` of the task name input field
        if (taskNameInput) {
            taskNameInput.value = task; // Dynamically set the task name field
        }
    }
}
