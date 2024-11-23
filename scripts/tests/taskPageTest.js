document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: taskPage test");
    runTests();
});

let date1 = Date('2025-03-25');

// Sample mock task for testing
const mockTask = createTask(
    0,                  // id
    'Sample Task',      // taskName
    'This is a sample task description', // taskDescription
    'Work',             // taskCategory
    '2025-03-25',       // date
    false,      //reminder
    false,              // complete (initially incomplete)
    true                // recurring (whether the task is recurring or not)
);

// Sample mock task for testing
const mockTask2 = createTask(
    1,                  // id
    'Sample Task2',      // taskName
    'This is a sample task description', // taskDescription
    'Work',             // taskCategory
    date1,       // date
    false,      //reminder
    false,              // complete (initially incomplete)
    true                // recurring (whether the task is recurring or not)
);

// Sample mock task for testing
const mockTask3 = createTask(
    2,                  // id
    'Sample Task3',      // taskName
    'This is a sample task description', // taskDescription
    'Work',             // taskCategory
    date1,       // date
    false,      //reminder
    false,              // complete (initially incomplete)
    true                // recurring (whether the task is recurring or not)
);

const mockTask4 = createTask(3, 'Sample Task4', 'This is a sample task description', 'Work', '2025-03-25', false, false, true);

/*
function createTask(id, taskName, taskDescription, taskCategory, date, reminder, complete, recurring) {
    return {id, taskName, taskDescription, taskCategory, date, reminder, complete, recurring};
}
    */

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

