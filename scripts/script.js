
//TO-DO: Get DOM elements. Also figure out how that works.
//TO-DO: Implement Event Listener Functions. Should detect when "add" button confirmation is clicked, and add task in response.
//TO-DO: Implement renderTask function. This can be split into several functions. This should display a calendar view of tasks, and a list view.

let dynamicTaskArray = new Array; //REMOVE AFTER TESTING. localStorage doesn't work in VS code, only in browser!

console.log("script!")

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit-task-button').addEventListener('click', function(event) {
        addTask(event);
    });
});

function addTask(event) {
    event.preventDefault();
    const form = document.getElementById('myForm');

    const formData = new FormData(form);
  
    // Access individual form values
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc'); 
    const taskDate = formData.get('task-date');
    const taskRecur = formData.get('task-recur'); 

    // const taskName = document.getElementById('task-name').value;
    // const taskDesc = document.getElementById('task-desc').value;
    // const taskDate = document.getElementById('task-date').value;
    // const taskRecur = document.getElementById('task-recur').value;

    const task = createTask(taskName, taskDesc, 'None', taskDate, false, taskRecur);

    console.log(task.taskName);
    console.log(task.taskDescription);
    console.log(task.taskCategory);
    console.log(task.date);
    console.log(task.complete);
    console.log(task.recurring);
    
    form.submit();
}

//let dynamicTaskArray = loadTaskInLocalStorage(); //UNCOMMENT AFTER TESTING

/**
 * Function that saves the current list of tasks (implemented as dynamic array) to local storage.
 */
function saveTasksToLocalStorage()
{
    let saveTasks = JSON.stringify(taskArray);
    localStorage.setItem("tasks", updateTasks);
}

/**
 * Function that loads the last saved list of tasks (implemented as dynamic array) from local storage.
 * @returns Dynamic Array containing tasks
 */
function loadTaskInLocalStorage()
{
    let loadTask = localStorage.getItem("tasks"); //"tasks" can be changed. Just keep consistency with saveTasksInLocalStorage().

    if (loadTask==null)
    {
        console.log("Figure out what to do with null task list");
        return new Array; //Not sure if syntax is correct. Test later
    }
    else
    {
        console.log("task list exists");
        return JSON.parse(loadTask);
    }
}


/**
 * Creates Task Object.
 * @param {*} taskName 
 * @param {*} taskDescription 
 * @param {*} taskCategory 
 * @param {*} date 
 * @param {*} complete 
 * @param {*} recurring 
 * @returns 
 */
function createTask(taskName, taskDescription, taskCategory, date, complete, recurring) {
    return {taskName: taskName, taskDescription: taskDescription, taskCategory: taskCategory, date: date, complete: complete, recurring: recurring}
}

/**
 * Function that uses removes the element at given index. Also honestly may change how this works later. Prototype.
 * @param {*} index Index of array element that needs to be erased.
 */
function deleteTask(index)
{
    dynamicTaskArray.splice(index,1);
    saveTasksToLocalStorage();
}

//IGNORE: TESTING CODE BELOW
dynamicTaskArray.push(6);
localStorage.setItem('my-array', JSON.stringify(dynamicTaskArray));
const myArray = JSON.parse(localStorage.getItem('my-array'));
console.log(myArray);

//console.log(dynamicTaskArray);
    
//const poly1 = new Polygon();

const date1 = new Date(2024, 11, 24, 10);
const task = new createTask("Task1", "First task of list", "None", date1, false, false);

console.log(task.taskName)
console.log(task.taskDescription)
console.log(task.taskCategory)
console.log(task.date)
console.log(task.complete)
console.log(task.recurring)
//console.log(date1)
//console.log(poly1.name);
//console.log(`Task Object: ${date1.getDate}`);
