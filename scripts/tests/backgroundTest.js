document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: backgroundTest");
    testParseTimeBefore();
    testGetReminderTime();
    testCreateTaskAlarmAndNotify();
});

function testParseTimeBefore() {

    assert(parseTimeBefore("new") === "now", "Alert for call with invalid data not generated correctly.");
    assert(parseTimeBefore() === "now", "Alert for empty call not generated correctly.");
    assert(parseTimeBefore(0) === "now", "Alert for now not generated from time 0.");
    assert(parseTimeBefore(-20) === "now", "Alert for now not generated from negative time");
    assert(parseTimeBefore(60 * 1000) === "in 1 minute", "Alert for 1 minute not generated correctly.");
    assert(parseTimeBefore(59 * 60 * 1000) === "in 59 minutes", "Alert for multiple minutes not generated correctly.");
    assert(parseTimeBefore(60 * 60 * 1000) === "in 1 hour", "Alert for 1 hour not generated correctly.");
    assert(parseTimeBefore(23 * 60 * 60 * 1000) === "in 23 hours", "Alert for multiple hours not generated correctly.");
    assert(parseTimeBefore(24 * 60 * 60 * 1000) === "in 1 day", "Alert for 1 day not generated correctly.");
    assert(parseTimeBefore(32 * 24 * 60 * 60 * 1000) === "in 32 days", "Alert for multiple days not generated correctly.");

    assert(parseTimeBefore(24 * 60 * 60 * 1000 + 999) === "in 1 day", "Alert with extra miliseconds not generated correctly.");
    assert(parseTimeBefore(24 * 60 * 60 * 1000 + 60 * 60 * 1000) === "in 1 day, 1 hour", "Alert for day hour not generated correctly.");
    assert(parseTimeBefore(24 * 60 * 60 * 1000 + 60 * 1000) === "in 1 day, 1 minute", "Alert for day minute not generated correctly.");
    assert(parseTimeBefore(60 * 1000 + 60 * 60 * 1000) === "in 1 hour, 1 minute", "Alert for hour minute not generated correctly.");
    assert(parseTimeBefore(24 * 60 * 60 * 1000 + 60 * 1000 + 60 * 60 * 1000) === "in 1 day, 1 hour, 1 minute", "Alert for day hour minute not generated correctly.");
    assert(parseTimeBefore(3 * 24 * 60 * 60 * 1000 + 50 * 60 * 1000 + 20 * 60 * 60 * 1000) === "in 3 days, 20 hours, 50 minutes", "Alert for days hours minutes not generated correctly.");
    
    console.log("Test Parse Time Before: Passed");
}

function testGetReminderTime() {
    due = new Date(2000, 11, 20, 3, 30);
    assert(getReminderTime(due, 15 * 60 * 1000) - new Date(2000, 11, 20, 3, 15) === 0, "15 minute reminder time not generated correctly.");
    assert(getReminderTime(due, 15 * 60 * 60 * 1000) - new Date(2000, 11, 19, 12, 30) === 0, "15 hour reminder time not generated correctly.");
    assert(getReminderTime(due, 15 * 24 * 60 * 60 * 1000) - new Date(2000, 11, 5, 3, 30) === 0, "15 day reminder time not generated correctly.");
    assert(getReminderTime(due, 30 * 24 * 60 * 60 * 1000) - new Date(2000, 10, 20, 3, 30) === 0, "1 month reminder time not generated correctly.");
    assert(getReminderTime(due, 2 * 30 * 24 * 60 * 60 * 1000) - new Date(2000, 9, 21, 4, 30) === 0, "daylight savings time not accounted for correctly.");
    assert(getReminderTime(due, 366 * 24 * 60 * 60 * 1000) - new Date(1999, 11, 20, 3, 30) === 0, "leap year not accounted for correctly.");
    assert(getReminderTime(due, 2 * 365 * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 ) - new Date(1998, 11, 20, 3, 30) === 0, "2 year reminder time not generated correctly.");

    console.log("Test Get Reminder Time: Passed");
}

