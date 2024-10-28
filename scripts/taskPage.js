
/**
 * Similar functionality to addTask() in task.js. Takes filled out
 * fields in form and uses them to modify a task objects.
 */
function submitChanges(event) { //MODIFY to include modify rather than create
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
 * Function that takes a t
 * @param {*} task 
 */
function changeName(taskObject, newName) {
    modifyTask(taskObject, newName, taskObject.taskDescription, taskObject.taskCategory, taskObject.date, taskObject.complete, taskObject.recurring);
}

function changeDecription(taskObject, newDescription) {
    modifyTask(taskObject,taskObject.taskName, newDescription, taskObject.taskCategory, taskObject.date, taskObject.complete, taskObject.recurring);
}

function changeCategory(taskObject, newCategory) {
    modifyTask(taskObject,taskObject.taskName, taskObject.taskDescription, newCategory, taskObject.date, taskObject.complete, taskObject.recurring);
}

function changeDate(taskObject, newDate) {
    modifyTask(taskObject,taskObject.taskName, taskObject.taskDescription, taskObject.taskCategory, newDate, taskObject.complete, taskObject.recurring);
}

function changeComplete(taskObject, newComplete) {
    modifyTask(taskObject,taskObject.taskName, taskObject.taskDescription, taskObject.taskCategory, taskObject.date, newComplete, taskObject.recurring);
}

function changeRecurring(taskObject, newRecurring) {
    modifyTask(taskObject,taskObject.taskName, taskObject.taskDescription, taskObject.taskCategory, taskObject.date, taskObject.complete, newRecurring);
}

let dynamicTaskArray = loadTaskInLocalStorage();

function removeTask(taskObject) {
    const index = dynamicTaskArray.indexOf(taskObject); //may replace this logic using taskID instead.
    if (index > -1) //Splice only when item is found
    {
        dynamicTaskArray.splice(index, 1);
    }
}

function addReminder() {}

function changeReminder() {}

function removeReminder() {}

//function modifyTask(taskObject, taskName, taskDescription, taskCategory, date, complete, recurring)
