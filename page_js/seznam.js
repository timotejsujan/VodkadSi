

function vodkadsiCallback() {
  // checking for every search result from seznam.cz
  var article = document.querySelectorAll("[data-dot=results] > div");
  vodkadsi_checkPage(article);
}
