$(document).ready(function () {
  vodkadsiCallback()
});

function vodkadsiCallback() {
  // checking for every search result from seznam.cz
  const article = $("[data-dot=results] > div");
  vodkadsi_checkPage(article);
}

