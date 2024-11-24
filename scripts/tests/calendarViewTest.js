document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: listViewTest");
    testAddAndDisplayTask();
    // testClearTasks();
    // testLoadTasksFromLocalStorage();
});

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function testAddAndDisplayTask() {
    clearStorage();

    let testTask = createTask(1001, "Test Task", "This is a test task", "General", new Date(), false, false);
    dynamicTaskArray.push(testTask);
    saveTasksToLocalStorage();

    renderCalendar();

    

}