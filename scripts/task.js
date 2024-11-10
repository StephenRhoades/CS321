/* All task modifying related functions:
*     - Adding a task
*     - Removing a task
*     - Modifying a task
*     - Sorting tasks (deadline, alphabetical, etc)
*/


/**
 * Declares dynamicTaskArray field. It is created from tasks that have been
 * saved in local storage already.
 */
let dynamicTaskArray = loadTaskInLocalStorage();

//EVENT LISTENERS FUNCTIONS
/**
 * Event Listener that loads DOM elements of extension webpage for use.
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: task");

    document.getElementById('submit-task-button')?.addEventListener('click', function(event) {
        addTask(event);
    });
});



//TASK FUNCTIONS
function addTask(event) {
    event.preventDefault();

    // Collect form data - MUST ADD category and completed to HTML front-end
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc'); 
    const taskDay = formData.get('task-date');
    const taskHour = formData.get('task-time');
    const uniqueID = createID();

	//PARSE RECURRENCE DAYS
    const checkboxes = document.querySelectorAll('#task-recur input[type="checkbox"]');
    const checkedDays = [];
  
    checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedDays.push(checkbox.value);
    }
    });
    console.log(checkedDays);

    //PARSE REMINDER TIMES
    const checkboxes2 = document.querySelectorAll('#task-rem input[type="checkbox"]');
    const checkedReminders = [];
    
    checkboxes2.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedReminders.push(checkbox.value);
      }
    });
    console.log(checkedReminders);

	//PARSE TIME INFO
	const ms = Date.parse(taskDay +" " + taskHour);
	const taskDate = new Date(ms);	

	
	//DEBUG MESSAGES
	//console.log(taskRecur);
	
	
    const task = createTask(uniqueID, taskName, taskDesc, 'None', taskDate, false, false);

    console.log("Saving task:", task);

    // Add the new task to the task array and save it to localStorage
    dynamicTaskArray.push(task);
    saveTasksToLocalStorage();


    //CREATE REMINDERS
    checkReminder(task, checkedReminders);

    // Form submission or reset
    form.reset();  // This will clear the form after submitting
}


function createTask(uniqueID, taskName, taskDescription, taskCategory, date, complete, recurring) {
    return {uniqueID, taskName, taskDescription, taskCategory, date, complete, recurring};
}

//WE DON'T CHANGE UNIQUE ID
function modifyTask(taskObject, taskName, taskDescription, taskCategory, date, complete, recurring){
    taskObject.taskName=taskName;
    taskObject.taskDescription=taskDescription;
    taskObject.taskCategory=taskCategory;
    taskObject.date=date;
    taskObject.complete=complete;
    taskObject.recurring=recurring;
}


//REMINDER FUNCTIONS BELOW

function checkReminder(taskObject, checkedReminders) {
    // This function should handle setting alarms and notifications based on the reminderData provide
    //Create Reminders Below

    if(checkedReminders.includes("15m")){
        //const offset = getMilliseconds("minutes", 15);
        console.log("Reminder 15 catching");
        const offset = getMilliseconds("minutes", 15);
        //const reminderTime = new Date(taskDate.getTime-offset);
        //const reminderTime = new Date(Date.now()+offset);
        const reminderTime = new Date(Date.now()+offset);
        createReminder(reminderTime, taskObject.taskName);
    }
    if(checkedReminders.includes("30m")){
        const offset = getMilliseconds("minutes", 30);
        const reminderTime = new Date(taskDate.getTime+offset);
        createReminder(reminderTime, taskObject.taskName);
    }
    if(checkedReminders.includes("1h")){
        const offset = getMilliseconds("hours", 1);
        const reminderTime = new Date(taskDate.getTime+offset);
        createReminder(reminderTime, taskObject.taskName);
    }
    if(checkedReminders.includes("3h")){
        const offset = getMilliseconds("hours", 3);
        const reminderTime = new Date(taskDate.getTime+offset);
        createReminder(reminderTime, taskObject.taskName);
    }
    if(checkedReminders.includes("1d")){
        const offset = getMilliseconds("days", 1);
        const reminderTime = new Date(taskDate.getTime+offset);
        createReminder(reminderTime, taskObject.taskName);
    }
    if(checkedReminders.includes("3d")){
        const offset = getMilliseconds("days", 3);
        const reminderTime = new Date(taskDate.getTime+offset);
        createReminder(reminderTime, taskObject.taskName);
    }
    if(checkedReminders.includes("1w")){
        const offset = getMilliseconds("days", 7);
        const reminderTime = new Date(taskDate.getTime+offset);
        createReminder(reminderTime, taskObject.taskName);
    }
    
}

function createReminder(dateObject, taskName){
    chrome.alarms.create(taskName, {
        when: dateObject.getTime(),
      });
      console.log("Alarm for " + taskName + " created");
}

function changeReminder(dateObject, taskName) {
	chrome.alarms.clear(taskName);
	addReminder(dateObject, taskName);
}

function removeReminder(taskName) {
	chrome.alarms.clear(taskName);
}

//HELPER FUNCTION

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

function createID(){
    return Date.now()+Math.random();
}
