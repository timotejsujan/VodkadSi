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
  }
);

function onError(error) {
  console.log(`Error: ${error}`);
}

// Starts the script
function onGot() {

    // Select the node that will be observed for mutations
    const targetNode = document;

    // Options for the observer (which mutations to observe)
    const config = {childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(const mutation of mutationsList) {
            for(const addedNode of mutation.addedNodes){
                vodkadsiCallback(addedNode);
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

}
  





  