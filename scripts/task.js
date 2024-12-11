/**
 * Declares dynamicTaskArray field. It is created from tasks that have been
 * saved in local storage already.
 */
let dynamicTaskArray = loadTaskInLocalStorage();
let intervalID = [];

submitTask();

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

    event.preventDefault();

    // Collect form data
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc'); 
    const taskDate = formData.get('task-date');
    const taskTime = formData.get('task-time');
    const taskRecur = formData.get('task-recur'); 
    const taskReminderDays = formData.get('days');
    const taskReminderHours = formData.get('hours');
    const taskReminderMinutes = formData.get('minutes');

    /*CHANGE HERE */
    const checkboxes = document.querySelectorAll('#task-recur input[type="checkbox"]');
    const selectedWeekdays = [];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedWeekdays.push(weekdays[index]);
        }
    });

      console.log(selectedWeekdays);


    /**CHANGE HERE */
    console.log("days: " + taskReminderDays);
    console.log("hours: " + taskReminderHours);
    console.log("minutes " + taskReminderMinutes);
    
    const date = taskDate + ' ' + taskTime;
    const reminder = taskReminderDays * 24 * 60 * 60 * 1000 + taskReminderHours * 60 * 60 * 1000 + taskReminderMinutes * 60 * 1000;

    const taskId = await generateTaskId();
    //const isRecurring;
    
    if(selectedWeekdays.length==0) //No recurring days selected
    {
        const isRecurring=false;
    }
    else
    {
        const isRecurring=true;
    }

    
    const task = createTask(taskId, taskName, taskDesc, 'None', date, reminder, false, isRecurring);
    //addRecurring(selectedWeekdays, task);

    console.log("Saving task:", task);

    dynamicTaskArray.push(task);
    addRecurring(selectedWeekdays, task);
    saveTasksToLocalStorage();
    
    if (reminder != 0) {
        setAlarm(task, reminder);
    }

    form.reset(); 
}


async function addRecurring(selectedWeekdays, task)
{
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let currentDate= new Date();
    let endDate= new Date(Date.parse(task.date));
    

    if(selectedWeekdays.includes(weekdays[0]))
    {
        /**Find Next Selected Weekday */
        while (currentDate.getDay() !== 0) { // 2 represents Tuesday in JavaScript Date object
            currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
        }
        /**Add new task every weekday*/
        while (currentDate.getTime() <= endDate.getTime()) {
            /**Get new task ID */
            const newTaskId = await generateTaskId();
            // Create a new task object
            const newTask = createTask(newTaskId, task.taskName, task.taskDescription, task.taskCategory, currentDate.toString(), task.reminderList, task.complete, task.recurring);
            //return {id, taskName, taskDescription, taskCategory, date, reminderList, complete, recurring};
        
            dynamicTaskArray.push(newTask); // Add the task to the list
            saveTasksToLocalStorage();
        
            // Increment by 7 days (next weekday)
            currentDate.setDate(currentDate.getDate() + 7);
        }
    }
    if(selectedWeekdays.includes(weekdays[1]))
    {
        /**Find Next Selected Weekday */
        while (currentDate.getDay() !== 1) { // 2 represents Tuesday in JavaScript Date object
            currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
        }
        /**Add new task every weekday*/
        while (currentDate.getTime() <= endDate.getTime()) {
            /**Get new task ID */
            const newTaskId = await generateTaskId();
            // Create a new task object
            const newTask = createTask(newTaskId, task.taskName, task.taskDescription, task.taskCategory, currentDate.toString(), task.reminderList, task.complete, task.recurring);
            //return {id, taskName, taskDescription, taskCategory, date, reminderList, complete, recurring};
        
            dynamicTaskArray.push(newTask); // Add the task to the list
            saveTasksToLocalStorage();
        
            // Increment by 7 days (next weekday)
            currentDate.setDate(currentDate.getDate() + 7);
        }
    }
    if(selectedWeekdays.includes(weekdays[2]))
    {
        /**Find Next Selected Weekday */
        while (currentDate.getDay() !== 2) { // 2 represents Tuesday in JavaScript Date object
            currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
        }
        /**Add new task every weekday*/
        while (currentDate.getTime() <= endDate.getTime()) {
            /**Get new task ID */
            const newTaskId = await generateTaskId();
            // Create a new task object
            const newTask = createTask(newTaskId, task.taskName, task.taskDescription, task.taskCategory, currentDate.toString(), task.reminderList, task.complete, task.recurring);
            //return {id, taskName, taskDescription, taskCategory, date, reminderList, complete, recurring};
        
            dynamicTaskArray.push(newTask); // Add the task to the list
            saveTasksToLocalStorage();
        
            // Increment by 7 days (next weekday)
            currentDate.setDate(currentDate.getDate() + 7);
        }
    }
    if(selectedWeekdays.includes(weekdays[3]))
    {
        /**Find Next Selected Weekday */
        while (currentDate.getDay() !== 3) { // 2 represents Tuesday in JavaScript Date object
            currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
        }
        /**Add new task every weekday*/
        while (currentDate.getTime() <= endDate.getTime()) {
            /**Get new task ID */
            const newTaskId = await generateTaskId();
            // Create a new task object
            const newTask = createTask(newTaskId, task.taskName, task.taskDescription, task.taskCategory, currentDate.toString(), task.reminderList, task.complete, task.recurring);
            //return {id, taskName, taskDescription, taskCategory, date, reminderList, complete, recurring};
        
            dynamicTaskArray.push(newTask); // Add the task to the list
            saveTasksToLocalStorage();
        
            // Increment by 7 days (next weekday)
            currentDate.setDate(currentDate.getDate() + 7);
        }       
    }
    if(selectedWeekdays.includes(weekdays[4]))
    {
        /**Find Next Selected Weekday */
        while (currentDate.getDay() !== 4) { // 2 represents Tuesday in JavaScript Date object
            currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
        }
        /**Add new task every weekday*/
        while (currentDate.getTime() <= endDate.getTime()) {
            /**Get new task ID */
            const newTaskId = await generateTaskId();
            // Create a new task object
            const newTask = createTask(newTaskId, task.taskName, task.taskDescription, task.taskCategory, currentDate.toString(), task.reminderList, task.complete, task.recurring);
            //return {id, taskName, taskDescription, taskCategory, date, reminderList, complete, recurring};
        
            dynamicTaskArray.push(newTask); // Add the task to the list
            saveTasksToLocalStorage();
        
            // Increment by 7 days (next weekday)
            currentDate.setDate(currentDate.getDate() + 7);
        }                   
    }
    if(selectedWeekdays.includes(weekdays[5]))
    {
        /**Find Next Selected Weekday */
        while (currentDate.getDay() !== 5) { // 2 represents Tuesday in JavaScript Date object
            currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
        }
        /**Add new task every weekday*/
        while (currentDate.getTime() <= endDate.getTime()) {
            /**Get new task ID */
            const newTaskId = await generateTaskId();
            // Create a new task object
            const newTask = createTask(newTaskId, task.taskName, task.taskDescription, task.taskCategory, currentDate.toString(), task.reminderList, task.complete, task.recurring);
            //return {id, taskName, taskDescription, taskCategory, date, reminderList, complete, recurring};
        
            dynamicTaskArray.push(newTask); // Add the task to the list
            saveTasksToLocalStorage();
        
            // Increment by 7 days (next weekday)
            currentDate.setDate(currentDate.getDate() + 7);
        }
    }
    if(selectedWeekdays.includes(weekdays[6]))
    {
        /**Find Next Selected Weekday */
        while (currentDate.getDay() !== 6) { // 2 represents Tuesday in JavaScript Date object
            currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
        }
        /**Add new task every weekday*/
        while (currentDate.getTime() <= endDate.getTime()) {
            /**Get new task ID */
            const newTaskId = await generateTaskId();
            // Create a new task object
            const newTask = createTask(newTaskId, task.taskName, task.taskDescription, task.taskCategory, currentDate.toString(), task.reminderList, task.complete, task.recurring);
            //return {id, taskName, taskDescription, taskCategory, date, reminderList, complete, recurring};
        
            dynamicTaskArray.push(newTask); // Add the task to the list
            saveTasksToLocalStorage();
        
            // Increment by 7 days (next weekday)
            currentDate.setDate(currentDate.getDate() + 7);
        }            
    }
}

