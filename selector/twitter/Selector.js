
class Selector {

  // select article tags from node  
  static select(node) {
    if(typeof node.querySelectorAll === 'function') {
      var article = node.querySelectorAll("[role=article]");
      var tagArticle = node.getElementsByTagName("article");
      article = [...new Set([...article, ...tagArticle])];
      article = article.reverse();
      this.selected = article;
    }
  }

  // extract inner text and split to array
  static extract(nodeCopy) {
    return nodeCopy.innerText.toLowerCase().split("\n");
  }

  // facebook page matcher
  static matchesFacebookPage(line, fbPage){
    return line.includes("facebook.com/"+fbPage);
  }
}
