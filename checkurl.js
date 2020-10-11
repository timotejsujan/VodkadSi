// checks current url for match with untrusted urls or urls of Andrej Babis
function vodkadsi_checkUrl(urls, img) {
  // gets current url
  const url = window.location.href.toLowerCase();

  // checks match for every url from given list
  for (var k = 0; k < urls.length; k++) {
    const bad_url = urls[k].toLowerCase();
    // if matches, then change the icon
    if (url.includes("//" + bad_url) || url.includes('.' + bad_url)) {

      chrome.runtime.sendMessage({"newIconPath": img});

      return true;
    }
  }
  return false;
}

function onGot(item) {

    if (item["babis_switch"]) {
      if(vodkadsi_checkUrl(vodkadsi_babis, "icons/butterfly.png")){
        item["bf_catched"]++;
        chrome.storage.local.set({
          bf_catched: item["bf_catched"]
        });
      }
    }
    if (item["dezin_switch"]) {

      if(vodkadsi_checkUrl(vodkadsi_list, "icons/warning.png")){
        item["s_catched"]++;
        chrome.storage.local.set({
          s_catched: item["s_catched"]
        });
      }
    }
}
  
function onError(error) {
console.log(`Error: ${error}`);
}

chrome.storage.local.get({
  babis_switch: true,
  dezin_switch: true,
  bf_catched: 0,
  s_catched: 0
}, function(item) {
  onGot(item);
});






	


	

