


/**
 * ATTENTION: TEST FUNCTION ONLY. HTML IMPLEMENTATION PENDING.
 * Takes a taskObject, and once the submit button is pressed modifies the selected task with the filled form field.
 * @param {*} event Mouse click on submit button.
 * @param {*} taskObject Selected task.
 */
function submitModifyTask(event, taskObject) { //UNCOMMENT code once category, complete and recurring html containers are created.
    event.preventDefault();

    // Collect form data
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc'); 
    //const taskCategory = formData.get('task-category');   
    const taskDate = formData.get('task-date');
    //const taskRecurring = formData.get('task-complete'); 
    //const taskComplete = formData.get('task-recurring'); 

    changeName(taskObject, taskName);
    changeDecription(taskObject, taskDesc);
    //changeCategory(taskObject, taskCategory);
    changeDate(taskObject, taskDate);
    //changeComplete(taskObject, taskComplete);
    //changeRecurring(taskObject, taskRecurring);

    console.log("Saving task:", task);

    // Add the new task to the task array and save it to localStorage
    //dynamicTaskArray.push(task);
    saveTasksToLocalStorage();

    // Form submission or reset
    form.reset();  // This will clear the form after submitting. Test the behavior of this.

}

/**
 * ATTENTION: TEST FUNCTION ONLY. HTML IMPLEMENTATION PENDING.
 * Auto-fills task form from a given taskObject. Meant to be called after a user selects a task to modify and before submitModifyTask() is called.
 * @param {*} event Mouse click on selecting task in list or calendar.
 * @param {*} taskObject Selected task.
 */
function fillTaskForm(event, taskObject) {
    event.preventDefault();
    const form = document.getElementById('myForm');
    // Auto-fills form data from existing taskObject
    form.getElementById('task-name').value=taskObject.taskName;
    form.getElementById('task-desc').value=taskObject.taskDescription;
    //form.getElementById('task-category').value=taskObject.taskCategory;
    form.getElementById('task-date').value=taskObject.taskDate;
    //form.getElementById('task-complete').value=taskObject.complete;
    //form.getElementById('task-recurring').value=taskObject.recurring;
    
}


/**
 * Changes the Task Name 
 * @param {*} task 
 */
function changeName(taskObject, newName) {
    modifyTask(taskObject, newName, taskObject.taskDescription, taskObject.taskCategory, taskObject.date, taskObject.complete, taskObject.recurring);
}
/**
 * Changes the taskObject description.
 * @param {*} taskObject taskObject element from a dynamicArray loaded from local storage.
 * @param {*} newDescription New description of task object.
 */
function changeDecription(taskObject, newDescription) {
    modifyTask(taskObject,taskObject.taskName, newDescription, taskObject.taskCategory, taskObject.date, taskObject.complete, taskObject.recurring);
}

/**
 * Changes the taskObject category.
 * @param {*} taskObject taskObject element from a dynamicArray loaded from local storage.
 * @param {*} newCategory New category of task object.
 */
function changeCategory(taskObject, newCategory) {
    modifyTask(taskObject,taskObject.taskName, taskObject.taskDescription, newCategory, taskObject.date, taskObject.complete, taskObject.recurring);
}

/**
 * Changes the taskObject date.
 * @param {*} taskObject taskObject element from a dynamicArray loaded from local storage.
 * @param {*} newDate New date of task object.
 */
function changeDate(taskObject, newDate) {
    modifyTask(taskObject,taskObject.taskName, taskObject.taskDescription, taskObject.taskCategory, newDate, taskObject.complete, taskObject.recurring);
}

/**
 * Changes the taskObject completion status.
 * @param {*} taskObject taskObject element from a dynamicArray loaded from local storage.
 * @param {*} newComplete New completion status of task object. Currently False if not completed, true otherwise.
 */
function changeComplete(taskObject, newComplete) {
    modifyTask(taskObject,taskObject.taskName, taskObject.taskDescription, taskObject.taskCategory, taskObject.date, newComplete, taskObject.recurring);
}

