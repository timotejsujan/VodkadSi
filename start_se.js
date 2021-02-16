
// Get the stored settings
chrome.storage.local.get({
  babisDetectOn: true, // default values
  untrustedDetectOn: true,
  drawBorderOn: true,
  numOfBabisCatched: 0,
  numOfUntrustedCatched: 0
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


  
