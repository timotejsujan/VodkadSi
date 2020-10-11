
// changes main icon if the url matches with the list of untrusted urls or with the list of Andrej Babis url
chrome.runtime.onMessage.addListener(
    function (request, sender) {
      chrome.browserAction.setIcon({
        path: request.newIconPath,
        tabId: sender.tab.id
      });
    });