function assert(actual, message) {
    if (actual === true) {
        console.log(`PASS`);
        return true;
    } else {
        console.log(`FAIL: ${message}`);
        return false;
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
    testAddReminder();
    testRemoveReminder();
    testfillTaskForm();
    testsubmitModifyTask()
    testChangeFunctions()

    console.log("\n taskPage.js Tests completed.");
}

// Helper function to set up the test state
function setupTestForRemoval() {
    loadTaskInLocalStorage();
    dynamicTaskArray.length=0;
}

//UNIT TESTS BELOW

//Test modifyTask function
function testModifyTask()
{
    console.log("Running test: modifyTask");
    const testDate = Date('2024-11-15');
    modifyTask(mockTask3, 'taskTestModify', "Modify description text", "taskPage Test", testDate, true, false);

    assert(mockTask3.taskName === 'taskTestModify', "Task Name should be modified");
    assert(mockTask3.taskDescription === 'Modify description text', "Task Description should be modified");
    assert(mockTask3.taskCategory === 'taskPage Test', "Task Category should be modified");
    assert(mockTask3.date === testDate, "Task Date should be modified");
    assert(mockTask3.complete === true, "Task Reminder should be modified");
    assert(mockTask3.recurring === false, "Task Recurring should be modified to false");
    
}

// Test changeName function
function testChangeName() {
    console.log("Running test: changeName");
    changeName(mockTask, 'New Task Name');
    assert(mockTask.taskName === 'New Task Name', "changeName should update taskName");
}

// Test changeDescription function
function testChangeDescription() {
    console.log("Running test: changeDescription");
    changeDecription(mockTask, 'New Task Description');
    assert(mockTask.taskDescription === 'New Task Description', "changeDecription should update taskDescription");
}

// Test changeCategory function
function testChangeCategory() {
    console.log("Running test: changeCategory");
    changeCategory(mockTask, 'New Category');
    assert(mockTask.taskCategory === 'New Category', "changeCategory should update taskCategory");
}

// Test changeDate function
function testChangeDate() {
    console.log("Running test: changeDate");
    changeDate(mockTask, '2025-01-01');
    assert(mockTask.date === '2025-01-01', "changeDate should update date");
}

// Test changeComplete function
function testChangeComplete() {
    console.log("Running test: changeComplete");
    changeComplete(mockTask, true);
    assert(mockTask.complete === true, "changeComplete should update complete status");
}

// Test changeRecurring function
function testChangeRecurring() {
    console.log("Running test: changeRecurring");
    changeRecurring(mockTask, true);
    assert(mockTask.recurring === true, "changeRecurring should update recurring status");
}

// Test removeTask function
function testRemoveTask() {
    console.log("Running test: removeTask");
    setupTestForRemoval();
    removeTask(mockTask);
    saveTasksToLocalStorage();
    loadTaskInLocalStorage();
    assert(dynamicTaskArray.length === 0, "removeTask should remove the task");
}

// Test removeTaskIndex function
function testRemoveTaskIndex() {
    console.log("Running test: removeTaskIndex");
    setupTestForRemoval();
    removeTaskIndex(0);
    saveTasksToLocalStorage();
    loadTaskInLocalStorage();
    assert(dynamicTaskArray.length === 0, "removeTaskIndex should remove task at index");
}

// Test removeTaskIndex - invalid index branch
function testRemoveTaskIndexInvalid() {
    console.log("Running test: removeTaskIndexInvalid");
    setupTestForRemoval();
    dynamicTaskArray.push(mockTask);
    //console.log('Initial tasks before invalid index removal:', dynamicTaskArray);
    removeTaskIndex(5); // Invalid index
    saveTasksToLocalStorage();
    loadTaskInLocalStorage();
    assert(dynamicTaskArray.length === 1, "removeTaskIndex should not remove task with invalid index");
}

// Test removeTask - task object not found branch
function testRemoveTaskNotFound() {
    console.log("Running test: removeTaskNotFound");
    setupTestForRemoval();
    dynamicTaskArray.push(mockTask);
    //console.log('Initial tasks before invalid index removal:', dynamicTaskArray);
    removeTask(mockTask2); // Invalid task object
    saveTasksToLocalStorage();
    loadTaskInLocalStorage();
    assert(dynamicTaskArray.length === 1, "removeTask should not remove task with invalid object");
}

//Test addReminder
function testAddReminder()
{
    console.log("Running test: addReminder");

    if(!assert(typeof(reminderArray)!= "undefined", "reminderArray needs to exist!"))
    {
        return;
    }
    reminderArray.length=0;
    addReminder(mockTask4);
    assert(reminderArray[0].name === "Sample Task4", "Reminder not added correctly");
    reminderArray.length=0;
    
}
//Test changeReminder
function testChangeReminder()
{
    console.log("Running test: changeReminder");

    if(!assert(typeof(reminderArray)!= "undefined", "reminderArray needs to exist!"))
    {
        return;
    }

    reminderArray.length=0;
    addReminder(mockTask4);
    
    const beforeWhen = reminderArray[0].when;
    const ms = Date.now().getTime()+900000;
    changeReminder(reminderArray[0], ms);

    assert(reminderArray[0].when === Date.now().getTime()+900000, "Reminder time not changed correctly");
    reminderArray.length=0;

}
//Test removeReminder
function testRemoveReminder()
{
    console.log("Running test: removeReminder");

    if(!assert(typeof(reminderArray)!= "undefined", "reminderArray needs to exist!"))
    {
        return;
    }
    reminderArray.length=0;

    addReminder(mockTask4);
    assert(reminderArray.length === 1, "Reminder not added correctly");
    removeReminder(reminderArray[0]);
    assert(reminderArray.length === 0, "Reminder not removed correctly");
    reminderArray.length=0;
    
}
//Test fillTaskForm

function testfillTaskForm()
{
    console.log("Running test: fillTaskForm");
    if(!assert(document.getElementById('myTaskForm')!=null, "Task Page must exist first!"))
    {
        return;
    }

    fillTaskForm('onclick', mockTask4);

    const form = document.getElementById('myTaskForm');
    assert(form.getElementById('task-name').value===mockTask4.taskName, "Fill Task Form name not done correctly");
    assert(form.getElementById('task-desc').value===mockTask4.taskDescription, "Fill Task Form description not done correctly");
    assert(form.getElementById('task-date').value===mockTask4.date, "Fill Task Form date not done correctly");

    form.getElementById('task-name').innerHTML = '';
    form.getElementById('task-desc').innerHTML = '';
    form.getElementById('task-date').innerHTML = '';

}

//Test submitModifyTask
function testsubmitModifyTask()
{
    console.log("Running test: submitModifyTask");

    if(!assert(document.getElementById('myTaskForm')!=null, "Task Page must exist first!"))
    {
        return;
    }
    const oldName =mockTask4.taskName;
    const oldDescription=mockTask4.taskDescription;
    const oldDate=mockTask4.date;
    const newDate = Date.now();

    form.getElementById('task-name').value="submitModifyTask Name";
    form.getElementById('task-desc').value="submitModifyTask Description";
    form.getElementById('task-date').value=newDate;

    submitModifyTask('onclick', mockTask4);

    assert(mockTask4.taskName==="submitModifyTask Name", "submitModifyTask Name not changed correctly");
    assert(mockTask4.taskDescription==="submitModifyTask Description", "submitModifyTask Description not changed correctly");
    assert(mockTask4.date===newDate, "submitModifyTask Date not changed correctly");

    mockTask4.taskName=oldName;
    mockTask4.taskDescription=oldDescription;
    mockTask4.date=oldDate;
}

//INTEGRATION TESTS
function testChangeFunctions()
{
    console.log("Running test: testChangeFunctions");
    const oldName =mockTask4.taskName;
    const oldDescription=mockTask4.taskDescription;
    const oldCategory =mockTask4.taskCategory;
    const oldDate=mockTask4.date;
    const oldComplete=mockTask4.complete;
    const oldRecurring = mockTask4.recurring;
    const newDate = Date.now();


    changeName(mockTask4,"Integration Test Name");
    changeDecription(mockTask4,"Integration Test Description");
    changeCategory(mockTask4,"Integration Test Category");
    changeDate(mockTask4,newDate);
    changeComplete(mockTask4, true);
    changeRecurring(mockTask4, false);

    assert(mockTask4.taskName==="Integration Test Name", "Task Name not changed correctly");
    assert(mockTask4.taskDescription==="Integration Test Description", "Task Description not changed correctly");
    assert(mockTask4.taskCategory==="Integration Test Category", "Task Category not changed correctly");
    assert(mockTask4.date===newDate, "Task Date not changed correctly");
    assert(mockTask4.complete===true, "Task Complete not changed correctly");
    assert(mockTask4.recurring===false, "Task Recurring not changed correctly");

    mockTask4.taskName=oldName;
    mockTask4.taskDescription=oldDescription;
    mockTask4.taskCategory=oldCategory;
    mockTask4.date=oldDate;
    mockTask4.complete=oldComplete;
    mockTask4.recurring=oldRecurring;
}
