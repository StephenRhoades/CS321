document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed: backgroundTest");
    const errors = [];
    // Unit tests
    test(testParseTimeBefore, errors);
    test(testGetReminderTime, errors);
    // test(testDeleteAlarm, errors);
    // parital integration
    test(testCreateTaskAlarmNotifyAndDelete, errors);
    // test(testAddMessageListener, errors);
    //log all errors
    errors.forEach(e => console.error(e));
});

function testParseTimeBefore() {
    try {
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
    } catch (e) {
        console.log("Test Parse Time Before: Failed");
        throw e;
    }
}

function testGetReminderTime() {
    try {
        due = new Date(2000, 11, 20, 3, 30);
        assert(getReminderTime(due, 15 * 60 * 1000) - new Date(2000, 11, 20, 3, 15) === 0, "15 minute reminder time not generated correctly.");
        assert(getReminderTime(due, 15 * 60 * 60 * 1000) - new Date(2000, 11, 19, 12, 30) === 0, "15 hour reminder time not generated correctly.");
        assert(getReminderTime(due, 15 * 24 * 60 * 60 * 1000) - new Date(2000, 11, 5, 3, 30) === 0, "15 day reminder time not generated correctly.");
        assert(getReminderTime(due, 30 * 24 * 60 * 60 * 1000) - new Date(2000, 10, 20, 3, 30) === 0, "1 month reminder time not generated correctly.");
        assert(getReminderTime(due, 2 * 30 * 24 * 60 * 60 * 1000) - new Date(2000, 9, 21, 4, 30) === 0, "daylight savings time not accounted for correctly.");
        assert(getReminderTime(due, 366 * 24 * 60 * 60 * 1000) - new Date(1999, 11, 20, 3, 30) === 0, "leap year not accounted for correctly.");
        assert(getReminderTime(due, 2 * 365 * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 ) - new Date(1998, 11, 20, 3, 30) === 0, "2 year reminder time not generated correctly.");
        console.log("Test Get Reminder Time: Passed");
    } catch (e) {
        console.log("Test Get Reminder Time: Failed");
        throw e;
    }
}

//not being able to delete on direct call and cant catch console.log with sendMessage as is
function testDeleteAlarm() {
    // const originalLog = console.log;
    try {
        // const consoleOutput = [];
        // console.log = (...args) => {
        //     consoleOutput.push(args.join(" "));
        // };
        deleteTaskAlarm(0, "none", 0)

        createTaskAlarm(3141592, new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), 2 * 24 * 60 * 60 * 1000, "2-day-alarm");
        createTaskAlarm(3141592, new Date(new Date().getTime() + 24 * 60 * 60 * 1000), 24 * 60 * 60 * 1000, "day-alarm");
        createTaskAlarm(3141592, new Date(new Date().getTime() + 60 * 1000), 60 * 1000, "minute-alarm");

        // setTimeout(() => {     
            // chrome.runtime.sendMessage("delete,3141592,minute-alarm,60000");
            deleteTaskAlarm(3141592, "minute-alarm", 0);
            deleteTaskAlarm(3141592, "bad-alarm", 60 * 1000);
            deleteTaskAlarm(0, "minute-alarm", 24 * 60 * 60 * 1000);
            deleteTaskAlarm(3141592, "minute-alarm", 60 * 1000);
            deleteTaskAlarm(3141592, "day-alarm", 24 * 60 * 60 * 1000);
            deleteTaskAlarm(3141592, "2-day-alarm", 2 * 24 * 60 * 60 * 1000);
            deleteTaskAlarm(3141592, "2-day-alarm", 2 * 24 * 60 * 60 * 1000);
            
            // setTimeout(() => { 
                // console.log = originalLog;
                // console.log(consoleOutput);
                assert(consoleOutput.includes("taskReminder0_none_0 not found for deletion."), "nonexistent alarm is incorrectly counted as being deleted.");
                assert(consoleOutput.includes("taskReminder3141592_minute alarm_0 not found for deletion."), "despite incorrect timeBefore, alarm is still being deleted.");
                assert(consoleOutput.includes("taskReminder3141592_bad alarm_60000 not found for deletion."), "despite incorrect name, alarm is still being deleted.");
                assert(consoleOutput.includes("taskReminder3141592_minute alarm_86400000 not found for deletion."), "despite incorrect Id, alarm is still being deleted.");
                assert(consoleOutput.includes("taskReminder3141592_minute alarm_60000 deleted."), "despite correct input, failed to delete minute alarm.");
                assert(consoleOutput.includes("taskReminder3141592_day alarm_86400000 deleted."), "despite correct input, failed to delete day alarm.");
                assert(consoleOutput.includes("taskReminder3141592_2 day alarm_172800000 deleted."), "despite correct input, failed to delete 2 day alarm.");
                assert(consoleOutput.includes("taskReminder3141592_2 day alarm_172800000 failed to delete!"), "repeated alarm deletion did not cause failure to delete (not found?).");
                console.log = originalLog;
                console.log("Test Delete Alarm: Passed");
        //     }, 5000);
            
        // }, 10 * 1000);
        
    } catch (e) {
        // console.log = originalLog;
        console.log("Test Delete Alarm: Failed");
        throw e;
    }
}

