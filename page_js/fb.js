
// checks every second for new content (it doesn't check for elements that were already checked)
window.onload = function() {
  vodkadsiCallback();
  window.setInterval(vodkadsiCallback, 1000);
};


function vodkadsiCallback() {
  // checks for every facebook article
  var article = $("[role=article]");
  const tagArticle = document.getElementsByTagName("article");
  article = [...new Set([...article, ...tagArticle])];
  waitForCheckPage(article);
}
