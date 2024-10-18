document.addEventListener('DOMContentLoaded', function() {
    // Run tests after DOM is loaded
    testAddAndDisplayTask();
    testClearTasks();
    testLoadTasksFromLocalStorage();
});

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function testAddAndDisplayTask() {
    // Clear local storage before running the test
    localStorage.clear();
    console.log("Hello");

    // Manually add a task to the array and localStorage
    let testTask = createTask("Test Task", "This is a test task", "General", "2024-11-15", false, false);
    dynamicTaskArray.push(testTask);
    saveTasksToLocalStorage();

    // Simulate the task generation in the task view
    generateTasks();

    // Use a timeout to allow the DOM to update
    
    const taskContainer = document.getElementById('taskContainer');
    const firstTask = taskContainer.querySelector('.task');

    assert(firstTask !== null, "No task found in task container.");

    const taskLabel = firstTask.querySelector('.taskLabel');
    assert(taskLabel !== null, "Task name element not found.");
    //assert(firstTask.textContent.includes("Test Task"), firstTask.textContent)
    //assert(taskLabel.textContent.includes("Test Task"), taskLabel.textContent);
    assert(taskLabel.textContent.includes("Test Task"), "Task name not displayed correctly. Line 36");
        

    const descLabel = firstTask.querySelectorAll('label')[1];
    //assert(descLabel.textContent.includes("This is a test task"), dynamicTaskArray);
    assert(descLabel.textContent.includes("This is a test task"), "Task description not displayed correctly.");

    const dateLabel = firstTask.querySelectorAll('label')[2];
    assert(dateLabel.textContent.includes("2024-11-15"), "Task date not displayed correctly.");

    console.log("Test Add and Display Task: Passed");
    
    
    /*
    setTimeout(() => {
        const taskContainer = document.getElementById('taskContainer');
        const firstTask = taskContainer.querySelector('.task');

        assert(firstTask !== null, "No task found in task container.");

        const taskLabel = firstTask.querySelector('.taskLabel');
        assert(taskLabel !== null, "Task name element not found.");
        //assert(firstTask.textContent.includes("Test Task"), firstTask.textContent)
        //assert(taskLabel.textContent.includes("Test Task"), taskLabel.textContent);
        assert(taskLabel.textContent.includes("Test Task"), "Task name not displayed correctly. Line 36");
        

        const descLabel = firstTask.querySelectorAll('label')[1];
        assert(descLabel.textContent.includes("This is a test task"), "Task description not displayed correctly.");

        const dateLabel = firstTask.querySelectorAll('label')[2];
        assert(dateLabel.textContent.includes("2024-11-15"), "Task date not displayed correctly.");

        console.log("Test Add and Display Task: Passed");
    }, 100);
    */
    
}

function testClearTasks() {
    // Manually add a few tasks to the dynamicTaskArray
    dynamicTaskArray = [
        createTask("Task 1", "Description 1", "None", "2024-12-12", false, false),
        createTask("Task 2", "Description 2", "None", "2024-12-13", false, false)
    ];
    saveTasksToLocalStorage();

    // Simulate displaying tasks
    generateTasks();

    // Now simulate clearing tasks
    clearTasks();  // Correct function to clear the task container

    // Use a timeout to allow the DOM to update

    
    const taskContainer = document.getElementById('taskContainer');
    assert(taskContainer.innerHTML.trim() === '', "Task container should be empty after clearing tasks. Line 88");

    console.log("Test Clear Tasks: Passed");
    

    /*
    setTimeout(() => {
        const taskContainer = document.getElementById('taskContainer');
        assert(taskContainer.innerHTML.trim() === '', "Task container should be empty after clearing tasks. Line 88");

        console.log("Test Clear Tasks: Passed");
    }, 100);  // Adjust delay if necessary
    */
    
}

function testLoadTasksFromLocalStorage() {
    // Clear localStorage before the test
    localStorage.clear();

    // Add a task directly into localStorage
    let taskList = [
        createTask("Loaded Task 1", "Loaded description 1", "None", "2024-10-30", false, false)
    ];
    localStorage.setItem("tasks", JSON.stringify(taskList));

    // Simulate loading tasks from localStorage and displaying them
    dynamicTaskArray = loadTaskInLocalStorage();
    generateTasks();

    // Use a timeout to allow the DOM to update
    setTimeout(() => {
        const taskContainer = document.getElementById('taskContainer');
        const firstTask = taskContainer.querySelector('.task');

        assert(firstTask !== null, "No task found after loading from localStorage.");

        const taskLabel = firstTask.querySelector('.taskLabel');
        assert(taskLabel !== null, "Task name element not found.");
        assert(taskLabel.textContent.includes("Loaded Task 1"), "Loaded task name not displayed correctly. Line 96");

        const dateLabel = firstTask.querySelectorAll('label')[2];  // Assuming third label is the due date
        assert(dateLabel.textContent.includes("2024-10-30"), "Loaded task date not displayed correctly.");
        
        console.log("Test Load Tasks from Local Storage: Passed");
    }, 100);
}

