/**
 * Declares dynamicTaskArray field. It is created from tasks that have been
 * saved in local storage already.
 */
let dynamicTaskArray = loadTaskInLocalStorage();

submitTask();


/**
 * Declares dynamicTaskArray field. It is created from tasks that have been
 * saved in local storage already.
 */
let dynamicTaskArray = loadTaskInLocalStorage();

//EVENT LISTENERS FUNCTIONS
/**
 * Event Listener that loads DOM elements of extension webpage for use.
 */
function submitTask() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM fully loaded and parsed: task");

        document.getElementById('submit-task-button')?.addEventListener('click', function(event) {
            addTask(event);
        });
    });
}

async function generateTaskId() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['lastTaskId'], (result) => {
          let newId = (result.lastTaskId || 0) + 1;
          chrome.storage.local.set({ 'lastTaskId': newId }, () => {
            console.log("newID " + newId);
            resolve(newId); 
          });
        });
      });
}

async function addTask(event) {



//TASK FUNCTIONS
function addTask(event) {
=======

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

    const taskDate = formData.get('task-date');
    const taskTime = formData.get('task-time');
    const taskRecur = formData.get('task-recur'); 
    const taskReminder = Number(formData.get('task-rem'));

    const date = taskDate + ' ' + taskTime;
    const reminder = taskReminder * 60 * 1000;
    
    const taskId = await generateTaskId();
    const task = createTask(taskId, taskName, taskDesc, 'None', date, reminder, false, false);


    console.log("Saving task:", task);

    dynamicTaskArray.push(task);
    saveTasksToLocalStorage();



    //CREATE REMINDERS
    checkReminder(task, checkedReminders);

    // Form submission or reset
    form.reset();  // This will clear the form after submitting
}


    setAlarm(task);

    form.reset(); 
}

function setAlarm(task){
    chrome.runtime.sendMessage("alarm," + Number(task.id) + "," + task.taskName + "," + Date.parse(task.date) + 
    "," + task.reminder); 
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
 
function clearStorage() {
    localStorage.clear();
    dynamicTaskArray = loadTaskInLocalStorage();
}

function createTask(id, taskName, taskDescription, taskCategory, date, reminder, complete, recurring) {
    return {id, taskName, taskDescription, taskCategory, date, reminder, complete, recurring};
}

function modifyTask(taskObject, taskName, taskDescription, taskCategory, date, complete, recurring){
    taskObject.taskName=taskName;
    taskObject.taskDescription=taskDescription;
    taskObject.taskCategory=taskCategory;
    taskObject.date=date;
    taskObject.complete=complete;
    taskObject.recurring=recurring;

}