function createRecurrObject(id, recurInterval) {
    return {id, recurInterval};
}

function pushTask(task, timeDifference)
{
    const current = task.getTime();
    task.date.setDate(current)
    dynamicTaskArray.push(task);
}

function calculateNextOccurrence(weekday, date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    // Parse the task date and time into a JavaScript Date object
    const taskDateTime = Date.parse(date);
    
    // Get the current day and target weekday index
    const currentDay = new Date().getDay();
    const targetDay = weekdays.indexOf(weekday);

    // Calculate the difference in days
    let daysUntilTarget = targetDay - currentDay;
    if (daysUntilTarget <= 0) {
        daysUntilTarget += 7; // Next week if the target day is in the past this week
    }

    // Set the next target date
    const nextTargetDate = new Date(taskDateTime);
    nextTargetDate.setDate(nextTargetDate.getDate() + daysUntilTarget);
    
    // Return the calculated date in ISO string format (you can adjust this to your preferred format)
    return nextTargetDate;
}

function setAlarm(task, reminder){
    chrome.runtime.sendMessage({
        command: 'alarm',
        id: Number(task.id),
        name: task.taskName,
        date:  Date.parse(task.date),
        timeBefore: reminder,
    }, 
    (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error sending message:", chrome.runtime.lastError.message);
        } else if (response?.status === 'received') {
            console.log("Message successfully received by background.");
        } else {
            console.error("Unexpected response:", response);
        }
    });    
}

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

function clearStorage() {
    localStorage.clear();
    dynamicTaskArray = loadTaskInLocalStorage();
}

function createTask(id, taskName, taskDescription, taskCategory, date, reminder, complete, recurring) {
    const reminderList =[];
    if (reminder != 0) {
        reminderList.push(reminder); 
    }
    return {id, taskName, taskDescription, taskCategory, date, reminderList, complete, recurring};
}

function modifyTask(taskObject, taskName, taskDescription, taskCategory, date, complete, recurring){
    taskObject.taskName=taskName;
    taskObject.taskDescription=taskDescription;
    taskObject.taskCategory=taskCategory;
    taskObject.date=date;
    taskObject.complete=complete;
    taskObject.recurring=recurring;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'removeReminder') {
      const reminderId = message.reminderId;
  
      // Call a function to remove the reminder from reminderList
      removeReminderFromList(reminderId);
  
      // Send a response back if needed
      sendResponse({ status: 'success', message: `Reminder ${reminderId} removed.` });
    }
  });

function removeReminderFromList(reminderId) {
    const taskName = reminderId.substring(reminderId.indexOf('_') + 1, reminderId.lastIndexOf('_'));
    const task = dynamicTaskArray.find(task => task.taskName === taskName);
    const timeBefore = Number(reminderId.substring(reminderId.lastIndexOf('_') + 1));
    const index = task.reminderList.findIndex(reminder => reminder === timeBefore);
    task.reminderList.splice(index, 1);
    saveTasksToLocalStorage();
}

