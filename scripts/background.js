chrome.runtime.onInstalled.addListener(() => {
  console.log('Task Tracker extension installed.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background received:', message);
  sendResponse({ status: 'received' });
});
