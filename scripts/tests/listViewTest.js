document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: listViewTest");
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
    clearStorage();
    console.log("Hello");

    // Manually add a task to the array and localStorage
    let testTask = createTask(1001, "Test Task", "This is a test task", "General", "2024-11-15", false, false);
    dynamicTaskArray.push(testTask);
    saveTasksToLocalStorage();

    // Simulate the task generation in the task view
    generateTasks();

    // Use a timeout to allow the DOM to update
    
    const taskContainer = document.getElementById('taskContainer');
    const firstTask = taskContainer.querySelector('.task');

    assert(firstTask !== null, "No task found in task container.");

    const taskLabel = firstTask.querySelector('.name');
    assert(taskLabel.textContent.includes("Test Task"), "Task name not displayed correctly.");
        

    const descLabel = firstTask.querySelector('.description');
    assert(descLabel.textContent.includes("This is a test task"), "Task description not displayed correctly.");

    const dateLabel = firstTask.querySelector('.date');
    assert(dateLabel.textContent.includes("2024-11-15"), "Task date not displayed correctly.");

    console.log("Test Add and Display Task: Passed");
    
}

function testClearTasks() {
    clearStorage();
    // Manually add a few tasks to the dynamicTaskArray
    dynamicTaskArray = [
        createTask(1111, "Task 1", "Description 1", "None", "2024-12-12", false, false),
        createTask(2222, "Task 2", "Description 2", "None", "2024-12-13", false, false)
    ];
    saveTasksToLocalStorage();

    // Simulate displaying tasks
    generateTasks();

    // Now simulate clearing tasks
    clearTasks();  // Correct function to clear the task container

    // Use a timeout to allow the DOM to update

    
    const taskContainer = document.getElementById('taskContainer');
    assert(taskContainer.innerHTML.trim() === '', "Task container should be empty after clearing tasks.");

    console.log("Test Clear Tasks: Passed");
    
}

function testLoadTasksFromLocalStorage() {
    // Clear localStorage before the test
    clearStorage();

    // Add a task directly into localStorage
    let taskList = [
        createTask(101010, "Loaded Task 1", "Loaded description 1", "None", "2024-10-30", false, false)
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

        const taskLabel = firstTask.querySelector('.name');
        assert(taskLabel !== null, "Task name element not found.");
        assert(taskLabel.textContent.includes("Loaded Task 1"), "Loaded task name not displayed correctly.");

        const descriptionLabel = firstTask.querySelector('.description'); 
        assert(descriptionLabel.textContent.includes("Loaded description 1"), "Loaded task description not displayed correctly.");

        const dateLabel = firstTask.querySelector('.date'); 
        assert(dateLabel.textContent.includes("2024-10-30"), "Loaded task date not displayed correctly.");
        
        console.log("Test Load Tasks from Local Storage: Passed");
    }, 100);
}
