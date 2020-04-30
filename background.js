
var api;
if (chrome == null){
	 api = browser;
}{
	api = chrome;
}

api.runtime.onMessage.addListener(
 function(request, sender, sendResponse) {
 
	     api.browserAction.setIcon({
	         path: request.newIconPath,
	         tabId: sender.tab.id
	     });
     
 });




