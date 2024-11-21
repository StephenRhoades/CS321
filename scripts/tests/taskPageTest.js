document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: taskPage test");
    runTests();
});



// Sample mock task for testing
const mockTask = createTask(
    0,                  // id
    'Sample Task',      // taskName
    'This is a sample task description', // taskDescription
    'Work',             // taskCategory
    Date(),       // date
    false,              // complete (initially incomplete)
    true                // recurring (whether the task is recurring or not)
);

// Sample mock task for testing
const mockTask2 = createTask(
    1,                  // id
    'Sample Task2',      // taskName
    'This is a sample task description', // taskDescription
    'Work',             // taskCategory
    Date(),       // date
    false,              // complete (initially incomplete)
    true                // recurring (whether the task is recurring or not)
);

// Sample mock task for testing
const mockTask3 = createTask(
    1,                  // id
    'Sample Task3',      // taskName
    'This is a sample task description', // taskDescription
    'Work',             // taskCategory
    Date(),       // date
    false,              // complete (initially incomplete)
    true                // recurring (whether the task is recurring or not)
);

// Utility function for comparing values
function assertEquals(expected, actual, message) {
    if (expected === actual) {
        console.log(`PASS: ${message}`);
    } else {
        console.log(`FAIL: ${message} (Expected: ${expected}, Actual: ${actual})`);
    }
}

function assertTrue(actual, message) {
    if (actual === true) {
        console.log(`PASS`);
    } else {
        console.log(`FAIL: ${message}`);
    }
}

function assertFalse(actual, message) {
    if (actual === false) {
        console.log(`PASS: ${message}`);
    } else {
        console.log(`FAIL: ${message}`);
    }
}

// Run all tests
function runTests() {
    console.log("Running taskPage.js Tests...\n");

    testModifyTask();
    testChangeName();
    testChangeDescription();
    testChangeCategory();
    testChangeDate();
    testChangeComplete();
    testChangeRecurring();
    testRemoveTask();
    testRemoveTaskIndex();
    testRemoveTaskIndexInvalid();
    testRemoveTaskNotFound();

    console.log("\n taskPage.js Tests completed.");
}

//Test modifyTask function
function testModifyTask()
{
    console.log("Running test: modifyTask");
    const testDate = Date('2024-11-15');
    modifyTask(mockTask3, 'taskTestModify', "Modify description text", "taskPage Test", testDate, true, false);

    assertTrue(mockTask3.taskName === 'taskTestModify', "Task Name should be modified");
    assertTrue(mockTask3.taskDescription === 'Modify description text', "Task Description should be modified");
    assertTrue(mockTask3.taskCategory === 'taskPage Test', "Task Category should be modified");
    assertTrue(mockTask3.date === testDate, "Task Date should be modified");
    assertTrue(mockTask3.complete === true, "Task Reminder should be modified");
    assertTrue(mockTask3.recurring === false, "Task Recurring should be modified to false");
    
}

// Test changeName function
function testChangeName() {
    console.log("Running test: changeName");
    changeName(mockTask, 'New Task Name');
    assertTrue(mockTask.taskName === 'New Task Name', "changeName should update taskName");
}

// Test changeDescription function
function testChangeDescription() {
    console.log("Running test: changeDescription");
    changeDecription(mockTask, 'New Task Description');
    assertTrue(mockTask.taskDescription === 'New Task Description', "changeDecription should update taskDescription");
}

// Test changeCategory function
function testChangeCategory() {
    console.log("Running test: changeCategory");
    changeCategory(mockTask, 'New Category');
    assertTrue(mockTask.taskCategory === 'New Category', "changeCategory should update taskCategory");
}

// Test changeDate function
function testChangeDate() {
    console.log("Running test: changeDate");
    changeDate(mockTask, '2025-01-01');
    assertTrue(mockTask.date === '2025-01-01', "changeDate should update date");
}

// Test changeComplete function
function testChangeComplete() {
    console.log("Running test: changeComplete");
    changeComplete(mockTask, true);
    assertTrue(mockTask.complete === true, "changeComplete should update complete status");
}

// Test changeRecurring function
function testChangeRecurring() {
    console.log("Running test: changeRecurring");
    changeRecurring(mockTask, true);
    assertTrue(mockTask.recurring === true, "changeRecurring should update recurring status");
}

// Test removeTask function
function testRemoveTask() {
    console.log("Running test: removeTask");
    setupTestForRemoval();
    removeTask(mockTask);
    saveTasksToLocalStorage();
    loadTaskInLocalStorage();
    assertTrue(dynamicTaskArray.length === 0, "removeTask should remove the task");
}

// Test removeTaskIndex function
function testRemoveTaskIndex() {
    console.log("Running test: removeTaskIndex");
    setupTestForRemoval();
    removeTaskIndex(0);
    saveTasksToLocalStorage();
    loadTaskInLocalStorage();
    assertTrue(dynamicTaskArray.length === 0, "removeTaskIndex should remove task at index");
}

// Test removeTaskIndex - invalid index branch
function testRemoveTaskIndexInvalid() {
    console.log("Running test: removeTaskIndexInvalid");
    setupTestForRemoval();
    dynamicTaskArray.push(mockTask);
    console.log('Initial tasks before invalid index removal:', dynamicTaskArray);
    removeTaskIndex(5); // Invalid index
    saveTasksToLocalStorage();
    loadTaskInLocalStorage();
    assertTrue(dynamicTaskArray.length === 1, "removeTaskIndex should not remove task with invalid index");
}

// Test removeTask - task object not found branch
function testRemoveTaskNotFound() {
    console.log("Running test: removeTaskNotFound");
    setupTestForRemoval();
    dynamicTaskArray.push(mockTask);
    console.log('Initial tasks before invalid index removal:', dynamicTaskArray);
    removeTask(mockTask2); // Invalid task object
    saveTasksToLocalStorage();
    loadTaskInLocalStorage();
    assertTrue(dynamicTaskArray.length === 1, "removeTask should not remove task with invalid object");
}

// Helper function to set up the test state
function setupTestForRemoval() {
    loadTaskInLocalStorage();
    dynamicTaskArray.length=0;
}

