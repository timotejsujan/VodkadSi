
// checks current url for match with untrusted urls or urls of Andrej Babis
function checkUrl(urls, img) {
  // gets current url
  const url = window.location.href.toLowerCase();
  // checks match for every url from given list
  for (const site of urls) {
    const bad_url = site.URL.toLowerCase();
    // if matches, then change the icon
    if (url.includes("//" + bad_url) || url.includes('.' + bad_url)) {

      chrome.runtime.sendMessage({"newIconPath": img});

      return true;
    }
  }
  return false;
}

function onGot() {

  if (Settings.untrustedDetectOn) {
    if(checkUrl(StaticData.untrustedSites, ViewCreator.untrustedStyle.iconPath)){
      Settings.incNumOfUntrustedCatched();
      return;
    }
  }

  if (Settings.babisDetectOn) {
    if(checkUrl(StaticData.babisSites, ViewCreator.babisStyle.iconPath)){
      Settings.incNumOfBabisCatched();
    }
  }
}
  
function onError(error) {
console.log(`Error: ${error}`);
}

chrome.storage.local.get({
  babis_switch: true,
  dezin_switch: true,
  border_switch: true,
  bf_catched: 0,
  s_catched: 0
}, function(storage) {
  Settings.set(storage);
  onGot();
});






	


	

