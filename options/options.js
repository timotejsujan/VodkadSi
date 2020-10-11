
// workaround for compatibility with Mozilla Firefox extensions
var chrome;

// Saves options to chrome.storage
function save_options(e) {
  chrome.storage.local.set({
    babis_switch: document.querySelector("#babis_switch").checked,
    dezin_switch: document.querySelector("#dezin_switch").checked,
    border_switch: document.querySelector("#border_switch").checked
  });
  e.preventDefault();
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    babis_switch: true,
    dezin_switch: true,
    border_switch: false,
    bf_catched: 0,
    s_catched: 0
  }, function(res) {
    document.querySelector("#babis_switch").checked = res.babis_switch;
    document.querySelector("#dezin_switch").checked = res.dezin_switch;
    document.querySelector("#border_switch").checked = res.border_switch;
    document.querySelector("#bf_catched").textContent = res.bf_catched;
    document.querySelector("#s_catched").textContent = res.s_catched;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector('#babis_switch').addEventListener('change',
    save_options);
document.querySelector('#dezin_switch').addEventListener('change',
  save_options);
document.querySelector('#border_switch').addEventListener('change',
  save_options);

