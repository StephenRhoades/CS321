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
	//console.log("Listener Listening");
	//let currentAlarms = chrome.alarms.getAll(); //Array of Alarms available in extension
	//console.log("Alarms array loaded");
	//console.log(JSON.stringify(currentAlarms));
	
	chrome.notifications.create(alarm.name, {
        type: 'basic',
        iconUrl: '../images/taskIcon.png',
        title: "Task Tracker Extension Reminder",
        message: "Reminder for " + alarm.name,
        //priority: 2
    });
    chrome.alarms.clear(alarm.name);
	/*
	for (let i = 0; i < currentAlarms.length; i++) {
		console.log("For loop entered");
		if(alarm.name === current.name) {
			console.log("Notification being created");
			var title = current.name;
			var message = "Reminder to do " + current,name;
			chrome.notifications.create(current.name, {
			type: 'basic',
			iconUrl: '../images/taskIcon.png',
			title: title,
			message: message,
			});
			chrome.alarms.clear(alarm.name);
			break;
		}
}
* /
	
	/*
	for (current in currentAlarms){
		console.log("For loop entered");
		if(alarm.name === current.name) {
			console.log("Notification being created");
			var title = current.name;
			var message = "Reminder to do " + current,name;
			chrome.notifications.create(current.name, {
			type: 'basic',
			iconUrl: '../images/taskIcon.png',
			title: title,
			message: message,
			});
			chrome.alarms.clear(alarm.name);
			break;
		}
	}
	*/
	
/*
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
  */
});
