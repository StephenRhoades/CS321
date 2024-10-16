document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    // Check if taskContainer exists (only on list view page)
    const taskContainer = document.getElementById('taskContainer');
    if (taskContainer) {
        console.log("taskContainer found");

        // Attach event listener to show tasks
        document.getElementById('show-tasks')?.addEventListener('click', function(event) {
            event.preventDefault();
            generateTasks();  // Call generateTasks to show stored tasks
        });

        document.getElementById('clear-tasks')?.addEventListener('click', function(event) {
            event.preventDefault();
            clearTasks();
        });
    }
});

function generateTasks() {
    const taskContainer = document.getElementById('taskContainer');

    // Clear previous tasks
    taskContainer.innerHTML = '';

    // Loop through dynamicTaskArray to create task elements
    dynamicTaskArray.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        // Create a label for the task name
        const taskLabel = document.createElement('label');
        taskLabel.textContent = `Task: ${task.taskName}`;
        taskLabel.className = 'taskLabel'; // Ensure this class is set

        // Create a label for the task description
        const descLabel = document.createElement('label');
        descLabel.textContent = `Description: ${task.taskDescription}`;
        
        // Create a label for the task due date
        const dateLabel = document.createElement('label');
        dateLabel.textContent = `Due Date: ${task.date}`;

        // Create a label for the completion status
        const completeLabel = document.createElement('label');
        completeLabel.textContent = `Completed: ${task.complete ? 'Yes' : 'No'}`;

        // Append labels to the taskDiv
        taskDiv.appendChild(taskLabel);
        taskDiv.appendChild(descLabel);
        taskDiv.appendChild(dateLabel);
        taskDiv.appendChild(completeLabel);

        // Append the taskDiv to the taskContainer
        taskContainer.appendChild(taskDiv);
    });

    console.log("Tasks successfully shown.");
}


function loadTaskInLocalStorage() {
    let loadTask = localStorage.getItem("tasks");
    return loadTask ? JSON.parse(loadTask) : [];
}

function clearTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';
}
