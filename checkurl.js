let vodkadsi_api;
if (chrome == null) {
  vodkadsi_api = browser;
} else {
  vodkadsi_api = chrome;
}
let babis_switch = "";
vodkadsi_api.storage.sync.get(['babis_switch'], function (result) {
  babis_switch = result.babis_switch;
  if (babis_switch == null) {
    babis_switch = true;
  }
  if (babis_switch) {
    vodkadsi_checkUrl(vodkadsi_babis, "icons/butterfly.png");
  }
});

let dezin_switch = "";

vodkadsi_api.storage.sync.get(['dezin_switch'], function (result) {
  dezin_switch = result.dezin_switch;
  if (dezin_switch == null) {
    dezin_switch = true;
  }
  if (dezin_switch) {
    vodkadsi_checkUrl(vodkadsi_list, "icons/warning.png");
  }
});

function vodkadsi_checkUrl(urls, img) {
  const url = window.location.href.toLowerCase();

  for (let k = 0; k < urls.length; k++) {
    const bad_url = urls[k].toLowerCase();
    if (url.includes("//" + bad_url) || url.includes('.' + bad_url)) {
      vodkadsi_api.runtime.sendMessage({"newIconPath": img});
      return;
    }
  }
}

	


	

