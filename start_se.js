
// Get the stored settings
chrome.storage.local.get({
  babis_switch: true, // default values
  dezin_switch: true,
  border_switch: true,
  bf_catched: 0,
  s_catched: 0
}, function(item) {
    // Save the settings to global variables
    babis_switch = item["babis_switch"];
    dezin_switch = item["dezin_switch"];
    border_switch = item["border_switch"];
    bf_catched = item["bf_catched"];
    s_catched = item["s_catched"];
    // Start the script
    onGot(item);
});

// Starts the script
function onGot() {  
  vodkadsiCallback();
  // Start the script again after load
  window.onload = function() {vodkadsiCallback()};
}
  
function onError(error) {
  console.log(`Error: ${error}`);
}


  
