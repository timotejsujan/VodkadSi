
class Selector {
  static select(node) {
    // checks for every facebook article
    if(typeof node.querySelectorAll === 'function') {
      var article = node.querySelectorAll("[role=article]");
      var tagArticle = node.getElementsByTagName("article");
      article = [...new Set([...article, ...tagArticle])];
      article = article.reverse();
      this.selected = article;
    }
  }

  static extract(nodeCopy) {
    return nodeCopy.innerText.toLowerCase().split("\n");
  }
}
