
$(document).ready(function () {
    vodkadsiCallback()
});

function vodkadsiCallback() {
    // checking for every search result from bing
    var article = $("#b_results > li");
    vodkadsi_checkPage(article);
}