


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
