const STORAGE_KEY = "user-preference-alarm-enabled";

/**
 * 
 */
function onInstall() {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Task Tracker extension installed.');
  
  });
}

/**
 * 
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
 * 
 * @param {Number} timeBefore 
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
 * "alarm"
 */
function addMessageListener(){
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background received:', message);
    values = message.split(',');
    console.log(values);
    if (values[0] === "alarm") {
      createTaskAlarm(values[1], getReminderTime(values[3], values[4]), values[4], values[2]);
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
 * @param {Date} reminderDate 
 * @param {int} timeBefore 
 * @param {String} name
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

onInstall();
notify();
addMessageListener();

