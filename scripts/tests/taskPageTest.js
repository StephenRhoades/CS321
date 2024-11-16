/**
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: taskPage test");
    runTests();
});
**/


// Sample mock task for testing
const mockTask = createTask(
    0,                  // id
    'Sample Task',      // taskName
    'This is a sample task description', // taskDescription
    'Work',             // taskCategory
    '2024-11-16',       // date
    '2024-11-15',       // reminder (optional field)
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
        console.log(`PASS: ${message}`);
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

// Test Suite
export function runTests() {
    console.log("Running Tests...\n");

    // Test changeName function
    let changedName = false;
    changeName(mockTask, 'New Task Name');
    assertTrue(mockTask.taskName === 'New Task Name', "changeName should update taskName");

    // Test changeDecription function
    changeDecription(mockTask, 'New Task Description');
    assertTrue(mockTask.taskDescription === 'New Task Description', "changeDecription should update taskDescription");

    // Test changeCategory function
    changeCategory(mockTask, 'New Category');
    assertTrue(mockTask.taskCategory === 'New Category', "changeCategory should update taskCategory");

    // Test changeDate function
    changeDate(mockTask, '2025-01-01');
    assertTrue(mockTask.date === '2025-01-01', "changeDate should update date");

    // Test changeComplete function
    changeComplete(mockTask, true);
    assertTrue(mockTask.complete === true, "changeComplete should update complete status");

    // Test changeRecurring function
    changeRecurring(mockTask, true);
    assertTrue(mockTask.recurring === true, "changeRecurring should update recurring status");

    // Test removeTask function
    let dynamicTaskArray = loadTaskInLocalStorage();
    console.log('Initial tasks:', dynamicTaskArray);
    removeTask(mockTask); // Mock removing the task
    dynamicTaskArray = loadTaskInLocalStorage();
    assertTrue(dynamicTaskArray.length === 0, "removeTask should remove the task");

    // Test removeTaskIndex function
    loadTaskInLocalStorage = () => [mockTask, {taskName: 'Task 2'}]; // Reset tasks for index removal
    dynamicTaskArray = loadTaskInLocalStorage();
    console.log('Initial tasks before index removal:', dynamicTaskArray);
    removeTaskIndex(0); // Mock removing task at index 0
    dynamicTaskArray = loadTaskInLocalStorage();
    assertTrue(dynamicTaskArray.length === 1, "removeTaskIndex should remove task at index");

    // Test invalid index
    loadTaskInLocalStorage = () => [mockTask, {taskName: 'Task 2'}];
    dynamicTaskArray = loadTaskInLocalStorage();
    console.log('Initial tasks before invalid index removal:', dynamicTaskArray);
    removeTaskIndex(5); // Invalid index, nothing should be removed
    dynamicTaskArray = loadTaskInLocalStorage();
    assertTrue(dynamicTaskArray.length === 2, "removeTaskIndex should not remove task with invalid index");

    console.log("\nTests completed.");
}

// Run all tests
    runTests();

