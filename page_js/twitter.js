
function vodkadsiCallback(node) {
  // checks for every facebook article
  var article = node.querySelectorAll("[role=article]");
  var tagArticle = node.getElementsByTagName("article");
  article = [...new Set([...article, ...tagArticle])];
  vodkadsi_checkPage(article);
}
