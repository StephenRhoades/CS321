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


function addTask(event) {
    event.preventDefault();

    // Collect form data
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc'); 
    const taskDate = formData.get('task-date');
    const taskRecur = formData.get('task-recur');
    //REMINDER VALUES
    const taskRem = formData.get('task-rem');

    const task = createTask(taskName, taskDesc, 'None', taskDate, false, taskRecur);

    console.log("Saving task:", task);

    // Add the new task to the task array and save it to localStorage
    dynamicTaskArray.push(task);
    saveTasksToLocalStorage();

    //Creates reminders below
    if(taskRem==="15m"){
        //const offset = getMilliseconds("minutes", 15);
        const offset = getMilliseconds("minutes", 1);
        const reminderTime = new Date(taskDate.getTime-offset);
        addReminder(reminderTime, taskName);
    }
    if(taskRem==="30m"){
        const offset = getMilliseconds("minutes", 30);
        const reminderTime = new Date(taskDate.getTime-offset);
        addReminder(reminderTime);
    }
    if(taskRem==="1h"){
        const offset = getMilliseconds("hours", 1);
        const reminderTime = new Date(taskDate.getTime-offset);
        addReminder(reminderTime);
    }
    if(taskRem==="3h"){
        const offset = getMilliseconds("hours", 3);
        const reminderTime = new Date(taskDate.getTime-offset);
        addReminder(reminderTime);
    }
    if(taskRem==="1d"){
        const offset = getMilliseconds("days", 1);
        const reminderTime = new Date(taskDate.getTime-offset);
        addReminder(reminderTime);
    }

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

function modifyTask(taskObject, taskName, taskDescription, taskCategory, date, complete, recurring){
    taskObject.taskName=taskName;
    taskObject.taskDescription=taskDescription;
    taskObject.taskCategory=taskCategory;
    taskObject.date=date;
    taskObject.complete=complete;
    taskObject.recurring=recurring;
}

function getMilliseconds(unit, quantity) {
    switch (unit) {
      case 'second':
      case 'seconds':
        return quantity * 1000;
      case 'minute':
      case 'minutes':
        return quantity * 60 * 1000;
      case 'hour':
      case 'hours':
        return quantity * 60 * 60 * 1000;
      case 'day':
      case 'days':
        return quantity * 24 * 60 * 60 * 1000;
      case 'year':
      case 'years':
        return quantity * 365 * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
}

//REMINDER FUNCTIONS BELOW

function addReminder(dateObject, taskName) {
    // This function should handle setting alarms and notifications based on the reminderData provided
    chrome.alarms.create('taskAlarm', {
      when: dateObject.time,
    });

    chrome.storage.local.set({ 'reminderText': taskName.text });

    chrome.runtime.sendMessage({ type: 'playAudio' });
}

function changeReminder() {}

function removeReminder() {}
