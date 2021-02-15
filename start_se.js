
// Get the stored settings
chrome.storage.local.get({
  babis_switch: true, // default values
  dezin_switch: true,
  border_switch: true,
  bf_catched: 0,
  s_catched: 0
}, function(storage) {
  Settings.set(storage);
    // Start the script
    onGot();
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


  
