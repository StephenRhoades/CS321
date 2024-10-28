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
    taskContainer.innerHTML = '';  // Clear previous tasks
    // localStorage.clear();

    // Load tasks from localStorage
    let tasks = loadTaskInLocalStorage();
    
    if (tasks.length === 0) {
        taskContainer.innerHTML = '<p>No tasks available</p>';
        return;
    }

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const taskLabel = document.createElement('label');
        taskLabel.className = 'name';
        taskLabel.textContent = `Task ${index + 1}: ${task.taskName}`;

        const taskDescription = document.createElement('p');
        taskDescription.className = 'description';
        taskDescription.textContent = `Description: ${task.taskDescription}`;

        const taskDate = document.createElement('p');
        taskDate.className = 'date';
        taskDate.textContent = `Due Date: ${task.date}`;

        const taskComplete = document.createElement('p');
        taskComplete.className = 'complete';
        taskComplete.textContent = `Completed: ${task.complete ? 'Yes' : 'No'}`;

        taskDiv.appendChild(taskLabel);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(taskComplete);

        taskContainer.appendChild(taskDiv);
    });
}


function clearTasks() {
    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = '';
}
