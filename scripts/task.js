let dynamicTaskArray = loadTaskInLocalStorage();

submitTask();

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

function createTask(id, taskName, taskDescription, taskCategory, date, reminder, complete, recurring) {
    return {id, taskName, taskDescription, taskCategory, date, reminder, complete, recurring};
}