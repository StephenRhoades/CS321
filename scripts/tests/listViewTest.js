document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: listViewTest");
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
    clearStorage();

    //make some tasks
    let testTask1 = createTask(1001, "Test Task 1", "This is a test task", "General", "2024-11-15", false, false);
    let testTask2 = createTask(1002, "Test Task 2", "This is a test task", "General", "2024-11-16", false, false);
    let testTask3 = createTask(1003, "Test Task 3", "This is a test task", "General", "2024-11-17", false, false);
    let testTask4 = createTask(1004, "a", "This is a test task alpha", "General", "2024-11-18", false, false);
    let testTask5 = createTask(1005, "Test Task 5", "This is a test task deadline", "General", "2024-11-10", false, false);

    //Test for empty storage
    generateTasks();
    let taskContainer = document.getElementById('taskContainer');
    assert(taskContainer.innerHTML === '<p>No tasks available</p>', 'Empty tasks not generated properly');

    //Add the tasks now
    dynamicTaskArray.push(testTask1);
    dynamicTaskArray.push(testTask2);
    dynamicTaskArray.push(testTask3);
    dynamicTaskArray.push(testTask4);
    dynamicTaskArray.push(testTask5);

    //save and generate default
    saveTasksToLocalStorage();
    generateTasks();
    
    taskContainer = document.getElementById('taskContainer');
    const firstTask = taskContainer.querySelector('.task');
    assert(firstTask !== null, "No task found in task container.");
    const taskLabel = firstTask.querySelector('.name');
    assert(taskLabel.textContent.includes("Test Task"), "Task name not displayed correctly.");
    const descLabel = firstTask.querySelector('.description');
    assert(descLabel.textContent.includes("This is a test task"), "Task description not displayed correctly.");
    const dateLabel = firstTask.querySelector('.date');
    assert(dateLabel.textContent.includes("2024-11-15"), "Task date not displayed correctly.");

    //generate alphabetically
    generateTasks('alpha');

    taskContainer = document.getElementById('taskContainer');
    const alphaTask = taskContainer.querySelector('.task');
    assert(alphaTask !== null, "Alphabetical: No task found in task container.");
    const alphaLabel = alphaTask.querySelector('.name');
    assert(alphaLabel.textContent.includes("a"), "Alphabetical: Tasks not sorted correctly.");
    const alphadescLabel = alphaTask.querySelector('.description');
    assert(alphadescLabel.textContent.includes("This is a test task alpha"), "Alphabetical: Task description not displayed correctly.");
    const alphadateLabel = alphaTask.querySelector('.date');
    assert(alphadateLabel.textContent.includes("2024-11-18"), "Alphabetical: Task date not displayed correctly.");

    //Generate by deadline
    generateTasks('deadline');

    taskContainer = document.getElementById('taskContainer');
    const deadTask = taskContainer.querySelector('.task');
    assert(deadTask !== null, "Alphabetical: No task found in task container.");
    const deadLabel = deadTask.querySelector('.name');
    assert(deadLabel.textContent.includes("Test Task 5"), "Deadline: Tasks not sorted correctly");

    console.log("Test Add and Display Task: Passed");
}

function testClearTasks() {
    clearStorage();

    dynamicTaskArray = [
        createTask(1111, "Task 1", "Description 1", "None", "2024-12-12", false, false),
        createTask(2222, "Task 2", "Description 2", "None", "2024-12-13", false, false)
    ];
    saveTasksToLocalStorage();

    generateTasks();

    clearTasks(); 
    
    const taskContainer = document.getElementById('taskContainer');
    assert(taskContainer.innerHTML.trim() === '', "Task container should be empty after clearing tasks.");

    console.log("Test Clear Tasks: Passed");
    
}

function testLoadTasksFromLocalStorage() {
    clearStorage();

    let taskList = [
        createTask(101010, "Loaded Task 1", "Loaded description 1", "None", "2024-10-30", false, false)
    ];
    localStorage.setItem("tasks", JSON.stringify(taskList));

    dynamicTaskArray = loadTaskInLocalStorage();
    generateTasks();

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