function testCreateTaskAlarmAndNotify() {
    // Checking Errors first
    try {
        createTaskAlarm();
    } catch (Error) {
        assert(Error.message === 'Invalid reminderDate: not a Date object', "Error for no input not generated correctly");
    }
    try {
        createTaskAlarm(1, "word", 100, "name");
    } catch (Error) {
        assert(Error.message === 'Invalid reminderDate: not a Date object', "Error for reminderDate not being a date not generated correctly");
    }
    try {
        createTaskAlarm(1, new Date("not-a-date"), 100, "name");
    } catch (Error) {
        assert(Error.message === 'Invalid Date: reminderDate results in NaN', "Error for reminderDate time being NaN not generated correctly");
    }

    //overwriting original console.log to check for notifications
    const originalLog = console.log;
    const consoleOutput = [];
    console.log = (...args) => {
        consoleOutput.push(args.join(" "));
    };

    now = new Date();
    createTaskAlarm(1.31415, now, 0, "test1");
    createTaskAlarm(2.31415, new Date(now.getTime() + 1 * 1000), 1 * 1000, "test2");
    createTaskAlarm(3.31415, new Date(now.getTime() + 2 * 1000), 2 * 1000, "test3");
    createTaskAlarm(4.31415, new Date(now.getTime() + 3 * 1000), 3 * 1000, "test4");
    createTaskAlarm(5.31415, new Date(now.getTime() + 4 * 1000), 4 * 1000, "test5");
    createTaskAlarm(6.31415, new Date(now.getTime() + 30 * 1000), 30 * 1000, "test6");

    
    checked = 0;
    chrome.alarms.onAlarm.addListener((alarm) => {
        if (alarm.name.startsWith('taskReminder1.31415')) {
            assert((new Date()).getTime() - now.getTime() < 50, "Alarm 1 did not sound in time");
            assert(alarm.name === 'taskReminder1.31415_test1_0', "Alarm 1 is not formatted correctly!");
            assert(consoleOutput.includes('taskReminder1.31415_test1_0 alarm!'), "Notification not formatted correctly!");
            assert(consoleOutput.includes('taskReminder1.31415_test1_0 notification created.'), "Notification not created successfully!");
            checked ++;
        }
        if (alarm.name.startsWith('taskReminder2.31415')) {
            console.log((new Date()).getTime() - (now.getTime() + 1000));
            assert((new Date()).getTime() - (now.getTime() + 1000) < 50, "Alarm 2 did not sound in time");
            assert(alarm.name === 'taskReminder2.31415_test2_1000', "Alarm 2 is not formatted correctly!");
            assert(consoleOutput.includes('taskReminder2.31415_test2_1000 alarm!'), "Notification not formatted correctly!");
            assert(consoleOutput.includes('taskReminder2.31415_test2_1000 notification created.'), "Notification not created successfully!");
            checked ++;
        }
        if (alarm.name.startsWith('taskReminder3.31415')) {
            console.log((new Date()).getTime() - (now.getTime() + 2000));
            assert((new Date()).getTime() - (now.getTime() + 2000) < 50, "Alarm 3 did not sound in time");
            assert(alarm.name === 'taskReminder3.31415_test3_2000', "Alarm 3 is not formatted correctly!");
            assert(consoleOutput.includes('taskReminder3.31415_test3_2000 alarm!'), "Notification not formatted correctly!");
            assert(consoleOutput.includes('taskReminder3.31415_test3_2000 notification created.'), "Notification not created successfully!");
            checked ++;
        }
        if (alarm.name.startsWith('taskReminder4.31415')) {
            console.log((new Date()).getTime() - (now.getTime() + 3000));
            assert((new Date()).getTime() - (now.getTime() + 3000) < 50, "Alarm 4 did not sound in time");
            assert(alarm.name === 'taskReminder4.31415_test4_3000', "Alarm 4 is not formatted correctly!");
            assert(consoleOutput.includes('taskReminder4.31415_test4_3000 alarm!'), "Notification not formatted correctly!");
            assert(consoleOutput.includes('taskReminder4.31415_test4_3000 notification created.'), "Notification not created successfully!");
            checked ++;
        }
        if (alarm.name.startsWith('taskReminder5.31415')) {
            console.log((new Date()).getTime() - (now.getTime() + 4000));
            assert((new Date()).getTime() - (now.getTime() + 4000) < 50, "Alarm 5 did not sound in time");
            assert(alarm.name === 'taskReminder5.31415_test5_4000', "Alarm 5 is not formatted correctly!");
            assert(consoleOutput.includes('taskReminder5.31415_test5_4000 alarm!'), "Notification not formatted correctly!");
            assert(consoleOutput.includes('taskReminder5.31415_test5_4000 notification created.'), "Notification not created successfully!");
            checked ++;
        }
        if (alarm.name.startsWith('taskReminder6.31415')) {
            console.log((new Date()).getTime() - (now.getTime() + 30000));
            assert((new Date()).getTime() - (now.getTime() + 30000) < 50, "Alarm 6 did not sound in time");
            assert(alarm.name === 'taskReminder6.31415_test6_30000', "Alarm 6 is not formatted correctly!");
            assert(consoleOutput.includes('taskReminder6.31415_test6_30000 alarm!'), "Notification not formatted correctly!");
            assert(consoleOutput.includes('taskReminder6.31415_test6_30000 notification created.'), "Notification not created successfully!");
            checked ++;
        }
        if (checked == 6) {
            console.log = originalLog;
            console.log("Test Create Task Alarm: Passed");
        }
    });
}