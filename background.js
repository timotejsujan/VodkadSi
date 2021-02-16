
// change the main icon of the extension
chrome.runtime.onMessage.addListener(
    function (request, sender) {
      chrome.browserAction.setIcon({
        path: request.newIconPath,
        tabId: sender.tab.id
      });
    });