/**
 * Changes the taskObject recurring status.
 * @param {*} taskObject taskObject element from a dynamicArray loaded from local storage.
 * @param {*} newRecurring New recurring of task object.
 */
function changeRecurring(taskObject, newRecurring) {
    modifyTask(taskObject,taskObject.taskName, taskObject.taskDescription, taskObject.taskCategory, taskObject.date, taskObject.complete, newRecurring);
}

//let dynamicTaskArray = loadTaskInLocalStorage();

/**
 * Removes the given taskObject from the dynamicArray and saves the new array to local storage.
 * @param {*} taskObject taskObject element
 */
function removeTask(taskObject) {
    loadTaskInLocalStorage();
    const index = dynamicTaskArray.indexOf(taskObject); //may replace this logic using taskID instead.
    if (index > -1) //Splice only when item is found
    {
        dynamicTaskArray.splice(index, 1);
        saveTasksToLocalStorage();
    }
}

/**
 * Removes the taskObject at the given index. The resulting dynamicArray is saved to local storage.
 * @param {*} index Index of a taskObject in the dynamicArray.
 */
function removeTaskIndex(index) {
    loadTaskInLocalStorage();
    if (index > -1 && index<dynamicTaskArray.length) //Only splice when given valid index
    {
        dynamicTaskArray.splice(index, 1);
        saveTasksToLocalStorage();
    }
}


function addReminder(taskObject) {
    chrome.alarms.create(taskObject.taskName, {
        when: taskObject.taskDate - 900000 //Creates reminder 15 minutes before task due date
    });
}

function changeReminder() {}

function removeReminder() {}

//function modifyTask(taskObject, taskName, taskDescription, taskCategory, date, complete, recurring)



/**
 * Event Listeners for the buttons.
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: task");

    edit_btn = document.getElementById('edit-button-id');
    edit_btn.addEventListener('click', function(event) {
        editTask(edit_btn, event);
    });

    expand_btn = document.getElementById('expand-btn-id');
    expand_btn.addEventListener('click', function(event) {
        toggleDetails(expand_btn, event);
    });
});

/**
 * Toggles the dropdown menu to show the details of the task
 * @param {*} button reference to the button
 */
function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.style.display === "block") {
        details.style.display = "none";
        button.textContent = "Expand";
    } else {
        details.style.display = "block";
        button.textContent = "Collapse";
    }
}


/**
 * Creates the inputs for the user to edit a task
 * @param {*} button 
 */
function editTask(button) {
    const task = button.closest('.task');
    const details = task.querySelector('.task-details');

    // name
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = details.querySelector('p:nth-child(1)').innerText.split(": ")[1];
    nameInput.className = "edit-input";

    // date
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = details.querySelector('p:nth-child(1)').innerText.split(": ")[1];
    dateInput.className = "edit-input";

    // time
    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.value = details.querySelector('p:nth-child(2)').innerText.split(": ")[1];
    timeInput.className = "edit-input";

    // description
    const descInput = document.createElement("textarea");
    descInput.className = "edit-input";
    descInput.value = details.querySelector('p:nth-child(3)').innerText.split(": ")[1];

    // Clear details and add input fields with a Save button
    details.innerHTML = '';
    details.appendChild(nameInput);
    details.appendChild(dateInput);
    details.appendChild(timeInput);
    details.appendChild(descInput);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "save-btn";
    saveButton.onclick = function () {
        saveTask(details, nameInput.value, dateInput.value, timeInput.value, descInput.value, button);
    };

    details.appendChild(saveButton);
    details.style.display = "block";
}

/**
 * 
 * @param {*} details 
 * @param {*} date 
 * @param {*} time 
 * @param {*} description 
 * @param {*} button 
 */
function saveTask(details, taskName, date, time, description, button) {
    // Replace input fields with the updated text
    details.innerHTML = `
        <p><strong>Date:</strong> ${taskName}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Description:</strong> ${description}</p>
    `;
    button.textContent = "Edit";
}