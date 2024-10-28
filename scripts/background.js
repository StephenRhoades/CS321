const STORAGE_KEY = "user-preference-alarm-enabled";

onInstall();
notify();
addMessageListener();

/**
 * Basic logging run on installation of the Task Tracker.
 */
function onInstall() {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Task Tracker extension installed.');
  
  });
}

/**
 * This will create a listener that generates a notification upon an alarm going off.
 */
async function notify() {
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith('taskReminder')) {
      console.log(alarm.name + " alarm!");

      let name = alarm.name.substring(alarm.name.indexOf('_') + 1, alarm.name.lastIndexOf('_'));
      let timeBefore = Number(alarm.name.substring(alarm.name.lastIndexOf('_') + 1));

      const time = parseTimeBefore(timeBefore);
      
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '../images/taskIcon.png',
        title: 'Task Reminder',
        message: 'Task ' + name + ' is due ' + time + '!'
      });
    }
  });
}

/**
 * This will parse the Number value of the timeBefore to be in the format:
 * "# days, # hours, # minutes" or "now" if less than a minute.
 * @param {Number} timeBefore the number of miliseconds befor the task is scheduled.
 * @returns A string formated to list the days, hours, and minutes left till the item is due.
 */
function parseTimeBefore(timeBefore){
  console.log(timeBefore);
  const days = Math.floor(timeBefore / (24*60*60*1000));
  const hours = Math.floor((timeBefore % (24*60*60*1000)) / (60*60*1000));
  const minutes = Math.floor((timeBefore % (60*60*1000)) / (60*1000));
  
  let time = "in";

  if (days > 0) {
    time += " " +  days + " day";
    if (days > 1) {
      time += "s";
    }
  }
  if (hours > 0) {
    time += " " + hours + " hour";
    if (hours > 1) {
      time += "s";
    }
  }
  if (minutes > 0) {
    time += " " + minutes + " minute";
    if (minutes > 1) {
      time += "s";
    }
  }
  if (time === "in")
    time = "now";
  return time;
}

/**
 * Listens for any messages from other js files and handles them in specific ways depending on the 
 * first reference listed. All messages should split any data from the command by commas with no 
 * spaces. (ie. "alarm,id,name,date,reminder")
 * Current commands:
 * "alarm" "delete"
 */
function addMessageListener(){
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background received:', message);
    values = message.split(',');
    console.log(values);
    if (values[0] === "alarm") {
      createTaskAlarm(values[1], getReminderTime(values[3], values[4]), values[4], values[2]);
    }
    else if (values[0] === "delete") {
      deleteTaskAlarm(values[1], values[2]);
    }
    sendResponse({ status: 'received' });
  });
}

/**
 * Calculates the time of when the reminder should be sent based on
 * the due date and the time before due that the user wants to be 
 * reminded.
 * 
 * @param {Number} reminderPeriod The time before the task to be reminded.
 * @param {Number} dueDate the time that the task is scheduled for.
 * @returns the date to set the reminder
 */
function getReminderTime(dueDate, reminderPeriod) {
  return new Date(dueDate - reminderPeriod);
}

/**
 * Generates an alarm based on the task id, name, reminder date, and alert time
 * that will run in the background until going off.
 * 
 * @param {int} taskId the id of the task to set the alarm for.
 * @param {Date} reminderDate the exact time of reminder alarm.
 * @param {int} timeBefore the time before the task date of the alarm.
 * @param {String} name the name of the task to set the alarm for.
 */
function createTaskAlarm(taskId, reminderDate, timeBefore, name) {
  try {
    if (!(reminderDate instanceof Date)) {
      console.error('Invalid reminderDate: not a Date object');
      exit(1);
    }

    const timestamp = reminderDate.getTime();

    if (isNaN(timestamp)) {
      console.error('Invalid Date: reminderDate results in NaN');
      exit(1);
    }

    console.log('Reminder time in ms:', timestamp);

    chrome.alarms.create(`taskReminder${taskId}_${name}_${timeBefore}`, {
        when: timestamp
    });
  } catch (error) {
    console.error('Error creating task alarm:', error);
  }
}

/**
 * Delete a created alarm by id and timeBefore
 * @param {int} alarmId the id of the alarm to delete.
 * @param {int} alarmTime the timeBefore of the alarm to delete.
 * @return 1 if successful, -1 if failed.
 */
function deleteTaskAlarm(alarmId, alarmTime) {
  
}
