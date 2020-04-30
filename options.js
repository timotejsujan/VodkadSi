
var api;
if (chrome == null){
	api = browser
} else [
	api = chrome
]

// Saves options to chrome.storage
function save_options(elem_id) {
  var babis_switch = document.getElementById('babis_switch').checked;
  var dezin_switch = document.getElementById('dezin_switch').checked;
  var border_switch = document.getElementById('border_switch').checked;

  api.storage.sync.set({
    babis_switch: babis_switch,
	dezin_switch: dezin_switch,
	border_switch: border_switch
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	  // Use default value color = 'red' and likesColor = true.
	  api.storage.sync.get({
	    babis_switch: true,
		dezin_switch: true,
		border_switch:true
	  }, function(items) {
	    document.getElementById('babis_switch').checked = items.babis_switch;
		document.getElementById('dezin_switch').checked = items.dezin_switch;
		document.getElementById('border_switch').checked = items.border_switch;
	  });
  
}
if (chrome == null) {
	function updateUI(restoredSettings) {
	  document.getElementById('babis_switch').checked = restoredSettings.babis_switch || true;
	  document.getElementById('dezin_switch').checked = restoredSettings.dezin_switch || true;
	  document.getElementById('border_switch').checked = restoredSettings.border_switch || true;
	}
	
	function onError(e) {
	  console.error(e);
	}
	
	/*
	On opening the options page, fetch stored settings and update the UI with them.
	*/
	const gettingStoredSettings = api.storage.local.get();
	gettingStoredSettings.then(updateUI, onError);
} else {
	document.addEventListener('DOMContentLoaded', restore_options);
}
document.getElementById('babis_switch').addEventListener('click', save_options);
document.getElementById('dezin_switch').addEventListener('click', save_options);
document.getElementById('border_switch').addEventListener('click', save_options);

