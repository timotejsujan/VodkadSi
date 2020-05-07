
// workaround for compatibility with Mozilla Firefox extensions
var vodkadsi_api;
if (chrome == null) {
  vodkadsi_api = browser;
} else {
  vodkadsi_api = chrome;
}

// variable from settings
var border_switch = "";
// variable from settings
var babis_switch = "";
// variable from settings
var dezin_switch = "";

function getSettings() {
  // loads the border switch settings
  vodkadsi_api.storage.sync.get(['border_switch'], function (result) {
    border_switch = result.border_switch;
    if (border_switch == null) {
      border_switch = true;
    }
  });

  vodkadsi_api.storage.sync.get(['babis_switch'], function (result) {
    // loads variable from settings
    babis_switch = result.babis_switch;
    // sets to true if undefined
    if (babis_switch == null) {
      babis_switch = true;
    }
  });

  vodkadsi_api.storage.sync.get(['dezin_switch'], function (result) {
    // loads variable from settings
    dezin_switch = result.dezin_switch;
    if (dezin_switch == null) {
      // sets to true if undefined
      dezin_switch = true;
    }
  });
}

// checks current url for match with untrusted urls or urls of Andrej Babis
function vodkadsi_checkUrl(urls, img) {
  // gets current url
  const url = window.location.href.toLowerCase();

  // checks match for every url from given list
  for (var k = 0; k < urls.length; k++) {
    const bad_url = urls[k].toLowerCase();
    // if matches, then change the icon
    if (url.includes("//" + bad_url) || url.includes('.' + bad_url)) {
      vodkadsi_api.runtime.sendMessage({"newIconPath": img});
      return;
    }
  }
}

function waitForCheckUrl(){
  if(babis_switch !== "" && dezin_switch !== ""){
    // if variable is true, then check the url
    if (dezin_switch) {
      // checking current url for match with urls of Andrej Babis
      vodkadsi_checkUrl(vodkadsi_list, "icons/warning.png");
    }
    // if variable is true, then check the url
    if (babis_switch) {
      // checking current url for match with urls of Andrej Babis
      vodkadsi_checkUrl(vodkadsi_babis, "icons/butterfly.png");
    }
  } else{
    getSettings();
    setTimeout(waitForCheckUrl, 1000);
  }
}

waitForCheckUrl()

	


	

