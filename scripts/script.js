//TO-DO: Get DOM elements. Also figure out how that works.
//TO-DO: Implement Event Listener Functions. Should detect when "add" button confirmation is clicked, and add task in response.
//TO-DO: Implement renderTask function. This can be split into several functions. This should display a calendar view of tasks, and a list view.

// let dynamicTaskArray = new Array; //REMOVE AFTER TESTING. localStorage doesn't work in VS code, only in browser!

console.log("script!");

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submit-task-button')?.addEventListener('click', function(event) {
        addTask(event);
    });

    document.getElementById('show-tasks')?.addEventListener('click', function(event) {
        event.preventDefault();
        generateTasks(dynamicTaskArray.length);
    });

    document.getElementById('clear-tasks')?.addEventListener('click', function(event) {
        event.preventDefault();
        generateTasks(0);
    });
});


let dynamicTaskArray = loadTaskInLocalStorage(); //UNCOMMENT AFTER TESTING

function addTask(event) {
    event.preventDefault();
    const form = document.getElementById('myForm');

    const formData = new FormData(form);
  
    // Access individual form values
    const taskName = formData.get('task-name');
    const taskDesc = formData.get('task-desc'); 
    const taskDate = formData.get('task-date');
    const taskRecur = formData.get('task-recur'); 

    const task = createTask(taskName, taskDesc, 'None', taskDate, false, false);

    // Add the new task to dynamicTaskArray
    dynamicTaskArray.push(task);
    saveTasksToLocalStorage();
    
    form.reset();  // Clear the form after submission
    generateTasks();  // Regenerate the task list after adding the task
}

function saveTasksToLocalStorage() {
    let saveTasks = JSON.stringify(dynamicTaskArray);
    localStorage.setItem('tasks', saveTasks);
}

function loadTaskInLocalStorage() {
    let loadTask = localStorage.getItem('tasks');
    if (loadTask === null) {
        return [];
    } else {
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
    return {
        taskName: taskName,
        taskDescription: taskDescription,
        taskCategory: taskCategory,
        date: new Date(date).toISOString(), // Make sure date is stored in ISO format
        complete: complete,
        recurring: recurring
    };
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

function generateTasks() {
    const taskContainer = document.getElementById('taskContainer');

    // Check if taskContainer exists
    if (!taskContainer) {
        console.error("taskContainer element not found.");
        return;
    }

    // Clear previous tasks
    taskContainer.innerHTML = '';

    // Check if dynamicTaskArray is not empty
    if (dynamicTaskArray.length === 0) {
        const noTasksMessage = document.createElement('p');
        noTasksMessage.textContent = 'No tasks available.';
        taskContainer.appendChild(noTasksMessage);
        return;
    }

    // Loop through dynamicTaskArray and render each task
    dynamicTaskArray.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const taskLabel = document.createElement('label');
        taskLabel.textContent = `Task ${index + 1}: ${task.taskName || 'Unnamed Task'}`;
        taskLabel.className = 'taskLabel';

        const taskDesc = document.createElement('p');
        taskDesc.textContent = `Description: ${task.taskDescription || 'No Description'}`;
        taskDesc.className = 'taskDescription';

        const taskDate = document.createElement('p');
        taskDate.textContent = `Due Date: ${task.date ? new Date(task.date).toLocaleDateString() : 'No Due Date'}`;
        taskDate.className = 'taskDate';

        const taskStatus = document.createElement('p');
        taskStatus.textContent = `Completed: ${task.complete ? 'Yes' : 'No'}`;
        taskStatus.className = 'taskStatus';

        taskDiv.appendChild(taskLabel);
        taskDiv.appendChild(taskDesc);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(taskStatus);

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Task';
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
            generateTasks();  // Refresh task list after deletion
        });
        taskDiv.appendChild(deleteButton);

        taskContainer.appendChild(taskDiv);
    });
}
