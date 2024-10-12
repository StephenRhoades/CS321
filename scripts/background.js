chrome.runtime.onInstalled.addListener(() => {
  console.log('Task Tracker extension installed.');
});

// Example to set an alarm for background tasks
chrome.alarms.create('reminder', { delayInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'reminder') {
    console.log('Reminder alarm triggered.');
  }
});
