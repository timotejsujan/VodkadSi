
// workaround for compatibility with Mozilla Firefox extensions
var vodkadsi_api;
if (chrome == null) {
  vodkadsi_api = browser;
} else {
  vodkadsi_api = chrome;
}

// changes main icon if the url matches with the list of untrusted urls or with the list of Andrej Babis url
vodkadsi_api.runtime.onMessage.addListener(
    function (request, sender) {
      vodkadsi_api.browserAction.setIcon({
        path: request.newIconPath,
        tabId: sender.tab.id
      });
    });




