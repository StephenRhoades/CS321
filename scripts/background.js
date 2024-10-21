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
