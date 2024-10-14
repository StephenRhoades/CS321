document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('show-tasks')?.addEventListener('click', function(event) {
        event.preventDefault();
        generateTasks(script.loadTaskInLocalStorage().length)
    });
    
    document.getElementById('clear-tasks')?.addEventListener('click', function(event) {
        event.preventDefault();
        generateTasks(0)
    });

});

// Generates taskNumber # of tasks 

// progress bar
// category color
function generateTasks(taskNumber) {
    const taskContainer = document.getElementById('taskContainer');

    // clear previous tasks
    taskContainer.innerHTML = '';

    for (let i = 1; i <= taskNumber; i++) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const taskLabel = document.createElement('label');
        taskLabel.textContent = `Example Task ${i}: `;
        taskLabel.className = 'taskLabel';

        const deadline = document.createElement('label');
        deadline.textContent = 'Deadline: ';
        deadline.className = 'taskLabel';
        


        taskDiv.appendChild(taskLabel);
        taskDiv.appendChild(deadline);

        taskContainer.appendChild(taskDiv);

    }
    console.log("Tasks succesfully shown.");
}

