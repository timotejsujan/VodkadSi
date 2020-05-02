var vodkadsi_api;
if (chrome == null) {
  vodkadsi_api = browser
} else {
  vodkadsi_api = chrome
}

// Saves options to chrome.storage
function vodkadsi_save_options(elem_id) {
  const babis_switch = document.getElementById('babis_switch').checked;
  const dezin_switch = document.getElementById('dezin_switch').checked;
  const border_switch = document.getElementById('border_switch').checked;

  vodkadsi_api.storage.sync.set({
    babis_switch: babis_switch,
    dezin_switch: dezin_switch,
    border_switch: border_switch
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function vodkadsi_restore_options() {
  // Use default value color = 'red' and likesColor = true.
  vodkadsi_api.storage.sync.get({
    babis_switch: true,
    dezin_switch: true,
    border_switch: true
  }, function (items) {
    document.getElementById('babis_switch').checked = items.babis_switch;
    document.getElementById('dezin_switch').checked = items.dezin_switch;
    document.getElementById('border_switch').checked = items.border_switch;
  });

}

if (chrome == null) {
  function updateUI(restoredSettings) {
    document.getElementById(
        'babis_switch').checked = restoredSettings.babis_switch || true;
    document.getElementById(
        'dezin_switch').checked = restoredSettings.dezin_switch || true;
    document.getElementById(
        'border_switch').checked = restoredSettings.border_switch || true;
  }

  function onError(e) {
    console.error(e);
  }

  /*
  On opening the options page, fetch stored settings and update the UI with them.
  */
  const gettingStoredSettings = vodkadsi_api.storage.local.get();
  gettingStoredSettings.then(updateUI, onError);
} else {
  document.addEventListener('DOMContentLoaded', vodkadsi_restore_options);
}
document.getElementById('babis_switch').addEventListener('click',
    vodkadsi_save_options);
document.getElementById('dezin_switch').addEventListener('click',
    vodkadsi_save_options);
document.getElementById('border_switch').addEventListener('click',
    vodkadsi_save_options);

