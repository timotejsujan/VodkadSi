
function vodkadsiCallback(node) {
  // checks for every facebook article
  if(typeof node.querySelectorAll === 'function') {
    var article = node.querySelectorAll("[role=article]");
    var tagArticle = node.getElementsByTagName("article");
    article = [...new Set([...article, ...tagArticle])];
    checkPage(article.reverse());
  }

}