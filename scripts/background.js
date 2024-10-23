const STORAGE_KEY = "user-preference-alarm-enabled";

/**
 * 
 */
async function onInstall() {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Task Tracker extension installed.');
  
  });
}

/**
 * 
 */
async function notify() {
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith('taskReminder_')) {
      console.log(alarm.name + " alarm!");
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '../images/taskIcon.png',
        title: 'Task Reminder',
        message: 'Task ' + alarm.name.substring(12) + ' is due soon!'
      });
    }
  });
}

/**
 * 
 */
async function addMessageListener(){
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background received:', message);
    values = message.split(',');
    if (values[0] === "alarm") {
      console.log("task is " + values[1]);
      console.log(values[1]);
      console.log("task date " + values[2]);
      console.log("reminder time" + values[3]);
      console.log(getReminderTime(values[2], values[3]));
      createTaskAlarm(values[1], getReminderTime(values[2], values[3]));
    }
    sendResponse({ status: 'received' });
  });
}

/**
 * Calculates the time of when the reminder should be sent based on
 * the due date and the time before due that the user wants to be 
 * reminded.
 * 
 * @param {Number} reminderPeriod 
 * @param {Number} dueDate 
 * @returns the date to set the reminder
 */
function getReminderTime(dueDate, reminderPeriod) {

  return new Date(dueDate - reminderPeriod);
}

/**
 * 
 * @param {int} taskId 
 * @param {Date} reminderTime 
 */
function createTaskAlarm(taskId, reminderTime) {
  try {
    if (!(reminderTime instanceof Date)) {
      console.error('Invalid reminderTime: not a Date object');
      return;
    }

    const timestamp = reminderTime.getTime();

    if (isNaN(timestamp)) {
      console.error('Invalid Date: reminderTime results in NaN');
      return;
    }

    console.log('Reminder time in ms:', timestamp);

    chrome.alarms.create(`taskReminder_${taskId}`, {
        when: timestamp
    });
  } catch (error) {
    console.error('Error creating task alarm:', error);
  }
}

onInstall();
notify();
addMessageListener();

