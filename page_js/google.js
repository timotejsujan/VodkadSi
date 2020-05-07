
window.onload = function() {vodkadsiCallback()};

function vodkadsiCallback() {
  // checking for every search result from google
  const article = $("#rso > div");
  waitForCheckPage(article);
}
