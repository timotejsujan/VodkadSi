
window.onload = function() {vodkadsiCallback()};

function vodkadsiCallback() {
    getSettings();
    // checking for every search result from bing
    var article = $("#b_results > li");
    waitForCheckPage(article);
}