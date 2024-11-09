/* 
* Just listens for when the extension is fully loaded. 
* Only used for testing purposes. 
*/

chrome.runtime.onInstalled.addListener(() => {
  console.log('Task Tracker extension installed.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received:', message);
  sendResponse({ status: 'received' });
});

/*
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Got an alarm!", alarm);
  if (alarm.name === 'taskAlarm') {
    chrome.storage.local.get('reminderText', (data) => {
      const reminderText = data.reminderText || 'Default Reminder Message';

      // Create a custom notification
      chrome.notifications.create('myReminderNotification', {
        type: 'basic',
        //iconUrl: 'images/icon48.png',
        title: 'Reminder',
        message: reminderText,
      });

      // Send a message to the popup script to trigger audio playback
      chrome.runtime.sendMessage({ type: 'playAudio' });

      // Clear the alarm to ensure it only triggers once
      chrome.alarms.clear('myReminderAlarm');
    });
  }
});
*/

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "taskAlarm") {
      //our alarm is running, send notification
      chrome.notifications.create('test', {
        type: 'basic',
        iconUrl: 'images/1.png',
        title: 'Test Message',
        message: 'You are awesome!',
        priority: 2
    });
  }
});
