document.addEventListener('DOMContentLoaded', initializeOpenView);

function initializeOpenView() {
    setupRecurrenceDropdown();
    setupReminderDropdown();
    clearForm();  // Optional: Clears the form fields on page load
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

function setupReminderDropdown() {
    const checkList = document.getElementById('task-rem');
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
