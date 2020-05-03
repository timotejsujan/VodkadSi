
$(document).ready(function () {
  vodkadsiCallback()
});

function vodkadsiCallback() {
  // checking for every search result from google
  const article = $("#rso > div");
  vodkadsi_checkPage(article);
}
