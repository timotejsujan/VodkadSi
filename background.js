var vodkadsi_api;
if (chrome == null) {
  vodkadsi_api = browser;
} else {
  vodkadsi_api = chrome;
}

vodkadsi_api.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      vodkadsi_api.browserAction.setIcon({
        path: request.newIconPath,
        tabId: sender.tab.id
      });
    });




