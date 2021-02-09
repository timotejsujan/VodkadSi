function onGot(item) {
    babis_switch = item["babis_switch"];
    dezin_switch = item["dezin_switch"];
    border_switch = item["border_switch"];
    bf_catched = item["bf_catched"];
    s_catched = item["s_catched"];
    vodkadsiCallback();
    window.onload = function() {vodkadsiCallback()};
  }
  
function onError(error) {
  console.log(`Error: ${error}`);
}

chrome.storage.local.get({
  babis_switch: true,
  dezin_switch: true,
  border_switch: false,
  bf_catched: 0,
  s_catched: 0
}, function(item) {
  onGot(item);
});
  