function testAddMessageListener() {
    try {
        chrome.runtime.sendMessage("clearAlarms");
        setTimeout(() => {
        chrome.runtime.sendMessage("delete,0,none,0");
        }, 2000);
        setTimeout(() => {
        chrome.runtime.sendMessage("alarm,0,none," + new Date(new Date().getTime() + 60 * 1000).getTime() + ",100");
        }, 2000);
        setTimeout(() => {
        chrome.runtime.sendMessage("delete,0,none,100");
        }, 2000);
        console.log("Test Add Message Listener: Passed");
    } catch (e) {
        console.log("Test Add Message Listener: Failed");
        throw e;
    }
}

function testCreateTaskAlarmNotifyAndDelete() {
    const originalLog = console.log;
    try {
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
        const consoleOutput = [];
        console.log = (...args) => {
            consoleOutput.push(args.join(" "));
        };

        const now = new Date();
        deleteTaskAlarm(0, "none", 0)

        createTaskAlarm(3141592, new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), 2 * 24 * 60 * 60 * 1000, "2-day-alarm");
        createTaskAlarm(3141592, new Date(now.getTime() + 24 * 60 * 60 * 1000), 24 * 60 * 60 * 1000, "day-alarm");
        createTaskAlarm(3141592, new Date(now.getTime() + 60 * 1000), 60 * 1000, "minute-alarm");

        createTaskAlarm(6.31415, new Date(now.getTime() + 30 * 1000), 30 * 1000, "test6");
        createTaskAlarm(5.31415, new Date(now.getTime() + 4 * 1000), 4 * 1000, "test5");
        createTaskAlarm(1.31415, now, 0, "test1");
        
        checked = 0;
        chrome.alarms.onAlarm.addListener((alarm) => {
            if (alarm.name.startsWith('taskReminder1.31415')) {
                try {
                    assert((new Date()).getTime() - now.getTime() < 200, "Alarm 1 did not sound in time");
                    assert(alarm.name === 'taskReminder1.31415_test1_0', "Alarm 1 is not formatted correctly!");
                    checked ++;
                    deleteTaskAlarm(3141592, "minute-alarm", 0);
                    deleteTaskAlarm(3141592, "bad-alarm", 60 * 1000);
                    deleteTaskAlarm(0, "minute-alarm", 24 * 60 * 60 * 1000);
                    deleteTaskAlarm(3141592, "minute-alarm", 60 * 1000);
                    deleteTaskAlarm(3141592, "day-alarm", 24 * 60 * 60 * 1000);
                    deleteTaskAlarm(3141592, "2-day-alarm", 2 * 24 * 60 * 60 * 1000);
                    deleteTaskAlarm(3141592, "2-day-alarm", 2 * 24 * 60 * 60 * 1000);
                } catch (e) {
                    console.log = originalLog;
                    console.log("Test Create Task Alarm Notify and Delete: Failed");
                    throw e;
                }
                setTimeout(() => {
                    try {
                        assert(consoleOutput.includes('taskReminder1.31415_test1_0 alarm!'), "Notification not formatted correctly!");
                        assert(consoleOutput.includes('taskReminder1.31415_test1_0 notification created.'), "Notification not created successfully!");
                    } catch (e) {
                        console.log = originalLog;
                        console.log("Test Create Task Alarm Notify and Delete: Failed");
                        throw e;
                    }
                }, 1000);

            }
            if (alarm.name.startsWith('taskReminder5.31415')) {
                try {
                    assert((new Date()).getTime() - (now.getTime() + 4000) < 100, "Alarm 5 did not sound in time");
                    assert(alarm.name === 'taskReminder5.31415_test5_4000', "Alarm 5 is not formatted correctly!");
                    checked ++;
                } catch (e) {
                    console.log = originalLog;
                    console.log("Test Create Task Alarm Notify and Delete: Failed");
                    throw e;
                }
                setTimeout(() => {
                    try {
                        assert(consoleOutput.includes('taskReminder5.31415_test5_4000 alarm!'), "Notification not formatted correctly!");
                        assert(consoleOutput.includes('taskReminder5.31415_test5_4000 notification created.'), "Notification not created successfully!");
                    } catch (e) {
                        console.log = originalLog;
                        console.log("Test Create Task Alarm Notify and Delete: Failed");
                        throw e;
                    }
                }, 1000);
            }
            if (alarm.name.startsWith('taskReminder6.31415')) {
                try {
                    assert((new Date()).getTime() - (now.getTime() + 30000) < 100, "Alarm 6 did not sound in time");
                    assert(alarm.name === 'taskReminder6.31415_test6_30000', "Alarm 6 is not formatted correctly!");
                    checked ++;
                } catch (e) {
                    console.log = originalLog;
                    console.log("Test Create Task Alarm Notify and Delete: Failed");
                    throw e;
                }
                setTimeout(() => {
                    try {
                        assert(consoleOutput.includes('taskReminder6.31415_test6_30000 alarm!'), "Notification not formatted correctly!");
                        assert(consoleOutput.includes('taskReminder6.31415_test6_30000 notification created.'), "Notification not created successfully!");
                    } catch (e) {
                        console.log = originalLog;
                        console.log("Test Create Task Alarm Notify and Delete: Failed");
                        throw e;
                    }
                }, 1000);
            }
            if (checked == 3) {
                try {
                    assert(consoleOutput.includes("taskReminder0_none_0 not found for deletion."), "nonexistent alarm is incorrectly counted as being deleted.");
                    assert(consoleOutput.includes("taskReminder3141592_minute-alarm_0 not found for deletion."), "despite incorrect timeBefore, alarm is still being deleted.");
                    assert(consoleOutput.includes("taskReminder3141592_bad-alarm_60000 not found for deletion."), "despite incorrect name, alarm is still being deleted.");
                    assert(consoleOutput.includes("taskReminder0_minute-alarm_86400000 not found for deletion."), "despite incorrect Id, alarm is still being deleted.");
                    assert(consoleOutput.includes("taskReminder3141592_minute-alarm_60000 deleted."), "despite correct input, failed to delete minute alarm.");
                    assert(consoleOutput.includes("taskReminder3141592_day-alarm_86400000 deleted."), "despite correct input, failed to delete day alarm.");
                    assert(consoleOutput.includes("taskReminder3141592_2-day-alarm_172800000 deleted."), "despite correct input, failed to delete 2 day alarm.");
                    assert(consoleOutput.includes("taskReminder3141592_2-day-alarm_172800000 failed to delete!"), "repeated alarm deletion did not cause failure to delete (not found?).");
                } catch (e) {
                    console.log = originalLog;
                    console.log(consoleOutput);
                    console.log("Test Create Task Alarm Notify and Delete: Failed");
                    throw e;
                }
                console.log = originalLog;
                console.log(consoleOutput);
                console.log("Test Create Task Alarm Notify and Delete: Passed");
            }
        });
    } catch (e) {
        console.log = originalLog;
        console.log("Test Create Task Alarm Notify and Delete: Failed");
        throw e;
    }
}