
// workaround for compatibility with Mozilla Firefox extensions
var chrome;

// Saves options to chrome.storage
function save_options(e) {
  chrome.storage.local.set({
    babisDetectOn: document.querySelector("#babisDetectOn").checked,
    untrustedDetectOn: document.querySelector("#untrustedDetectOn").checked,
    drawBorderOn: document.querySelector("#drawBorderOn").checked
  });
  e.preventDefault();
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    babisDetectOn: true,
    untrustedDetectOn: true,
    drawBorderOn: true,
    numOfBabisCatched: 0,
    numOfUntrustedCatched: 0
  }, function(res) {
    document.querySelector("#babisDetectOn").checked = res.babisDetectOn;
    document.querySelector("#untrustedDetectOn").checked = res.untrustedDetectOn;
    document.querySelector("#drawBorderOn").checked = res.drawBorderOn;
    document.querySelector("#numOfBabisCatched").textContent = res.numOfBabisCatched;
    document.querySelector("#numOfUntrustedCatched").textContent = res.numOfUntrustedCatched;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.querySelector('#babisDetectOn').addEventListener('change',
    save_options);
document.querySelector('#untrustedDetectOn').addEventListener('change',
  save_options);
document.querySelector('#drawBorderOn').addEventListener('change',
  save_options);

