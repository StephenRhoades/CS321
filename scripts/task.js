/**
 * Declares dynamicTaskArray field. It is created from tasks that have been
 * saved in local storage already.
 */
let dynamicTaskArray = loadTaskInLocalStorage();

submitTask();

import { runTests } from "./tests/taskPageTest.js";

/**
 * Event Listener that loads DOM elements of extension webpage for use.
 */
function submitTask() {
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM fully loaded and parsed: task");
        runTests();

        //import { runTests } from "./tests/taskPageTest.js";
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
    const taskReminder = Number(formData.get('task-rem'));

    const date = taskDate + ' ' + taskTime;
    const reminder = taskReminder * 60 * 1000;
    
    const taskId = await generateTaskId();
    const task = createTask(taskId, taskName, taskDesc, 'None', date, reminder, false, false);

    console.log("Saving task:", task);

    dynamicTaskArray.push(task);
    saveTasksToLocalStorage();

    setAlarm(task);

    form.reset(); 
}

function setAlarm(task){
    chrome.runtime.sendMessage("alarm," + Number(task.id) + "," + task.taskName + "," + Date.parse(task.date) + 
    "," + task.reminder); 
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

