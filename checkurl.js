
var vodkadsi_api;
if (chrome == null){
	vodkadsi_api = browser;
} else{
	vodkadsi_api = chrome;
}
var babis_switch = "";
vodkadsi_api.storage.sync.get(['babis_switch'], function(result) {
		babis_switch =  result.babis_switch;
		if (babis_switch == null) {
			babis_switch = true;
		}
        if (babis_switch){
        	vodkadsi_checkUrl(vodkadsi_babis, "icons/butterfly.png");
        }
});

var dezin_switch = "";

vodkadsi_api.storage.sync.get(['dezin_switch'], function(result) {
		dezin_switch =  result.dezin_switch;
		if (dezin_switch == null) {
			dezin_switch = true;
		}
        if (dezin_switch) {
        	vodkadsi_checkUrl(vodkadsi_list, "icons/warning.png");
        }
});

function vodkadsi_checkUrl(urls, img){
	var url = window.location.href.toLowerCase();

	for(k = 0; k < urls.length; k++){
		var bad_url = urls[k].toLowerCase();
		if (url.includes("//"+bad_url) || url.includes('.'+bad_url)){
			vodkadsi_api.runtime.sendMessage({ "newIconPath" : img });
			return;
		}
	}
};

	


	

