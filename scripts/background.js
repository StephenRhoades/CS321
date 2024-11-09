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


chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "taskAlarm") {
      //our alarm is running, send notification
      chrome.notifications.create('test', {
        type: 'basic',
        iconUrl: '../images/taskIcon.png',
        title: 'Timed Notification Working',
        message: 'You are awesome!',
        //priority: 2
    });
  }
});
